import Column from './column.component';

const meta = { component: Column };
export default meta;

export const Default = {
  args: {
    title: 'To Do',
    length: 3,
    children: (
      <div style={{ padding: 8 }}>
        <div style={{ padding: 8, marginBottom: 4, background: '#f5f5f5', borderRadius: 4 }}>Task 1</div>
        <div style={{ padding: 8, marginBottom: 4, background: '#f5f5f5', borderRadius: 4 }}>Task 2</div>
        <div style={{ padding: 8, background: '#f5f5f5', borderRadius: 4 }}>Task 3</div>
      </div>
    ),
  },
};
