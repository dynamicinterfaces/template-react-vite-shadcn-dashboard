import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta = { component: Tooltip };
export default meta;

export const Default = {
  render: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <button style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4 }}>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Tooltip content</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
