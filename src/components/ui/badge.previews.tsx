import { Badge } from './badge';

const meta = { component: Badge };
export default meta;

export const Default = { args: { children: 'Badge' } };
export const Secondary = { args: { children: 'Secondary', variant: 'secondary' } };
export const Destructive = { args: { children: 'Destructive', variant: 'destructive' } };
export const Outline = { args: { children: 'Outline', variant: 'outline' } };
