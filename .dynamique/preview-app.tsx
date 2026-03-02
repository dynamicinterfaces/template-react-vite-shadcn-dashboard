import React, { useState, useEffect, useCallback } from 'react';
import { PreviewView } from './preview-view';
import { PropertiesView } from './properties-view';
import { isCSF, extractStories, inferArgTypes } from './lib/csf';
import { wireActions, sanitizeForPostMessage } from './lib/actions';
import { applyPreviewGlobals, parseQueryGlobals } from './lib/globals';

type PreviewShellType = React.ComponentType<{ children: React.ReactNode }>;

// ── Error Boundary ──
// Catches render-time errors so one broken component preview doesn't affect others.
// Import-time errors are caught by the try/catch in PreviewApp's load().
//
// Uses a `resetKey` prop instead of React `key` to reset error state.
// This avoids destroying the entire fiber tree on navigation, which can
// corrupt React's internal dispatcher and crash components with hooks
// (e.g., "Cannot read properties of null (reading 'useState')").

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKey: string;
}

interface ErrorBoundaryState {
  error: Error | null;
  prevResetKey: string;
}

class PreviewErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null, prevResetKey: this.props.resetKey };

  static getDerivedStateFromProps(
    props: ErrorBoundaryProps,
    state: ErrorBoundaryState,
  ): Partial<ErrorBoundaryState> | null {
    // When resetKey changes, clear the error so the new component can render
    if (props.resetKey !== state.prevResetKey) {
      return { error: null, prevResetKey: props.resetKey };
    }
    return null;
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    const msg = { type: 'preview-error', error: error.message };
    window.postMessage(msg, '*');
    if (window.parent !== window) {
      window.parent.postMessage(msg, '*');
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div data-preview-error="true" style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: 8 }}>
            Preview Error
          </div>
          <pre style={{ color: '#888', fontSize: 12, whiteSpace: 'pre-wrap', margin: 0 }}>
            {this.state.error.message}
          </pre>
          <ReadySignal />
        </div>
      );
    }
    return this.props.children;
  }
}

interface PreviewAppProps {
  componentPath: string;
  view: 'preview' | 'properties';
  storyParam: string | null;
  hasShell: boolean;
}

/**
 * Resolve a component path to a Vite-importable path.
 * Prefers the server-resolved path embedded by the Vite plugin (window.__dynamiqueVitePath).
 * Falls back to client-side resolution for navigate-preview (plugin didn't resolve).
 */
function resolveImportPath(activePath: string): string {
  // Use server-resolved path if available (set by dynamique-preview-plugin)
  const vitePath = (window as any).__dynamiqueVitePath;
  if (vitePath && activePath === document.documentElement.dataset.componentPath) {
    return vitePath;
  }
  // Already absolute or special prefix — use as-is
  if (activePath.startsWith('/') || activePath.startsWith('.') || activePath.startsWith('@')) {
    return activePath;
  }
  // Warm navigation: path is repo-relative. If the Vite root is a subdirectory
  // (monorepo appRoot), paths outside it need /@fs/ to reach the absolute location.
  const appRoot = document.documentElement.dataset.appRoot || '';
  if (appRoot && !activePath.startsWith(appRoot + '/')) {
    // Path is outside the Vite root — use /@fs/ with absolute repo path
    const repoDir = ((window as any).__dynamiqueRepoDir || '/root/user-repo').replace(/^\//, '');
    return `/@fs/${repoDir}/${activePath}`;
  }
  return '/' + activePath;
}

/**
 * Main preview orchestrator.
 * Dynamic-imports the target component, detects CSF, and routes to the
 * appropriate view (preview or properties).
 *
 * Uses Vite's HMR API to listen for module updates and re-import in-place
 * without a full page reload.
 */
export function PreviewApp(props: PreviewAppProps) {
  const [activePath, setActivePath] = useState(props.componentPath);
  const [content, setContent] = useState<React.ReactNode>(null);
  const { view, storyParam, hasShell } = props;
  // Bump this to trigger a re-import of the same path
  const [reloadKey, setReloadKey] = useState(0);
  // Monotonic counter used as React key for ReadySignal — ensures it
  // remounts (and re-fires its useEffect) on every navigation, even
  // though the ErrorBoundary stays alive via resetKey.
  const signalKeyRef = React.useRef(0);

  // Signal that PreviewApp has mounted and message listeners are active
  useEffect(() => {
    (window as any).__previewAppMounted = true;
  }, []);

  const load = useCallback(async (cancelled: { current: boolean }) => {
    // Bump signal key so ReadySignal remounts with a fresh useEffect
    signalKeyRef.current += 1;
    const currentSignalKey = signalKeyRef.current;

    // Pre-load the shell (which imports app CSS like theme.css) and apply globals
    // even for __blank — ensures CSS is ready before any component renders via
    // navigate-preview, preventing race conditions where screenshots capture
    // unstyled content.
    let Shell: PreviewShellType | null = null;
    if (hasShell) {
      try {
        const shellPath = '/.dynamique/preview-shell';
        const shellMod = await import(/* @vite-ignore */ shellPath);
        Shell = shellMod.PreviewShell || shellMod.default;
      } catch {
        // Shell not available
      }
    }

    const globals = parseQueryGlobals();
    applyPreviewGlobals(globals);

    if (activePath === '__blank' || activePath === '/__blank') {
      setContent(<ReadySignal key={currentSignalKey} />);
      return;
    }

    try {
      const importPath = resolveImportPath(activePath);
      // Cache-bust so browser fetches the latest module version
      const url = `${importPath}${importPath.includes('?') ? '&' : '?'}t=${Date.now()}`;
      const Exports = await import(/* @vite-ignore */ url);

      if (cancelled.current) return;

      // ── CSF format ──
      if (isCSF(Exports)) {
        const meta = Exports.default;
        const Component = meta.component;
        const metaArgs = meta.args || {};
        const argTypes = { ...inferArgTypes(metaArgs), ...(meta.argTypes || {}) };
        const stories = extractStories(Exports, metaArgs);

        // ES Module Namespace objects sort keys alphabetically (per spec), so
        // stories[0] is the alphabetically-first story, NOT the first in source.
        // Pick the default story with priority:
        //   1. Explicit storyParam from URL
        //   2. Story named "Default"
        //   3. First story with no args override (pure meta.args — most representative)
        //   4. Alphabetically first story
        const defaultStory = stories.find(s => s.name === 'Default')
          || stories.find(s => {
            const exp = Exports[s.name];
            return exp && (!exp.args || Object.keys(exp.args).length === 0);
          })
          || stories[0];

        if (view === 'properties') {
          const initialStory = storyParam || defaultStory?.name || null;
          setContent(
            <>
              <PropertiesView
                argTypes={argTypes}
                metaArgs={metaArgs}
                stories={stories}
                initialStory={initialStory}
              />
              <ReadySignal key={currentSignalKey} />
            </>,
          );
          return;
        }

        // ── Preview view ──
        let initialArgs = { ...metaArgs };
        let storyRenderFn: ((args: Record<string, any>) => any) | null = null;
        const targetStory = storyParam || defaultStory?.name || null;
        if (targetStory) {
          const storyExport = Exports[targetStory];
          if (storyExport) {
            initialArgs = { ...metaArgs, ...(storyExport.args || {}) };
            if (typeof storyExport.render === 'function') storyRenderFn = storyExport.render;
          }
        }

        const renderFn = storyRenderFn || (typeof meta.render === 'function' ? meta.render : null);
        // Collect decorators: story-level then meta-level
        const metaDecorators = Array.isArray(meta.decorators) ? meta.decorators : [];
        let storyDecorators: any[] = [];
        if (targetStory) {
          const storyExport = Exports[targetStory];
          if (storyExport && Array.isArray(storyExport.decorators)) {
            storyDecorators = storyExport.decorators;
          }
        }
        const allDecorators = [...storyDecorators, ...metaDecorators];
        const { actionNames } = wireActions(initialArgs);

        window.parent.postMessage(
          {
            type: 'preview-schema',
            format: 'csf',
            hasProperties: Object.keys(argTypes).length > 0,
            argTypes: sanitizeForPostMessage(argTypes),
            actions: actionNames,
            stories: stories.map((s) => s.name),
            defaults: sanitizeForPostMessage(initialArgs),
          },
          '*',
        );

        setContent(
          <>
            <PreviewView
              key={`pv-${currentSignalKey}`}
              Component={Component}
              renderFn={renderFn}
              initialArgs={initialArgs}
              Shell={Shell}
              decorators={allDecorators}
            />
            <ReadySignal key={`rs-${currentSignalKey}`} />
          </>,
        );
        return;
      }

      // ── Simple component (default export or first named export) ──
      let Component =
        typeof Exports.default === 'function' ? Exports.default : null;

      // Fall back to first named export that looks like a React component
      // (PascalCase function — React convention for components)
      if (!Component) {
        for (const [name, exp] of Object.entries(Exports)) {
          if (name === 'default' || name === '__esModule') continue;
          if (typeof exp === 'function' && /^[A-Z]/.test(name)) {
            Component = exp as React.ComponentType;
            break;
          }
          // forwardRef components are objects with $$typeof
          if (exp && typeof exp === 'object' && (exp as any).$$typeof && /^[A-Z]/.test(name)) {
            Component = exp as React.ComponentType;
            break;
          }
        }
      }

      if (!Component) {
        setContent(
          <>
            <div data-preview-error="true" style={{ padding: 16, color: '#888' }}>
              No renderable component or CSF meta found
            </div>
            <ReadySignal key={currentSignalKey} />
          </>,
        );
        return;
      }

      // Also post schema for simple components so parent knows args are accepted
      window.parent.postMessage(
        {
          type: 'preview-schema',
          format: 'simple',
          hasProperties: false,
          argTypes: {},
          actions: [],
          stories: [],
          defaults: {},
        },
        '*',
      );

      setContent(
        <>
          <PreviewView
            key={`pv-${currentSignalKey}`}
            Component={Component}
            renderFn={null}
            initialArgs={{}}
            Shell={Shell}
            decorators={[]}
          />
          <ReadySignal key={`rs-${currentSignalKey}`} />
        </>,
      );
    } catch (e: any) {
      if (!cancelled.current) {
        setContent(
          <>
            <div data-preview-error="true" style={{ padding: 16, fontFamily: 'system-ui, sans-serif' }}>
              <div style={{ color: '#ef4444', fontWeight: 600, marginBottom: 8 }}>
                Import Error
              </div>
              <pre style={{ color: '#888', fontSize: 12, whiteSpace: 'pre-wrap', margin: 0 }}>
                {e.message}
              </pre>
            </div>
            <ReadySignal key={currentSignalKey} />
          </>,
        );
      }
    }
  }, [activePath, view, storyParam, hasShell]);

  // Reset ready signal when activePath changes.
  // We do NOT null out content — that would cause an intermediate empty render
  // that corrupts React's hook dispatcher. Instead, the old content stays
  // visible until the new content is ready (seamless swap).
  // The ReadySignal uses a generation counter to prevent stale signals.
  const generationRef = React.useRef(0);

  useEffect(() => {
    window.__dynamiqueContentReady = false;
    const root = document.getElementById('preview-root');
    if (root) root.removeAttribute('data-preview-ready');
    // Bump generation so stale loads are discarded
    generationRef.current += 1;
  }, [activePath]);

  // Load component (runs on mount and when reloadKey bumps)
  useEffect(() => {
    const cancelled = { current: false };
    const loadGeneration = generationRef.current;
    const wrappedLoad = async () => {
      await load(cancelled);
      // If generation changed while we were loading, the content is stale — skip
      if (generationRef.current !== loadGeneration) {
        cancelled.current = true;
      }
    };
    wrappedLoad();
    return () => { cancelled.current = true; };
  }, [load, reloadKey]);

  // HMR: listen for custom event dispatched by our WebSocket interceptor
  // (injected in the HTML before Vite's client loads).
  // When a file changes, we re-import in-place instead of full page reload.
  useEffect(() => {
    const handler = () => setReloadKey((k: number) => k + 1);
    window.addEventListener('dynamique:hmr-update', handler);
    return () => window.removeEventListener('dynamique:hmr-update', handler);
  }, []);

  // Listen for navigate-preview to switch components without page reload
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'navigate-preview' && e.data.component) {
        setActivePath(e.data.component);
        // Always bump reloadKey to force re-import even if path is the same
        // (e.g., file was edited on disk and we need to pick up changes)
        setReloadKey((k: number) => k + 1);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return (
    <PreviewErrorBoundary resetKey={activePath}>
      {content}
    </PreviewErrorBoundary>
  );
}

/**
 * React component that signals "content ready" AFTER React has committed,
 * the browser has painted (rAF), and fonts have loaded.
 * Placed as a sibling inside the render tree so it fires after portals mount.
 */
function ReadySignal() {
  useEffect(() => {
    let cancelled = false;
    // Double-rAF: first rAF runs after React commit, second rAF runs after
    // the browser has painted the frame with all pending style recalculations.
    // This ensures async-injected CSS (Vite HMR <style> tags) is fully applied
    // before we signal ready — prevents screenshots of unstyled content.
    requestAnimationFrame(() => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;
        document.fonts.ready.then(() => {
          if (cancelled) return;
          const root = document.getElementById('preview-root');
          if (root) root.setAttribute('data-preview-ready', 'true');
          window.__dynamiqueContentReady = true;
          const msg = { type: 'content-ready' };
          window.postMessage(msg, '*');
          if (window.parent !== window) {
            window.parent.postMessage(msg, '*');
          }
        });
      });
    });
    return () => { cancelled = true; };
  }, []);
  return null;
}
