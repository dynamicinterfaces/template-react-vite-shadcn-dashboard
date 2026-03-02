import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

const meta = { component: Sheet };
export default meta;

export const Default = {
  render: () => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <button style={{ padding: '8px 16px' }}>Open Sheet</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>Sheet description text.</SheetDescription>
        </SheetHeader>
        <div style={{ padding: 16 }}>Sheet body content.</div>
      </SheetContent>
    </Sheet>
  ),
};
