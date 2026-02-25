import React, { useState, useEffect } from 'react';
import { wireActions } from './lib/actions';

type DecoratorFn = (Story: React.ComponentType, context?: any) => React.ReactNode;

interface PreviewViewProps {
  Component: React.ComponentType<any>;
  renderFn?: ((args: Record<string, any>) => React.ReactNode) | null;
  initialArgs: Record<string, any>;
  Shell?: React.ComponentType<{ children: React.ReactNode }> | null;
  decorators?: DecoratorFn[];
}

/**
 * Preview view: renders the component with args.
 * Listens for `update-preview-args` postMessage to update args in real time.
 */
export function PreviewView({ Component, renderFn, initialArgs, Shell, decorators = [] }: PreviewViewProps) {
  const { actionNames, liveArgs } = wireActions(initialArgs);
  const [args, setArgs] = useState(liveArgs);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'update-preview-args' && e.data.args) {
        const actionEntries = actionNames.map((n) => [n, args[n]] as const);
        const merged = { ...e.data.args, ...Object.fromEntries(actionEntries) };
        const { liveArgs: rewired } = wireActions(merged);
        setArgs(rewired);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [args, actionNames]);

  // Strip action-wrapped callbacks from props passed to component.
  // Actions are for postMessage reporting only — passing them as props causes
  // React "Unknown event handler property" warnings when components spread onto DOM.
  const propsForComponent = actionNames.length > 0
    ? Object.fromEntries(Object.entries(args).filter(([k]) => !actionNames.includes(k)))
    : args;
  let rendered = renderFn ? renderFn(args) : <Component {...propsForComponent} />;

  // Apply CSF decorators (outermost first)
  for (let i = decorators.length - 1; i >= 0; i--) {
    const decorator = decorators[i];
    const inner = rendered;
    rendered = <>{decorator(() => <>{inner}</>, { args })}</>;
  }

  return Shell ? <Shell>{rendered}</Shell> : <>{rendered}</>;
}
