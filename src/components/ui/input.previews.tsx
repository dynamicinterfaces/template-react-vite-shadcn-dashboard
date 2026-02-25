import { Input } from './input';
import { Label } from './label';
const meta = {
  component: Input,
  args: { placeholder: 'Type something...' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};
export default meta;

export const Default = { args: { placeholder: 'Enter text...' } };
export const Email = { args: { type: 'email', placeholder: 'email@example.com' } };
export const Password = { args: { type: 'password', placeholder: 'Password' } };
export const Disabled = { args: { disabled: true, placeholder: 'Disabled', value: 'Cannot edit' } };

export const WithLabel = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 300 }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="email@example.com" />
    </div>
  ),
};
