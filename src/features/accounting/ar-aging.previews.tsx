import { MemoryRouter } from 'react-router'
import ARAgingPage from './ar-aging'

function Preview() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflowY: 'auto' }}>
      <MemoryRouter><ARAgingPage /></MemoryRouter>
    </div>
  )
}
const meta = { title: 'AR Aging', component: Preview }
export default meta
export const Default = {}
