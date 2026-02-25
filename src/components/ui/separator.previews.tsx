import { Separator } from './separator';
import { Meta } from '../../.dynamique/lib/csf';

const meta: Meta = {
  component: Separator,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};
export default meta;

export const Horizontal = {
  render: () => (
    <div style={{ width: 300 }}>
      <p style={{ margin: '8px 0' }}>Above</p>
      <Separator />
      <p style={{ margin: '8px 0' }}>Below</p>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24 }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
