import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['secondary', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'Badge variant style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
    },
    pill: {
      control: 'boolean',
      description: 'Rounded pill style',
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'secondary',
    size: 'medium',
    pill: false,
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'large',
  },
};

export const Pill: Story = {
  args: {
    children: 'Pill Badge',
    pill: true,
    variant: 'primary',
  },
};

export const AllVariants = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge variant='secondary'>Secondary</Badge>
      <Badge variant='primary'>Primary</Badge>
      <Badge variant='success'>Success</Badge>
      <Badge variant='warning'>Warning</Badge>
      <Badge variant='danger'>Danger</Badge>
      <Badge variant='info'>Info</Badge>
    </div>
  ),
};

export const AllSizes = {
  render: () => (
    <div className='flex items-center gap-2'>
      <Badge size='small'>Small</Badge>
      <Badge size='medium'>Medium</Badge>
      <Badge size='large'>Large</Badge>
    </div>
  ),
};
