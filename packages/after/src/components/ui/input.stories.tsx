import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    value: {
      control: 'text',
      description: 'Input value',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    type: 'text',
  },
};

export const Text: Story = {
  args: {
    placeholder: 'Enter your name',
    type: 'text',
  },
};

export const Email: Story = {
  args: {
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter password',
    type: 'password',
  },
};

export const Number: Story = {
  args: {
    placeholder: 'Enter number',
    type: 'number',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
    placeholder: "This won't show",
  },
};

export const FormExample = {
  render: () => (
    <div className='w-80 space-y-4'>
      <div>
        <label className='mb-1 block text-sm font-medium'>Name</label>
        <Input placeholder='Enter your name' />
      </div>
      <div>
        <label className='mb-1 block text-sm font-medium'>Email</label>
        <Input type='email' placeholder='Enter your email' />
      </div>
      <div>
        <label className='mb-1 block text-sm font-medium'>Password</label>
        <Input type='password' placeholder='Enter password' />
      </div>
      <div>
        <label className='mb-1 block text-sm font-medium'>Phone</label>
        <Input type='tel' placeholder='Enter phone number' />
      </div>
    </div>
  ),
};
