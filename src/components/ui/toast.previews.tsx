import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast';

function DefaultToast() {
  return (
    <ToastProvider swipeDirection="right" duration={Infinity}>
      <Toast open onOpenChange={() => {}}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>Something happened successfully.</ToastDescription>
        </div>
        <ToastAction altText="Undo">Undo</ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

function DestructiveToast() {
  return (
    <ToastProvider swipeDirection="right" duration={Infinity}>
      <Toast variant="destructive" open onOpenChange={() => {}}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong.</ToastDescription>
        </div>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

const meta = { component: DefaultToast };
export default meta;

export const Default = {};

export const Destructive = {
  render: () => <DestructiveToast />,
};
