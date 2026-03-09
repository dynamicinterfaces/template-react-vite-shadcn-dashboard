import { ReactFlowProvider } from '@xyflow/react'
import { DbSchemaGraph } from './db-schema-graph'

function Preview() {
  return (
    <ReactFlowProvider>
      <div style={{ width: 680, height: 420 }}>
        <DbSchemaGraph />
      </div>
    </ReactFlowProvider>
  )
}

const meta = { title: 'DB Schema Graph', component: Preview }
export default meta
export const Default = {}
