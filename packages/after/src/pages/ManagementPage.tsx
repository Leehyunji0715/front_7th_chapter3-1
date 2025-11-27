/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { UserTable, PostTable } from '../components/tables';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { StatsCard } from '@/components/card';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import { UserForm } from '@/components/form/user-form';
import { PostForm, type PostFormData } from '@/components/form/post-form';
import '../styles/components.css';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const { users, loadUsers, createUser, updateUser, deleteUser } = useUser();
  const {
    posts,
    loadPosts,
    createPost,
    updatePost,
    deletePost,
    handleStatusPost,
  } = usePosts();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (entityType === 'user') {
      loadUsers();
    } else {
      loadPosts();
    }
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const handleCreateUser = async (data: Omit<User, 'id' | 'createdAt'>) => {
    try {
      await createUser(data);
      setIsCreateModalOpen(false);
      setAlertMessage(`사용자가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleCreatePost = async (data: PostFormData) => {
    if (data.category === '') {
      alert('카테고리를 선택해주세요');
      throw new Error('카테고리를 선택해주세요');
    }
    try {
      await createPost({
        ...data,
        category: data.category,
        status: 'draft',
      });
      setIsCreateModalOpen(false);
      setAlertMessage(`게시글가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = async (data: Omit<User, 'id' | 'createdAt'>) => {
    if (!selectedItem) return;

    try {
      await updateUser(selectedItem.id, data as User);
      setIsEditModalOpen(false);
      setSelectedItem(null);
      setAlertMessage('사용자가 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleUpdatePost = async (data: PostFormData) => {
    if (!selectedItem) return;

    try {
      const postData = { ...data, status: (selectedItem as Post).status };
      await updatePost(selectedItem.id, postData as Post);
      setIsEditModalOpen(false);
      setSelectedItem(null);
      setAlertMessage('게시글이 수정되었습니다');
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      if (entityType === 'user') {
        await deleteUser(id);
      } else {
        await deletePost(id);
      }
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (
    id: number,
    action: 'publish' | 'archive' | 'restore'
  ) => {
    if (entityType !== 'post') return;

    try {
      await handleStatusPost(id, action);
      const message =
        action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '작업에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const getStats = () => {
    if (entityType === 'user') {
      return {
        total: users.length,
        stat1: {
          label: '활성',
          value: users.filter(u => u.status === 'active').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '비활성',
          value: users.filter(u => u.status === 'inactive').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '정지',
          value: users.filter(u => u.status === 'suspended').length,
          color: '#d32f2f',
        },
        stat4: {
          label: '관리자',
          value: users.filter(u => u.role === 'admin').length,
          color: '#1976d2',
        },
      };
    } else {
      return {
        total: posts.length,
        stat1: {
          label: '게시됨',
          value: posts.filter(p => p.status === 'published').length,
          color: '#2e7d32',
        },
        stat2: {
          label: '임시저장',
          value: posts.filter(p => p.status === 'draft').length,
          color: '#ed6c02',
        },
        stat3: {
          label: '보관됨',
          value: posts.filter(p => p.status === 'archived').length,
          color: 'rgba(0, 0, 0, 0.6)',
        },
        stat4: {
          label: '총 조회수',
          value: posts.reduce((sum, p) => sum + p.views, 0),
          color: '#1976d2',
        },
      };
    }
  };

  const stats = getStats();

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950'>
      <div className='mx-auto max-w-6xl p-5'>
        <div style={{ marginBottom: '20px' }}>
          <h1
            className='text-gray-900 dark:text-white'
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <Card className='border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
          <CardContent className='flex flex-col gap-4 p-6'>
            <div className='flex gap-2 border-b-1 pb-2'>
              <Button
                variant={entityType === 'post' ? 'primary' : 'secondary'}
                onClick={() => setEntityType('post')}
              >
                게시글
              </Button>
              <Button
                variant={entityType === 'user' ? 'primary' : 'secondary'}
                onClick={() => setEntityType('user')}
              >
                사용자
              </Button>
            </div>
            <div className='flex flex-col gap-3'>
              <div className='text-right'>
                <Button
                  variant='primary'
                  size='md'
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  새로 만들기
                </Button>
              </div>

              {showSuccessAlert && (
                <div style={{ marginBottom: '10px' }}>
                  <Alert
                    variant='success'
                    onClose={() => setShowSuccessAlert(false)}
                  >
                    <AlertTitle>성공</AlertTitle>
                    <AlertDescription>{alertMessage}</AlertDescription>
                  </Alert>
                </div>
              )}

              {showErrorAlert && (
                <div style={{ marginBottom: '10px' }}>
                  <Alert
                    variant='error'
                    onClose={() => setShowErrorAlert(false)}
                  >
                    <AlertTitle>오류</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                </div>
              )}
              <div className='mb-2 grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2'>
                <StatsCard variant='primary' label='전체' value={stats.total} />
                <StatsCard
                  variant='success'
                  label={stats.stat1.label}
                  value={stats.stat1.value}
                />
                <StatsCard
                  variant='warning'
                  label={stats.stat2.label}
                  value={stats.stat2.value}
                />
                <StatsCard
                  variant='error'
                  label={stats.stat3.label}
                  value={stats.stat3.value}
                />
                <StatsCard
                  variant='secondary'
                  label={stats.stat4.label}
                  value={stats.stat4.value}
                />
              </div>
              {entityType === 'user' ? (
                <UserTable
                  users={users}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <PostTable
                  posts={posts}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onStatusAction={handleStatusAction}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={isCreateModalOpen}
        onOpenChange={open => setIsCreateModalOpen(open)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}</DialogTitle>
          </DialogHeader>
          {entityType === 'user' ? (
            <UserForm onSubmit={handleCreateUser} />
          ) : (
            <PostForm onSubmit={handleCreatePost} />
          )}
          <DialogFooter>
            <Button
              variant='secondary'
              size='md'
              onClick={() => setIsCreateModalOpen(false)}
            >
              취소
            </Button>
            <Button
              variant='primary'
              type='submit'
              form={entityType === 'user' ? 'user-form' : 'post-form'}
            >
              생성
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditModalOpen}
        onOpenChange={open => {
          setIsEditModalOpen(open);
          if (!open) {
            setSelectedItem(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>{`${entityType === 'user' ? '사용자' : '게시글'} 수정`}</DialogHeader>
          {selectedItem && (
            <Alert variant='info' className='mb-3'>
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === 'post' &&
                ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === 'user' ? (
            <UserForm data={selectedItem as User} onSubmit={handleUpdateUser} />
          ) : (
            <PostForm data={selectedItem as Post} onSubmit={handleUpdatePost} />
          )}
          <DialogFooter>
            <Button
              variant='secondary'
              size='md'
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button
              variant='primary'
              size='md'
              type='submit'
              form={entityType === 'user' ? 'user-form' : 'post-form'}
            >
              수정 완료
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
