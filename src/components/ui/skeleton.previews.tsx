import { Skeleton } from './skeleton';
import { Meta } from '../../.dynamique/lib/csf';

const meta: Meta = {
  component: Skeleton,
};
export default meta;

export const Default = {
  render: () => <Skeleton style={{ width: 200, height: 20 }} />,
};

export const CardSkeleton = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
      <Skeleton style={{ width: 300, height: 200, borderRadius: 12 }} />
      <Skeleton style={{ width: 200, height: 16 }} />
      <Skeleton style={{ width: 260, height: 12 }} />
      <Skeleton style={{ width: 160, height: 12 }} />
    </div>
  ),
};
