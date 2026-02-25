/**
 * Preview globals: apply colorScheme, background, padding to the document.
 */

declare global {
  interface Window {
    __dynamiquePreviewGlobals?: Record<string, string>;
    __dynamiqueContentReady?: boolean;
  }
}

export function applyPreviewGlobals(globals: Record<string, string>) {
  window.__dynamiquePreviewGlobals = globals;
  const root = document.getElementById('preview-root');

  if (globals.colorScheme) {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(globals.colorScheme);
    let meta = document.querySelector('meta[name="color-scheme"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'color-scheme';
      document.head.appendChild(meta);
    }
    meta.content = globals.colorScheme;
  }
  if (globals.background !== undefined && root) {
    root.style.background = globals.background;
  }
  if (globals.padding !== undefined && root) {
    root.style.padding =
      typeof globals.padding === 'number' ? globals.padding + 'px' : globals.padding;
  }
}

/** Parse query-string globals (everything except component and view). */
export function parseQueryGlobals(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const globals: Record<string, string> = {};
  for (const [k, v] of params.entries()) {
    if (k !== 'component' && k !== 'view' && k !== 'story') {
      globals[k] = v;
    }
  }
  return globals;
}
