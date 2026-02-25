/**
 * Action wiring and serialization utilities for preview.
 * Detects callback args and wraps them to fire postMessage events.
 */

/** Strip non-cloneable values (functions, symbols) so postMessage doesn't throw. */
export function sanitizeForPostMessage(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;
  const clean: Record<string, any> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'function' || typeof v === 'symbol') continue;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      clean[k] = sanitizeForPostMessage(v);
    } else {
      clean[k] = v;
    }
  }
  return clean;
}

export interface WireActionsResult {
  actionNames: string[];
  liveArgs: Record<string, any>;
}

/**
 * Detect which arg keys are functions (callbacks).
 * Returns { actionNames, liveArgs } where liveArgs has functions replaced
 * with postMessage-firing wrappers.
 */
export function wireActions(args: Record<string, any>): WireActionsResult {
  const actionNames: string[] = [];
  const liveArgs: Record<string, any> = {};
  for (const [k, v] of Object.entries(args)) {
    if (typeof v === 'function') {
      actionNames.push(k);
      liveArgs[k] = (...callArgs: any[]) => {
        const serialized = callArgs.map((a) => {
          if (a && a.nativeEvent)
            return { type: 'SyntheticEvent', eventType: a.type };
          try {
            JSON.stringify(a);
            return a;
          } catch {
            return String(a);
          }
        });
        window.parent.postMessage(
          { type: 'action-fired', name: k, args: serialized, timestamp: Date.now() },
          '*',
        );
      };
    } else {
      liveArgs[k] = v;
    }
  }
  return { actionNames, liveArgs };
}
