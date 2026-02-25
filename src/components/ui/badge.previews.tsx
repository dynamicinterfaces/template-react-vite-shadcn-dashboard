import { Badge } from './badge';
const meta = {
  component: Badge,
  args: { children: 'Badge' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline'] },
  },
};
export default meta;

export const Default = { args: { children: 'Default' } };
export const Secondary = { args: { variant: 'secondary', children: 'Secondary' } };
export const Destructive = { args: { variant: 'destructive', children: 'Destructive' } };
export const Outline = { args: { variant: 'outline', children: 'Outline' } };

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, padding: 16 }}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};
