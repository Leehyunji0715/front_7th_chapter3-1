import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../contexts/ThemeProvider';
import { ThemeToggle } from './theme-toggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <div className='rounded-lg border bg-white p-4 transition-colors dark:bg-gray-800'>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const InHeader: Story = {
  render: () => (
    <div className='flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900'>
      <span className='text-sm text-gray-600 dark:text-gray-300'>
        Header에서의 사용 예시:
      </span>
      <ThemeToggle />
    </div>
  ),
};

export const MultipleToggles: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>Primary:</span>
        <ThemeToggle />
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-sm'>Secondary:</span>
        <ThemeToggle />
      </div>
      <p className='mt-4 text-xs text-gray-500'>
        🎨 모든 토글이 동기화됩니다 (localStorage 공유)
      </p>
    </div>
  ),
};
