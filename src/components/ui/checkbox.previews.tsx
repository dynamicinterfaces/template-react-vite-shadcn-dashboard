import { Checkbox } from './checkbox';
import { Label } from './label';
const meta = {
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

export const Default = {};
export const Checked = { args: { checked: true } };
export const Disabled = { args: { disabled: true } };

export const WithLabel = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 16 }}>
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};
