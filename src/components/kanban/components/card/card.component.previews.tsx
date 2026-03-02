import { Card } from './card.component';

const meta = {
  component: Card,
};
export default meta;

export const Default = {
  render: () => (
    <div style={{ width: 300, padding: 16 }}>
      <Card
        columnId={1}
        content={{
          id: 1,
          title: 'Implement login page',
          description: 'Create a responsive login page with email and password fields, validation, and error handling.',
          assignTo: ['Alice', 'Bob'],
        }}
      />
    </div>
  ),
};

export const ShortDescription = {
  render: () => (
    <div style={{ width: 300, padding: 16 }}>
      <Card
        columnId={2}
        content={{
          id: 2,
          title: 'Fix header bug',
          description: 'Header overlaps content on mobile.',
          assignTo: ['Charlie'],
        }}
      />
    </div>
  ),
};
