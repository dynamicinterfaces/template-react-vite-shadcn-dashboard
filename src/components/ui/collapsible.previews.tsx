import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible';

const meta = { component: Collapsible };
export default meta;

export const Default = {
  render: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <button style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4 }}>Toggle</button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div style={{ padding: 16, marginTop: 8, border: '1px solid #eee', borderRadius: 4 }}>
          Collapsible content here.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};
