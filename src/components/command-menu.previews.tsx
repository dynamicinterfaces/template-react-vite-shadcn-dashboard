import { ThemeProvider } from '@/context/theme-context';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const meta = {
  title: 'CommandMenu',
};
export default meta;

export const Default = {
  render: () => (
    <ThemeProvider defaultTheme="light">
      <div style={{ padding: 16, minHeight: 400 }}>
        <p style={{ marginBottom: 8, color: '#64748b', fontSize: 14 }}>
          Command menu (shown inline for preview):
        </p>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
          <CommandDialog open modal={false} onOpenChange={() => {}}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem>Dashboard</CommandItem>
                <CommandItem>Kanban Board</CommandItem>
                <CommandItem>Payment</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Theme">
                <CommandItem>Light</CommandItem>
                <CommandItem>Dark</CommandItem>
                <CommandItem>System</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </div>
      </div>
    </ThemeProvider>
  ),
};
