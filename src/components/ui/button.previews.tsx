import { Button } from './button';

const meta = { component: Button };
export default meta;

export const Default = { args: { children: 'Click me', variant: 'default' } };
export const Secondary = { args: { children: 'Secondary', variant: 'secondary' } };
export const Destructive = { args: { children: 'Delete', variant: 'destructive' } };
export const Outline = { args: { children: 'Outline', variant: 'outline' } };
export const Ghost = { args: { children: 'Ghost', variant: 'ghost' } };
export const Small = { args: { children: 'Small', size: 'sm' } };
export const Large = { args: { children: 'Large', size: 'lg' } };
