import { ThemeSwitch } from './theme-switch';
import { ThemeProvider } from '../context/theme-context';

function ThemeSwitchPreview() {
  return (
    <ThemeProvider defaultTheme="light">
      <div style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
        <ThemeSwitch />
        <span style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>Click to toggle</span>
      </div>
    </ThemeProvider>
  );
}

const meta = {
  component: ThemeSwitchPreview,
};

export default meta;

export const Default = {};
