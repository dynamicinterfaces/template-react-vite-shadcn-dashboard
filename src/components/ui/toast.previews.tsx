import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast';

const meta = { component: Toast };
export default meta;

export const Default = {
  render: () => (
    <ToastProvider>
      <Toast open>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>Something happened successfully.</ToastDescription>
        </div>
        <ToastAction altText="Undo">Undo</ToastAction>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};

export const Destructive = {
  render: () => (
    <ToastProvider>
      <Toast variant="destructive" open>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong.</ToastDescription>
        </div>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  ),
};
