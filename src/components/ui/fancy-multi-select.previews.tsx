import { FancyMultiSelect } from './fancy-multi-select';

const meta = { component: FancyMultiSelect };
export default meta;

export const Default = {
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ],
    selected: [{ value: 'react', label: 'React' }],
    placeholder: 'Select frameworks...',
  },
};
