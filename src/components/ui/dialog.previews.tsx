import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

const meta = { component: Dialog };
export default meta;

export const Default = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <button style={{ padding: '8px 16px' }}>Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is a dialog description.</DialogDescription>
        </DialogHeader>
        <div>Dialog body content goes here.</div>
        <DialogFooter>
          <button style={{ padding: '8px 16px' }}>Save</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
