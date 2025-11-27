import React, { useState, useEffect } from 'react';
import { Modal } from '../components/organisms';
import { UserTable, PostTable } from '../components/tables';
import { FormInput, FormSelect, FormTextarea } from '../components/molecules';
import type { User } from '../services/userService';
import type { Post } from '../services/postService';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { StatsCard } from '@/components/card';
import { useUser } from '@/hooks/useUser';
import { usePosts } from '@/hooks/usePosts';
import '../styles/components.css';

type EntityType = 'user' | 'post';
type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const [entityType, setEntityType] = useState<EntityType>('post');
  const {
    users,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    // alertMessage: userAlertMessage,
    // errorMessage: userErrorMessage,
    // showErrorAlert: showUserErrorAlert,
  } = useUser();
  const {
    posts,
    // alertMessage: postAlertMessage,
    // errorMessage: postErrorMessage,
    // showErrorAlert: showPostErrorAlert,
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

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (entityType === 'user') {
      loadUsers();
    } else {
      loadPosts();
    }
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [entityType]);

  const handleCreate = async () => {
    try {
      if (entityType === 'user') {
        await createUser(formData as User);
      } else {
        await createPost(formData as Post);
      }
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(
        `${entityType === 'user' ? '사용자' : '게시글'}가 생성되었습니다`
      );
      setShowSuccessAlert(true);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === 'user') {
      const user = item as User;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === 'user') {
        await updateUser(selectedItem.id, formData as User);
      } else {
        await updatePost(selectedItem.id, formData as Post);
      }

      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(
        `${entityType === 'user' ? '사용자' : '게시글'}가 수정되었습니다`
      );
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
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#333',
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            사용자와 게시글을 관리하세요
          </p>
        </div>

        <div
          style={{
            background: 'white',
            border: '1px solid #ddd',
            padding: '10px',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              borderBottom: '2px solid #ccc',
              paddingBottom: '5px',
            }}
          >
            <button
              onClick={() => setEntityType('post')}
              style={{
                padding: '8px 16px',
                marginRight: '5px',
                fontSize: '14px',
                fontWeight: entityType === 'post' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'post' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              게시글
            </button>
            <button
              onClick={() => setEntityType('user')}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: entityType === 'user' ? 'bold' : 'normal',
                border: '1px solid #999',
                background: entityType === 'user' ? '#1976d2' : '#f5f5f5',
                color: entityType === 'user' ? 'white' : '#333',
                cursor: 'pointer',
                borderRadius: '3px',
              }}
            >
              사용자
            </button>
          </div>

          <div>
            <div style={{ marginBottom: '15px', textAlign: 'right' }}>
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
                <Alert variant='error' onClose={() => setShowErrorAlert(false)}>
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '10px',
                marginBottom: '15px',
              }}
            >
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
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormData({});
        }}
        title={`새 ${entityType === 'user' ? '사용자' : '게시글'} 만들기`}
        size='large'
        showFooter
        footerContent={
          <>
            <Button
              variant='secondary'
              size='md'
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}
            >
              취소
            </Button>
            <Button variant='primary' size='md' onClick={handleCreate}>
              생성
            </Button>
          </>
        }
      >
        <div>
          {entityType === 'user' ? (
            <>
              <FormInput
                name='username'
                value={formData.username || ''}
                onChange={value =>
                  setFormData({ ...formData, username: value })
                }
                label='사용자명'
                placeholder='사용자명을 입력하세요'
                required
                width='full'
                fieldType='username'
              />
              <FormInput
                name='email'
                value={formData.email || ''}
                onChange={value => setFormData({ ...formData, email: value })}
                label='이메일'
                placeholder='이메일을 입력하세요'
                type='email'
                required
                width='full'
                fieldType='email'
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormSelect
                  name='role'
                  value={formData.role || 'user'}
                  onChange={value => setFormData({ ...formData, role: value })}
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label='역할'
                  size='md'
                />
                <FormSelect
                  name='status'
                  value={formData.status || 'active'}
                  onChange={value =>
                    setFormData({ ...formData, status: value })
                  }
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label='상태'
                  size='md'
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name='title'
                value={formData.title || ''}
                onChange={value => setFormData({ ...formData, title: value })}
                label='제목'
                placeholder='게시글 제목을 입력하세요'
                required
                width='full'
                fieldType='postTitle'
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormInput
                  name='author'
                  value={formData.author || ''}
                  onChange={value =>
                    setFormData({ ...formData, author: value })
                  }
                  label='작성자'
                  placeholder='작성자명'
                  required
                  width='full'
                />
                <FormSelect
                  name='category'
                  value={formData.category || ''}
                  onChange={value =>
                    setFormData({ ...formData, category: value })
                  }
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label='카테고리'
                  placeholder='카테고리 선택'
                  size='md'
                />
              </div>
              <FormTextarea
                name='content'
                value={formData.content || ''}
                onChange={value => setFormData({ ...formData, content: value })}
                label='내용'
                placeholder='게시글 내용을 입력하세요'
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setFormData({});
          setSelectedItem(null);
        }}
        title={`${entityType === 'user' ? '사용자' : '게시글'} 수정`}
        size='large'
        showFooter
        footerContent={
          <>
            <Button
              variant='secondary'
              size='md'
              onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button variant='primary' size='md' onClick={handleUpdate}>
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedItem && (
            <Alert variant='info'>
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === 'post' &&
                ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === 'user' ? (
            <>
              <FormInput
                name='username'
                value={formData.username || ''}
                onChange={value =>
                  setFormData({ ...formData, username: value })
                }
                label='사용자명'
                placeholder='사용자명을 입력하세요'
                required
                width='full'
                fieldType='username'
              />
              <FormInput
                name='email'
                value={formData.email || ''}
                onChange={value => setFormData({ ...formData, email: value })}
                label='이메일'
                placeholder='이메일을 입력하세요'
                type='email'
                required
                width='full'
                fieldType='email'
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormSelect
                  name='role'
                  value={formData.role || 'user'}
                  onChange={value => setFormData({ ...formData, role: value })}
                  options={[
                    { value: 'user', label: '사용자' },
                    { value: 'moderator', label: '운영자' },
                    { value: 'admin', label: '관리자' },
                  ]}
                  label='역할'
                  size='md'
                />
                <FormSelect
                  name='status'
                  value={formData.status || 'active'}
                  onChange={value =>
                    setFormData({ ...formData, status: value })
                  }
                  options={[
                    { value: 'active', label: '활성' },
                    { value: 'inactive', label: '비활성' },
                    { value: 'suspended', label: '정지' },
                  ]}
                  label='상태'
                  size='md'
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name='title'
                value={formData.title || ''}
                onChange={value => setFormData({ ...formData, title: value })}
                label='제목'
                placeholder='게시글 제목을 입력하세요'
                required
                width='full'
                fieldType='postTitle'
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                }}
              >
                <FormInput
                  name='author'
                  value={formData.author || ''}
                  onChange={value =>
                    setFormData({ ...formData, author: value })
                  }
                  label='작성자'
                  placeholder='작성자명'
                  required
                  width='full'
                />
                <FormSelect
                  name='category'
                  value={formData.category || ''}
                  onChange={value =>
                    setFormData({ ...formData, category: value })
                  }
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'design', label: 'Design' },
                    { value: 'accessibility', label: 'Accessibility' },
                  ]}
                  label='카테고리'
                  placeholder='카테고리 선택'
                  size='md'
                />
              </div>
              <FormTextarea
                name='content'
                value={formData.content || ''}
                onChange={value => setFormData({ ...formData, content: value })}
                label='내용'
                placeholder='게시글 내용을 입력하세요'
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
