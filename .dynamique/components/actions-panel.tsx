import React, { useState, useEffect, useCallback } from 'react';

interface ActionEntry {
  name: string;
  args: any[];
  time: number;
}

interface ActionsPanelProps {
  actionNames: string[];
}

const headerStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: 11,
  textTransform: 'uppercase',
  opacity: 0.6,
  padding: '8px 0 4px',
  display: 'block',
};

const entryStyle: React.CSSProperties = {
  fontFamily: "'SF Mono', 'Fira Code', monospace",
  fontSize: 11,
  padding: '3px 0',
  borderBottom: '1px solid #222',
  display: 'flex',
  gap: 8,
  alignItems: 'baseline',
};

const nameStyle: React.CSSProperties = { color: '#60a5fa', fontWeight: 500, flexShrink: 0 };
const argsStyle: React.CSSProperties = {
  color: '#a1a1aa',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
const emptyStyle: React.CSSProperties = {
  fontSize: 11,
  color: '#52525b',
  padding: '8px 0',
  fontStyle: 'italic',
};
const clearStyle: React.CSSProperties = {
  fontSize: 10,
  color: '#71717a',
  background: 'none',
  border: '1px solid #333',
  borderRadius: 4,
  padding: '2px 8px',
  cursor: 'pointer',
  marginLeft: 'auto',
};

const MAX_ENTRIES = 50;

export function ActionsPanel({ actionNames }: ActionsPanelProps) {
  const [entries, setEntries] = useState<ActionEntry[]>([]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'action-fired') {
        setEntries((prev) => {
          const next = [
            { name: e.data.name, args: e.data.args, time: e.data.timestamp },
            ...prev,
          ];
          return next.slice(0, MAX_ENTRIES);
        });
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const handleClear = useCallback(() => setEntries([]), []);

  return (
    <div style={{ padding: '0 12px 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={headerStyle}>Actions ({actionNames.length})</span>
        {entries.length > 0 && (
          <button onClick={handleClear} style={clearStyle}>
            Clear
          </button>
        )}
      </div>
      {actionNames.length === 0 ? (
        <div style={emptyStyle}>No callbacks</div>
      ) : entries.length === 0 ? (
        <div style={emptyStyle}>
          {actionNames.map((n) => (
            <div key={n} style={{ padding: '2px 0', color: '#71717a' }}>
              {n}
            </div>
          ))}
        </div>
      ) : (
        entries.map((e, i) => (
          <div key={i} style={entryStyle}>
            <span style={nameStyle}>{e.name}</span>
            <span style={argsStyle}>{e.args?.length ? JSON.stringify(e.args) : '()'}</span>
          </div>
        ))
      )}
    </div>
  );
}
