import { MemoryRouter } from 'react-router'
import IncomeStatement from './income-statement'

function Preview() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflowY: 'auto' }}>
      <MemoryRouter><IncomeStatement /></MemoryRouter>
    </div>
  )
}
const meta = { title: 'Income Statement', component: Preview }
export default meta
export const Default = {}
