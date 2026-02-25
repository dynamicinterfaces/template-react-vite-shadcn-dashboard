import { Button } from './button';
const meta = {
  component: Button,
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    disabled: { control: 'boolean' },
  },
};
export default meta;

export const Default = { args: { children: 'Click me' } };
export const Destructive = { args: { variant: 'destructive', children: 'Delete' } };
export const Outline = { args: { variant: 'outline', children: 'Outline' } };
export const Secondary = { args: { variant: 'secondary', children: 'Secondary' } };
export const Ghost = { args: { variant: 'ghost', children: 'Ghost' } };
export const Link = { args: { variant: 'link', children: 'Link' } };
export const Small = { args: { size: 'sm', children: 'Small' } };
export const Large = { args: { size: 'lg', children: 'Large' } };
export const Disabled = { args: { disabled: true, children: 'Disabled' } };

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 16 }}>
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
