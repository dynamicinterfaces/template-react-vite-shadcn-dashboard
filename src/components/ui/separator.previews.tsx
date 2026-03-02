import { Separator } from './separator';

const meta = { component: Separator };
export default meta;

export const Horizontal = { args: { orientation: 'horizontal' } };
export const Vertical = {
  args: { orientation: 'vertical' },
  decorators: [(Story: any) => (<div style={{ height: 100 }}><Story /></div>)],
};
