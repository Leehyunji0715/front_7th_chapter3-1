import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/services/postService';

interface PostTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onStatusAction: (id: number, action: 'publish' | 'archive' | 'restore') => void;
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'published':
      return 'success';
    case 'draft':
      return 'warning';
    case 'archived':
      return 'secondary';
    case 'pending':
      return 'info';
    case 'rejected':
      return 'danger';
    default:
      return 'primary';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'published':
      return '게시됨';
    case 'draft':
      return '임시저장';
    case 'archived':
      return '보관됨';
    case 'pending':
      return '대기중';
    case 'rejected':
      return '거부됨';
    default:
      return '';
  }
};

const columns = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: '제목' },
  { key: 'author', header: '작성자', width: '120px' },
  { key: 'category', header: '카테고리', width: '140px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'views', header: '조회수', width: '100px' },
  { key: 'createdAt', header: '작성일', width: '120px' },
  { key: 'actions', header: '관리', width: '250px' },
];

export const PostTable: React.FC<PostTableProps> = ({
  posts,
  onEdit,
  onDelete,
  onStatusAction,
}) => {
  return (
    <Table className='table-container table overflow-auto border border-gray-300'>
      <TableHeader>
        <TableRow>
          {columns.map(col => (
            <TableHead
              key={col.key}
              style={{ width: col.width || 'auto' }}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map(post => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>{post.author}</TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(post.status)}>
                {getStatusText(post.status)}
              </Badge>
            </TableCell>
            <TableCell>{post.views}</TableCell>
            <TableCell>{post.createdAt}</TableCell>
            <TableCell>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  size='sm'
                  variant='primary'
                  onClick={() => onEdit(post)}
                >
                  수정
                </Button>
                {post.status === 'draft' && (
                  <Button
                    size='sm'
                    variant='success'
                    onClick={() => onStatusAction(post.id, 'publish')}
                  >
                    게시
                  </Button>
                )}
                {post.status === 'published' && (
                  <Button
                    size='sm'
                    variant='secondary'
                    onClick={() => onStatusAction(post.id, 'archive')}
                  >
                    보관
                  </Button>
                )}
                {post.status === 'archived' && (
                  <Button
                    size='sm'
                    variant='primary'
                    onClick={() => onStatusAction(post.id, 'restore')}
                  >
                    복원
                  </Button>
                )}
                <Button
                  size='sm'
                  variant='danger'
                  onClick={() => onDelete(post.id)}
                >
                  삭제
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};