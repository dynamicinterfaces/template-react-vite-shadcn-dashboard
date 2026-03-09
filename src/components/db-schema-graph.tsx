import { ReactFlow, Background, BackgroundVariant, Handle, Position, type Node, type Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

interface TableNodeData {
  name: string
  columns: { name: string; type: string; pk?: boolean; fk?: boolean }[]
}

function TableNode({ data }: { data: TableNodeData }) {
  return (
    <div className='rounded-lg border border-border bg-card text-card-foreground shadow-sm min-w-[200px]'>
      <Handle type='target' position={Position.Top} style={{ background: 'hsl(var(--primary))' }} />
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
      <Handle type='source' position={Position.Bottom} style={{ background: 'hsl(var(--primary))' }} />
    </div>
  )
}

const nodeTypes = { table: TableNode }

const PRIMARY = 'hsl(var(--primary))'
const MUTED = 'hsl(var(--muted-foreground))'
const edgeLabel = { fontSize: 10, fill: 'hsl(var(--muted-foreground))' }
const edgeLabelBg = { fill: 'hsl(var(--background))', fillOpacity: 0.9 }

const nodes: Node[] = [
  {
    id: 'users',
    type: 'table',
    position: { x: 420, y: 0 },
    data: {
      name: 'users',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'email', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'avatar_url', type: 'text' },
        { name: 'role', type: 'text' },
        { name: 'created_at', type: 'timestamptz' },
      ],
    },
  },
  {
    id: 'organizations',
    type: 'table',
    position: { x: 60, y: 220 },
    data: {
      name: 'organizations',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'name', type: 'text' },
        { name: 'slug', type: 'text' },
        { name: 'plan', type: 'text' },
        { name: 'owner_id', type: 'uuid', fk: true },
        { name: 'created_at', type: 'timestamptz' },
      ],
    },
  },
  {
    id: 'org_members',
    type: 'table',
    position: { x: 420, y: 220 },
    data: {
      name: 'org_members',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'org_id', type: 'uuid', fk: true },
        { name: 'user_id', type: 'uuid', fk: true },
        { name: 'role', type: 'text' },
        { name: 'joined_at', type: 'timestamptz' },
      ],
    },
  },
  {
    id: 'payments',
    type: 'table',
    position: { x: 760, y: 220 },
    data: {
      name: 'payments',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'org_id', type: 'uuid', fk: true },
        { name: 'amount', type: 'numeric' },
        { name: 'currency', type: 'text' },
        { name: 'status', type: 'text' },
        { name: 'stripe_id', type: 'text' },
        { name: 'created_at', type: 'timestamptz' },
      ],
    },
  },
  {
    id: 'boards',
    type: 'table',
    position: { x: 60, y: 460 },
    data: {
      name: 'boards',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'org_id', type: 'uuid', fk: true },
        { name: 'name', type: 'text' },
        { name: 'created_by', type: 'uuid', fk: true },
        { name: 'created_at', type: 'timestamptz' },
      ],
    },
  },
  {
    id: 'invoices',
    type: 'table',
    position: { x: 760, y: 460 },
    data: {
      name: 'invoices',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'payment_id', type: 'uuid', fk: true },
        { name: 'stripe_invoice_id', type: 'text' },
        { name: 'pdf_url', type: 'text' },
        { name: 'issued_at', type: 'timestamptz' },
        { name: 'due_at', type: 'timestamptz' },
      ],
    },
  },
  {
    id: 'board_columns',
    type: 'table',
    position: { x: 60, y: 670 },
    data: {
      name: 'board_columns',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'board_id', type: 'uuid', fk: true },
        { name: 'name', type: 'text' },
        { name: 'position', type: 'int4' },
      ],
    },
  },
  {
    id: 'tags',
    type: 'table',
    position: { x: 760, y: 670 },
    data: {
      name: 'tags',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'org_id', type: 'uuid', fk: true },
        { name: 'name', type: 'text' },
        { name: 'color', type: 'text' },
      ],
    },
  },
  {
    id: 'cards',
    type: 'table',
    position: { x: 60, y: 860 },
    data: {
      name: 'cards',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'column_id', type: 'uuid', fk: true },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },
        { name: 'assignee_id', type: 'uuid', fk: true },
        { name: 'due_at', type: 'timestamptz' },
        { name: 'position', type: 'int4' },
      ],
    },
  },
  {
    id: 'card_tags',
    type: 'table',
    position: { x: 420, y: 860 },
    data: {
      name: 'card_tags',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'card_id', type: 'uuid', fk: true },
        { name: 'tag_id', type: 'uuid', fk: true },
      ],
    },
  },
  {
    id: 'comments',
    type: 'table',
    position: { x: 60, y: 1060 },
    data: {
      name: 'comments',
      columns: [
        { name: 'id', type: 'uuid', pk: true },
        { name: 'card_id', type: 'uuid', fk: true },
        { name: 'author_id', type: 'uuid', fk: true },
        { name: 'body', type: 'text' },
        { name: 'created_at', type: 'timestamptz' },
      ],
    },
  },
]

const mkEdge = (id: string, source: string, target: string, label: string, color = PRIMARY): Edge => ({
  id,
  source,
  target,
  label,
  type: 'smoothstep',
  animated: true,
  style: { stroke: color, strokeWidth: 1.5 },
  labelStyle: edgeLabel,
  labelBgStyle: edgeLabelBg,
  labelBgPadding: [4, 2] as [number, number],
  labelBgBorderRadius: 3,
})

const edges: Edge[] = [
  mkEdge('org-owner', 'organizations', 'users', 'owner_id'),
  mkEdge('member-org', 'org_members', 'organizations', 'org_id'),
  mkEdge('member-user', 'org_members', 'users', 'user_id', MUTED),
  mkEdge('payment-org', 'payments', 'organizations', 'org_id'),
  mkEdge('board-org', 'boards', 'organizations', 'org_id'),
  mkEdge('board-creator', 'boards', 'users', 'created_by', MUTED),
  mkEdge('invoice-payment', 'invoices', 'payments', 'payment_id'),
  mkEdge('col-board', 'board_columns', 'boards', 'board_id'),
  mkEdge('tags-org', 'tags', 'organizations', 'org_id', MUTED),
  mkEdge('card-col', 'cards', 'board_columns', 'column_id'),
  mkEdge('card-assignee', 'cards', 'users', 'assignee_id', MUTED),
  mkEdge('cardtag-card', 'card_tags', 'cards', 'card_id'),
  mkEdge('cardtag-tag', 'card_tags', 'tags', 'tag_id', MUTED),
  mkEdge('comment-card', 'comments', 'cards', 'card_id'),
  mkEdge('comment-author', 'comments', 'users', 'author_id', MUTED),
]

export function DbSchemaGraph() {
  return (
    <div style={{ width: '100%', height: '100%' }} className='rounded-lg border border-border overflow-hidden'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
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
