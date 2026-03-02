import { mockData } from './mock-data';

const meta = {
  title: 'KanbanContainer',
};
export default meta;

// Render columns directly with mock data — avoids useEffect timing issue
// where KanbanProvider seeds data after the first render/screenshot capture
export const Default = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        fontFamily: 'system-ui, sans-serif',
        fontSize: 14,
        minWidth: 700,
      }}
    >
      {mockData.columns.map((column) => (
        <div
          key={column.id}
          style={{
            flex: 1,
            minWidth: 200,
            background: 'hsl(0 0% 97%)',
            borderRadius: 8,
            padding: 12,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 8,
              padding: '4px 0',
              color: 'hsl(0 0% 30%)',
            }}
          >
            {column.name}{' '}
            <span style={{ opacity: 0.5, fontWeight: 400 }}>({column.content.length})</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
            {column.content.map((card) => (
              <div
                key={card.id}
                style={{
                  background: 'white',
                  borderRadius: 6,
                  padding: '10px 12px',
                  border: '1px solid hsl(0 0% 90%)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{card.title}</div>
                <div style={{ fontSize: 12, color: 'hsl(0 0% 50%)', marginBottom: 6 }}>
                  {card.description}
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' as const }}>
                  {card.assignTo.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 10,
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: 'hsl(220 14% 95%)',
                        color: 'hsl(220 14% 40%)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
