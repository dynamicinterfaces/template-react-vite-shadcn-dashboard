import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './command';

const meta = { component: Command };
export default meta;

export const Default = {
  render: () => (
    <Command style={{ border: '1px solid #ccc', borderRadius: 8, width: 350 }}>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem>New File</CommandItem>
          <CommandItem>New Folder</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
