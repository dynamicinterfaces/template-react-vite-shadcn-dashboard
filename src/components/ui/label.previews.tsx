import { Label } from './label';
import { Meta } from '../../.dynamique/lib/csf';

const meta: Meta = {
  component: Label,
  args: { children: 'Label text' },
};
export default meta;

export const Default = { args: { children: 'Email address' } };
export const Required = {
  render: () => (
    <Label>Username <span style={{ color: 'red' }}>*</span></Label>
  ),
};
