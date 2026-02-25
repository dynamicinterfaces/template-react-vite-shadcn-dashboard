import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Meta } from '../../.dynamique/lib/csf';

const meta: Meta = {
  component: Avatar,
};
export default meta;

export const WithImage = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback = {
  render: () => (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar style={{ width: 24, height: 24 }}>
        <AvatarFallback style={{ fontSize: 10 }}>S</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar style={{ width: 56, height: 56 }}>
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
    </div>
  ),
};
