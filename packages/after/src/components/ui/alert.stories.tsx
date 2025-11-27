import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Alert variant style',
    },
    onClose: {
      action: 'closed',
      description: 'Close handler function',
    },
    children: {
      control: 'text',
      description: 'Alert content',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a default alert message.',
    variant: 'default',
  },
};

export const Info: Story = {
  args: {
    children: 'This is an informational alert message.',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    children: 'Operation completed successfully!',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Please be careful with this action.',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'An error occurred while processing your request.',
    variant: 'error',
  },
};

export const WithCloseButton: Story = {
  args: {
    children: 'This alert can be dismissed.',
    variant: 'info',
    onClose: () => console.log('Alert closed'),
  },
};

export const LongMessage: Story = {
  args: {
    children:
      'This is a longer alert message that might wrap to multiple lines to demonstrate how the alert component handles longer content. It should maintain proper spacing and readability.',
    variant: 'warning',
  },
};

export const AllVariants = {
  render: () => (
    <div className='space-y-4'>
      <Alert variant='default'>Default alert message</Alert>
      <Alert variant='info'>Information alert message</Alert>
      <Alert variant='success'>Success alert message</Alert>
      <Alert variant='warning'>Warning alert message</Alert>
      <Alert variant='error'>Error alert message</Alert>
    </div>
  ),
};

export const NotificationSystem = {
  render: () => (
    <div className='max-w-md space-y-3'>
      <Alert variant='success'>
        <strong>Account Created!</strong> Welcome to our platform.
      </Alert>
      <Alert variant='info'>
        <strong>Update Available:</strong> A new version is ready to install.
      </Alert>
      <Alert variant='warning'>
        <strong>Storage Almost Full:</strong> You have used 90% of your storage.
      </Alert>
      <Alert variant='error'>
        <strong>Connection Failed:</strong> Unable to connect to server.
      </Alert>
    </div>
  ),
};
