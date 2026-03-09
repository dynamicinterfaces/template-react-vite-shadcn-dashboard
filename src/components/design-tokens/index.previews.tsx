import { MemoryRouter } from 'react-router'
import DesignTokens from './index'

function Preview() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflowY: 'auto' }}>
      <MemoryRouter>
        <DesignTokens />
      </MemoryRouter>
    </div>
  )
}

const meta = { title: 'Design Tokens', component: Preview }
export default meta
export const Default = {}
