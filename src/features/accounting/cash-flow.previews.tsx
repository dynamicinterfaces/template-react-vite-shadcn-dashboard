import { MemoryRouter } from 'react-router'
import CashFlowStatement from './cash-flow'

function Preview() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflowY: 'auto' }}>
      <MemoryRouter><CashFlowStatement /></MemoryRouter>
    </div>
  )
}
const meta = { title: 'Cash Flow Statement', component: Preview }
export default meta
export const Default = {}
