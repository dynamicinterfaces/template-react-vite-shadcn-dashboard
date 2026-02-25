import React, { useCallback } from 'react';

interface ArgTypeConfig {
  control?: string | { type?: string; options?: string[] };
  type?: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface StoryEntry {
  name: string;
}

interface ArgTypesPanelProps {
  argTypes: Record<string, ArgTypeConfig | string>;
  args: Record<string, any>;
  stories?: StoryEntry[];
  activeStory?: string | null;
  onArgsChange: (args: Record<string, any>) => void;
  onStoryChange?: (storyName: string) => void;
}

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: 'uppercase',
  opacity: 0.6,
  marginBottom: 4,
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  padding: '4px 8px',
  borderRadius: 4,
  border: '1px solid #333',
  background: '#1a1a1a',
  color: '#eee',
  width: '100%',
  fontSize: 13,
};

export function ArgTypesPanel({
  argTypes,
  args,
  stories,
  activeStory,
  onArgsChange,
  onStoryChange,
}: ArgTypesPanelProps) {
  const handleChange = useCallback(
    (key: string, value: any) => {
      onArgsChange({ ...args, [key]: value });
    },
    [args, onArgsChange],
  );

  const controls: React.ReactNode[] = [];

  // Story picker (if multiple stories)
  if (stories && stories.length > 1 && onStoryChange) {
    controls.push(
      <label key="__story" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={labelStyle}>Story</span>
        <select
          value={activeStory || ''}
          onChange={(e) => onStoryChange(e.target.value)}
          style={inputStyle}
        >
          {stories.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </label>,
    );
    controls.push(
      <hr key="__hr" style={{ border: 'none', borderTop: '1px solid #333', margin: '4px 0' }} />,
    );
  }

  // Generate controls from argTypes
  for (const [key, config] of Object.entries(argTypes || {})) {
    const val = args[key];
    const controlType = typeof config === 'string' ? config : config.control || config.type || 'text';
    const controlName = typeof controlType === 'string' ? controlType : (controlType as any).type || 'text';

    if (controlName === 'select' || controlName === 'radio' || controlName === 'inline-radio') {
      const options =
        (typeof config !== 'string' && config.options) ||
        (typeof controlType === 'object' ? (controlType as any).options : []) ||
        [];
      controls.push(
        <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={labelStyle}>{key}</span>
          <select
            value={val ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
            style={inputStyle}
          >
            {options.map((o: string) => (
              <option key={o} value={o}>
                {String(o)}
              </option>
            ))}
          </select>
        </label>,
      );
    } else if (controlName === 'boolean') {
      controls.push(
        <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={!!val}
            onChange={(e) => handleChange(key, e.target.checked)}
          />
          <span style={labelStyle}>{key}</span>
        </label>,
      );
    } else if (controlName === 'number' || controlName === 'range') {
      const cfg = typeof config !== 'string' ? config : {};
      controls.push(
        <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={labelStyle}>{key}</span>
          <input
            type="number"
            value={val ?? 0}
            min={(cfg as any).min}
            max={(cfg as any).max}
            step={(cfg as any).step}
            onChange={(e) => handleChange(key, Number(e.target.value))}
            style={inputStyle}
          />
        </label>,
      );
    } else if (controlName === 'color') {
      controls.push(
        <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={labelStyle}>{key}</span>
          <input
            type="color"
            value={val ?? '#000000'}
            onChange={(e) => handleChange(key, e.target.value)}
            style={{ ...inputStyle, height: 32, padding: 2 }}
          />
        </label>,
      );
    } else {
      // Default: text input
      controls.push(
        <label key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={labelStyle}>{key}</span>
          <input
            type="text"
            value={val ?? ''}
            onChange={(e) => handleChange(key, e.target.value)}
            style={inputStyle}
          />
        </label>,
      );
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12, fontSize: 13 }}>
      {controls}
    </div>
  );
}
