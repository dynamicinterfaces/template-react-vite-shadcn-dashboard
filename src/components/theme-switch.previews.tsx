import { ThemeSwitch } from './theme-switch';
import { ThemeProvider } from '@/context/theme-context';

const meta = {
  component: ThemeSwitch,
  decorators: [
    (Story: React.FC) => (
      <ThemeProvider defaultTheme="light">
        <div style={{ padding: 16 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
export default meta;

export const Default = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div style={{ padding: 16 }}>
        <ThemeSwitch />
      </div>
    </ThemeProvider>
  ),
};
