import { Input } from './input';

const meta = { component: Input };
export default meta;

export const Default = { args: { placeholder: 'Enter text...' } };
export const WithValue = { args: { defaultValue: 'Hello world' } };
export const Disabled = { args: { placeholder: 'Disabled', disabled: true } };
export const Password = { args: { type: 'password', placeholder: 'Password' } };
