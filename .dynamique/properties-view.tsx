import React, { useState, useEffect, useCallback } from 'react';
import { ArgTypesPanel } from './components/arg-types-panel';
import { ActionsPanel } from './components/actions-panel';
import { wireActions, sanitizeForPostMessage } from './lib/actions';
import type { StoryEntry } from './lib/csf';

interface PropertiesViewProps {
  argTypes: Record<string, any>;
  metaArgs: Record<string, any>;
  stories: StoryEntry[];
  initialStory: string | null;
}

/**
 * Properties view: renders ArgTypesPanel + ActionsPanel.
 * Sends `preview-args-changed` and `preview-schema` postMessages.
 */
export function PropertiesView({ argTypes, metaArgs, stories, initialStory }: PropertiesViewProps) {
  // Resolve initial args from the active story
  const resolveArgs = (storyName: string | null) => {
    if (storyName) {
      const s = stories.find((s) => s.name === storyName);
      if (s) return { ...s.args };
    }
    return { ...metaArgs };
  };

  const [activeStory, setActiveStory] = useState(initialStory);
  const [args, setArgs] = useState(() => resolveArgs(initialStory));

  // Detect action names from current args
  const { actionNames } = wireActions(args);

  const handleArgsChange = useCallback((nextArgs: Record<string, any>) => {
    setArgs(nextArgs);
    window.parent.postMessage(
      { type: 'preview-args-changed', args: sanitizeForPostMessage(nextArgs) },
      '*',
    );
  }, []);

  const handleStoryChange = useCallback(
    (storyName: string) => {
      setActiveStory(storyName);
      const newArgs = resolveArgs(storyName);
      setArgs(newArgs);
      window.parent.postMessage(
        { type: 'preview-args-changed', args: sanitizeForPostMessage(newArgs) },
        '*',
      );
      window.parent.postMessage({ type: 'preview-story-changed', story: storyName }, '*');
    },
    [stories, metaArgs],
  );

  // Listen for external arg updates (e.g. from Yjs via parent)
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'update-preview-args' && e.data.args) {
        setArgs(e.data.args);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Send schema on mount
  useEffect(() => {
    window.parent.postMessage(
      {
        type: 'preview-schema',
        format: 'csf',
        hasProperties: true,
        argTypes: sanitizeForPostMessage(argTypes),
        actions: actionNames,
        stories: stories.map((s) => s.name),
        defaults: sanitizeForPostMessage(args),
      },
      '*',
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <ArgTypesPanel
        argTypes={argTypes}
        args={args}
        stories={stories}
        activeStory={activeStory}
        onArgsChange={handleArgsChange}
        onStoryChange={handleStoryChange}
      />
      {actionNames.length > 0 && (
        <div style={{ borderTop: '1px solid #333', marginTop: 8 }}>
          <ActionsPanel actionNames={actionNames} />
        </div>
      )}
    </div>
  );
}
