import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from './table';
import { Button } from './button';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleUsers = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    role: 'user',
    status: 'active',
  },
  {
    id: 3,
    name: '박민수',
    email: 'park@example.com',
    role: 'user',
    status: 'inactive',
  },
  {
    id: 4,
    name: '최정아',
    email: 'choi@example.com',
    role: 'moderator',
    status: 'active',
  },
];

const sampleProducts = [
  {
    id: 1,
    name: 'MacBook Pro',
    category: 'Electronics',
    price: 2490000,
    stock: 15,
  },
  {
    id: 2,
    name: 'iPhone 15',
    category: 'Electronics',
    price: 1290000,
    stock: 32,
  },
  { id: 3, name: 'AirPods Pro', category: 'Audio', price: 329000, stock: 48 },
  {
    id: 4,
    name: 'Magic Keyboard',
    category: 'Accessories',
    price: 199000,
    stock: 0,
  },
];

export const Basic: Story = {
  render: () => (
    <div className='w-full max-w-4xl'>
      <Table>
        <TableCaption>사용자 목록</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className='font-medium'>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div className='w-full max-w-5xl'>
      <Table>
        <TableCaption>사용자 관리</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead className='text-right'>액션</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className='font-medium'>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className='text-right'>
                <div className='flex justify-end gap-2'>
                  <Button variant='secondary' size='sm'>
                    편집
                  </Button>
                  <Button variant='danger' size='sm'>
                    삭제
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div className='w-full max-w-4xl'>
      <Table>
        <TableCaption>제품 재고 현황</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>제품명</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead className='text-right'>가격</TableHead>
            <TableHead className='text-right'>재고</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleProducts.map(product => (
            <TableRow key={product.id}>
              <TableCell className='font-medium'>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className='text-right'>
                {product.price.toLocaleString()}원
              </TableCell>
              <TableCell className='text-right'>
                <span
                  className={
                    product.stock === 0 ? 'font-medium text-red-600' : ''
                  }
                >
                  {product.stock === 0 ? '품절' : `${product.stock}개`}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className='font-medium'>
              총 제품 수
            </TableCell>
            <TableCell className='text-right font-medium'>
              {sampleProducts.length}개
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className='w-full max-w-4xl'>
      <Table>
        <TableCaption>빈 테이블 예시</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} className='py-8 text-center text-gray-500'>
              데이터가 없습니다.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
