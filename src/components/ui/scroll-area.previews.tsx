import { ScrollArea } from './scroll-area';

const meta = { component: ScrollArea };
export default meta;

export const Default = {
  render: () => (
    <ScrollArea style={{ height: 200, width: 300, border: '1px solid #ccc', borderRadius: 8 }}>
      <div style={{ padding: 16 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} style={{ margin: '8px 0' }}>Item {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),
};
