import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'flat'],
      description: 'Card의 스타일 변형을 선택합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
  render: args => (
    <Card {...args} className='w-80'>
      <CardHeader>
        <CardTitle>기본 카드</CardTitle>
        <CardDescription>카드의 기본 형태입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 내용이 여기에 표시됩니다.</p>
      </CardContent>
    </Card>
  ),
};

export const WithAction: Story = {
  args: {
    variant: 'default',
  },
  render: args => (
    <Card {...args} className='w-80'>
      <CardHeader>
        <CardTitle>액션이 있는 카드</CardTitle>
        <CardDescription>헤더에 액션 버튼이 포함된 카드입니다.</CardDescription>
        <CardAction>
          <Button variant='secondary' size='sm'>
            더보기
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>카드 내용이 여기에 표시됩니다.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  args: {
    variant: 'default',
  },
  render: args => (
    <Card {...args} className='w-80'>
      <CardHeader>
        <CardTitle>푸터가 있는 카드</CardTitle>
        <CardDescription>푸터 영역이 포함된 카드입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          카드 내용이 여기에 표시됩니다. 푸터에는 주로 액션 버튼들이 배치됩니다.
        </p>
      </CardContent>
      <CardFooter className='gap-2'>
        <Button variant='primary' size='sm'>
          확인
        </Button>
        <Button variant='secondary' size='sm'>
          취소
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className='grid w-full max-w-4xl grid-cols-2 gap-4'>
      <Card variant='default' className='w-full'>
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>기본 그림자가 있는 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>기본 스타일의 카드입니다.</p>
        </CardContent>
      </Card>

      <Card variant='bordered' className='w-full'>
        <CardHeader>
          <CardTitle>Bordered</CardTitle>
          <CardDescription>테두리만 있는 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>그림자 없이 테두리만 있는 카드입니다.</p>
        </CardContent>
      </Card>

      <Card variant='elevated' className='w-full'>
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>강조된 그림자가 있는 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>더 강한 그림자 효과가 있는 카드입니다.</p>
        </CardContent>
      </Card>

      <Card variant='flat' className='w-full'>
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>플랫한 배경의 카드</CardDescription>
        </CardHeader>
        <CardContent>
          <p>플랫한 배경색을 가진 카드입니다.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Complex: Story = {
  render: () => (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>사용자 프로필</CardTitle>
        <CardDescription>사용자의 상세 정보를 확인하세요</CardDescription>
        <CardAction>
          <Button variant='secondary' size='sm'>
            편집
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-200'>
            <span className='text-lg font-medium'>김</span>
          </div>
          <div>
            <p className='font-medium'>김철수</p>
            <p className='text-sm text-gray-500'>Frontend Developer</p>
          </div>
        </div>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-sm font-medium'>이메일</span>
            <span className='text-sm text-gray-500'>kim@example.com</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm font-medium'>전화번호</span>
            <span className='text-sm text-gray-500'>010-1234-5678</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className='gap-2'>
        <Button variant='primary' size='sm' className='flex-1'>
          메시지 보내기
        </Button>
        <Button variant='secondary' size='sm'>
          더보기
        </Button>
      </CardFooter>
    </Card>
  ),
};
