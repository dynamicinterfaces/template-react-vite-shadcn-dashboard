import { Label } from './label';
const meta = {
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
