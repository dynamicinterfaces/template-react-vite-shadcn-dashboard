import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const PRIMARY = 'hsl(var(--primary))';
const MUTED = 'hsl(var(--muted-foreground))';

const edgeLabel = { fill: 'hsl(var(--foreground))', fontSize: 10 };
const edgeLabelBg = { fill: 'hsl(var(--background))', fillOpacity: 0.8 };

const mkEdge = (
  id: string,
  source: string,
  target: string,
  label: string,
  color = PRIMARY
): Edge => ({
  id,
  source,
  target,
  label,
  type: 'smoothstep',
  animated: true,
  style: { stroke: color, strokeWidth: 1.5 },
  labelStyle: edgeLabel,
  labelBgStyle: edgeLabelBg,
});

const nodeStyle = {
  background: 'hsl(var(--card))',
  border: '1px solid hsl(var(--border))',
  borderRadius: 8,
  padding: '10px 14px',
  minWidth: 160,
  color: 'hsl(var(--card-foreground))',
  fontSize: 13,
  fontFamily: 'inherit',
};

const mkNode = (id: string, label: string, position: { x: number; y: number }): Node => ({
  id,
  position,
  data: { label },
  style: nodeStyle,
});

const initialNodes: Node[] = [
  mkNode('users',        '👤 users',         { x: 400, y: 0 }),
  mkNode('orgs',         '🏢 organizations', { x: 100, y: 120 }),
  mkNode('org_members',  '🔗 org_members',   { x: 250, y: 250 }),
  mkNode('payments',     '💳 payments',      { x: 700, y: 120 }),
  mkNode('invoices',     '🧾 invoices',      { x: 700, y: 280 }),
  mkNode('boards',       '📋 boards',        { x: 100, y: 400 }),
  mkNode('board_cols',   '📁 board_columns', { x: 100, y: 530 }),
  mkNode('cards',        '🗂 cards',         { x: 400, y: 460 }),
  mkNode('tags',         '🏷 tags',          { x: 650, y: 430 }),
  mkNode('card_tags',    '🔀 card_tags',     { x: 520, y: 580 }),
  mkNode('comments',     '💬 comments',      { x: 400, y: 640 }),
];

const initialEdges: Edge[] = [
  // users → orgs (via org_members)
  mkEdge('e1',  'users',      'org_members', 'user_id'),
  mkEdge('e2',  'orgs',       'org_members', 'org_id'),
  // payments & invoices → users
  mkEdge('e3',  'users',      'payments',    'user_id'),
  mkEdge('e4',  'users',      'invoices',    'user_id', MUTED),
  // payments → invoices
  mkEdge('e5',  'payments',   'invoices',    'payment_id', MUTED),
  // boards → orgs & users
  mkEdge('e6',  'orgs',       'boards',      'org_id'),
  mkEdge('e7',  'users',      'boards',      'owner_id', MUTED),
  // board_columns → boards
  mkEdge('e8',  'boards',     'board_cols',  'board_id'),
  // cards → board_columns & users
  mkEdge('e9',  'board_cols', 'cards',       'column_id'),
  mkEdge('e10', 'users',      'cards',       'assignee_id', MUTED),
  // card_tags → cards & tags
  mkEdge('e11', 'cards',      'card_tags',   'card_id'),
  mkEdge('e12', 'tags',       'card_tags',   'tag_id'),
  // comments → cards & users
  mkEdge('e13', 'cards',      'comments',    'card_id'),
  mkEdge('e14', 'users',      'comments',    'author_id', MUTED),
  // invoices → orgs
  mkEdge('e15', 'orgs',       'invoices',    'org_id', MUTED),
];

export function DbSchemaGraph() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: 600 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export default DbSchemaGraph;
