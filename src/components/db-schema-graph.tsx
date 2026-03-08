import { ReactFlow, Background, BackgroundVariant, type Node, type Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

interface TableNodeData {
  name: string
  columns: { name: string; type: string; pk?: boolean; fk?: boolean }[]
}

function TableNode({ data }: { data: TableNodeData }) {
  return (
    <div className='rounded-lg border border-border bg-card text-card-foreground shadow-sm min-w-[200px]'>
      <div className='px-3 py-2 bg-muted rounded-t-lg border-b border-border'>
        <span className='text-xs font-semibold text-foreground tracking-wide uppercase'>{data.name}</span>
      </div>
      <div className='px-3 py-1.5 space-y-0.5'>
        {data.columns.map((col) => (
          <div key={col.name} className='flex items-center gap-2 text-xs'>
            <span className={col.pk ? 'text-primary font-medium' : col.fk ? 'text-muted-foreground' : 'text-foreground'}>
              {col.name}
            </span>
            <span className='text-muted-foreground/60 ml-auto'>{col.type}</span>
            {col.pk && <span className='text-[10px] text-primary font-bold'>PK</span>}
            {col.fk && <span className='text-[10px] text-muted-foreground font-bold'>FK</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

const nodeTypes = { table: TableNode }

const nodes: Node[] = [
  {
    id: 'users',
    type: 'table',
    position: { x: 350, y: 20 },
    data: {
      name: 'users',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'email', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'created_at', type: 'timestamptz' },
      ],
    },
  },
  {
    id: 'minty-bridge',
    type: 'table',
    position: { x: 20, y: 200 },
    data: {
      name: 'minty-bridge',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'name', type: 'text' },
        { name: 'bridge_type', type: 'text' },
        { name: 'status', type: 'text' },
        { name: 'created_at', type: 'timestamptz' },
        { name: 'updated_at', type: 'timestamptz' },
        { name: 'owner_id', type: 'uuid', fk: true },
      ],
    },
  },
  {
    id: 'universal-mcp',
    type: 'table',
    position: { x: 340, y: 230 },
    data: {
      name: 'universal-mcp',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'session_id', type: 'text' },
        { name: 'user_id', type: 'uuid', fk: true },
        { name: 'tool_name', type: 'text' },
        { name: 'payload', type: 'jsonb' },
        { name: 'created_at', type: 'timestamptz' },
        { name: 'status', type: 'text' },
      ],
    },
  },
  {
    id: 'auction',
    type: 'table',
    position: { x: 660, y: 200 },
    data: {
      name: 'auction',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'start_price', type: 'numeric' },
        { name: 'current_bid', type: 'numeric' },
        { name: 'end_at', type: 'timestamptz' },
        { name: 'seller_id', type: 'uuid', fk: true },
        { name: 'status', type: 'text' },
      ],
    },
  },
]

const edges: Edge[] = [
  {
    id: 'minty-bridge-owner',
    source: 'minty-bridge',
    target: 'users',
    label: 'owner_id',
    animated: true,
    style: { stroke: 'hsl(var(--primary))' },
    labelStyle: { fontSize: 10, fill: 'hsl(var(--muted-foreground))' },
    labelBgStyle: { fill: 'hsl(var(--background))' },
  },
  {
    id: 'universal-mcp-user',
    source: 'universal-mcp',
    target: 'users',
    label: 'user_id',
    animated: true,
    style: { stroke: 'hsl(var(--primary))' },
    labelStyle: { fontSize: 10, fill: 'hsl(var(--muted-foreground))' },
    labelBgStyle: { fill: 'hsl(var(--background))' },
  },
  {
    id: 'auction-seller',
    source: 'auction',
    target: 'users',
    label: 'seller_id',
    animated: true,
    style: { stroke: 'hsl(var(--primary))' },
    labelStyle: { fontSize: 10, fill: 'hsl(var(--muted-foreground))' },
    labelBgStyle: { fill: 'hsl(var(--background))' },
  },
]

export function DbSchemaGraph() {
  return (
    <div style={{ width: '100%', height: 420 }} className='rounded-lg border border-border overflow-hidden'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll={false}
        zoomOnScroll={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} className='opacity-30' />
      </ReactFlow>
    </div>
  )
}

export default DbSchemaGraph
