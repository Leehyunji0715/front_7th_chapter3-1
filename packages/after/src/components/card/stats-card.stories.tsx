import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from './stats-card';

const meta = {
  title: 'Components/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'error', 'secondary', 'info'],
      description: 'StatsCard variant style',
    },
    label: {
      control: 'text',
      description: 'Card label text',
    },
    value: {
      control: 'text',
      description: 'Card value (string or number)',
    },
  },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Total Users',
    value: '1,234',
    variant: 'primary',
  },
};

export const Primary: Story = {
  args: {
    label: 'Revenue',
    value: '$12,345',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    label: 'Completed Tasks',
    value: '98%',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    label: 'Pending Reviews',
    value: '15',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    label: 'Failed Requests',
    value: '3',
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    label: 'Server Status',
    value: 'Online',
    variant: 'info',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Inactive Users',
    value: '456',
    variant: 'secondary',
  },
};

export const WithNumbers: Story = {
  args: {
    label: 'Active Sessions',
    value: 2847,
    variant: 'primary',
  },
};

export const LongText: Story = {
  args: {
    label: 'Average Response Time',
    value: '2.5 seconds',
    variant: 'info',
  },
};

export const Dashboard = {
  parameters: {
    docs: {
      description: {
        story: 'Dashboard layout with multiple StatsCard variants.',
      },
    },
  },
  render: () => (
    <div className='grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <StatsCard label='Total Users' value='12,345' variant='primary' />
      <StatsCard label='Revenue' value='$98,765' variant='success' />
      <StatsCard label='Pending Orders' value='23' variant='warning' />
      <StatsCard label='Failed Transactions' value='2' variant='error' />
      <StatsCard label='Server Uptime' value='99.9%' variant='info' />
      <StatsCard label='Inactive Accounts' value='1,234' variant='secondary' />
    </div>
  ),
};

export const AllVariants = {
  parameters: {
    docs: {
      description: {
        story: 'All available StatsCard variants in a grid layout.',
      },
    },
  },
  render: () => (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      <StatsCard label='Primary' value='123' variant='primary' />
      <StatsCard label='Success' value='456' variant='success' />
      <StatsCard label='Warning' value='789' variant='warning' />
      <StatsCard label='Error' value='12' variant='error' />
      <StatsCard label='Info' value='345' variant='info' />
      <StatsCard label='Secondary' value='678' variant='secondary' />
    </div>
  ),
};
