import React, { useState, useEffect, useCallback } from 'react';
import { PreviewView } from './preview-view';
import { PropertiesView } from './properties-view';
import { isCSF, extractStories, inferArgTypes } from './lib/csf';
import { wireActions, sanitizeForPostMessage } from './lib/actions';
import { applyPreviewGlobals, parseQueryGlobals } from './lib/globals';

type PreviewShellType = React.ComponentType<{ children: React.ReactNode }>;

interface PreviewAppProps {
  componentPath: string;
  view: 'preview' | 'properties';
  storyParam: string | null;
  hasShell: boolean;
}

/**
 * Resolve a repo-relative component path to a Vite-importable path.
 */
function resolveImportPath(activePath: string): string {
  const appRoot = document.documentElement.dataset.appRoot || '';
  let resolvedPath = activePath;
  if (appRoot && resolvedPath.startsWith(appRoot + '/')) {
    resolvedPath = resolvedPath.slice(appRoot.length + 1);
  } else if (appRoot && !resolvedPath.startsWith(appRoot) && resolvedPath.startsWith('packages/')) {
    resolvedPath = '/@fs/root/user-repo/' + resolvedPath;
  }
  return resolvedPath.startsWith('/') || resolvedPath.startsWith('.') || resolvedPath.startsWith('@')
    ? resolvedPath
    : '/' + resolvedPath;
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

  const load = useCallback(async (cancelled: { current: boolean }) => {
    if (activePath === '__blank' || activePath === '/__blank') {
      setContent(null);
      return;
    }

    try {
      const importPath = resolveImportPath(activePath);
      // Cache-bust so browser fetches the latest module version
      const url = `${importPath}${importPath.includes('?') ? '&' : '?'}t=${Date.now()}`;
      const Exports = await import(/* @vite-ignore */ url);

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

      if (cancelled.current) return;

      // ── CSF format ──
      if (isCSF(Exports)) {
        const meta = Exports.default;
        const Component = meta.component;
        const metaArgs = meta.args || {};
        const argTypes = { ...inferArgTypes(metaArgs), ...(meta.argTypes || {}) };
        const stories = extractStories(Exports, metaArgs);

        if (view === 'properties') {
          const initialStory = storyParam || stories[0]?.name || null;
          setContent(
            <PropertiesView
              argTypes={argTypes}
              metaArgs={metaArgs}
              stories={stories}
              initialStory={initialStory}
            />,
          );
          signalReady();
          return;
        }

        // ── Preview view ──
        let initialArgs = { ...metaArgs };
        let storyRenderFn: ((args: Record<string, any>) => any) | null = null;
        const targetStory = storyParam || stories[0]?.name || null;
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
          <PreviewView
            key={Date.now()}
            Component={Component}
            renderFn={renderFn}
            initialArgs={initialArgs}
            Shell={Shell}
            decorators={allDecorators}
          />,
        );
        signalReady();
        return;
      }

      // ── Simple component (default export is a function) ──
      const Component =
        typeof Exports.default === 'function' ? Exports.default : null;

      if (!Component) {
        setContent(
          <div style={{ padding: 16, color: '#888' }}>
            No renderable component or CSF meta found
          </div>,
        );
        signalReady();
        return;
      }

      setContent(
        Shell ? (
          <Shell>
            <Component />
          </Shell>
        ) : (
          <Component />
        ),
      );
      signalReady();
    } catch (e: any) {
      if (!cancelled.current) {
        setContent(
          <div style={{ padding: 16, color: 'red' }}>Error: {e.message}</div>,
        );
      }
    }
  }, [activePath, view, storyParam, hasShell]);

  // Load component (runs on mount and when reloadKey bumps)
  useEffect(() => {
    const cancelled = { current: false };
    load(cancelled);
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
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  return <>{content}</>;
}

function signalReady() {
  setTimeout(() => {
    const root = document.getElementById('preview-root');
    if (root) root.setAttribute('data-preview-ready', 'true');
    window.__dynamiqueContentReady = true;
    // Post to both self (for internal listeners) and parent (for LiveIframeOverlay)
    window.postMessage({ type: 'content-ready' }, '*');
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'content-ready' }, '*');
    }
  }, 50);
}
