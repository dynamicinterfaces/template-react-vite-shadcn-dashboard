import { FancyMultiSelect } from './fancy-multi-select';
import { useState } from 'react';

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

function Wrapper() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div style={{ width: 400 }}>
      <FancyMultiSelect
        values={frameworks}
        onChange={setSelected}
        placeholder="Select frameworks..."
        className=""
        defaultValues={['react']}
      />
      <div style={{ marginTop: 8, fontSize: 12, color: '#888' }}>
        Selected: {selected.join(', ') || 'none'}
      </div>
    </div>
  );
}

const meta = { component: Wrapper };
export default meta;
export const Default = {};
