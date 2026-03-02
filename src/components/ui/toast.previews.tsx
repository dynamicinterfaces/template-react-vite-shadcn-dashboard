import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast';

function ToastDemo() {
  return (
    <ToastProvider swipeDirection="right" duration={Infinity}>
      <Toast open onOpenChange={() => {}}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>Something happened successfully.</ToastDescription>
        </div>
        <ToastAction altText="Undo">Undo</ToastAction>
      </Toast>
      <ToastViewport style={{ position: 'relative', top: 'auto', right: 'auto', bottom: 'auto', maxWidth: '100%' }} />
    </ToastProvider>
  );
}

const meta = { component: ToastDemo };
export default meta;

export const Default = {};
