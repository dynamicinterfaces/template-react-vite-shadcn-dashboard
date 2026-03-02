import { Skeleton } from './skeleton';

const meta = { component: Skeleton };
export default meta;

export const Default = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton style={{ height: 40, width: 40, borderRadius: '50%' }} />
      <Skeleton style={{ height: 16, width: 200 }} />
      <Skeleton style={{ height: 16, width: 150 }} />
    </div>
  ),
};
