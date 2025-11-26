import { useState } from 'react';
import { postService, type Post } from '@/services/postService';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const loadPosts = async () => {
    try {
      const result: Post[] = await postService.getAll();
      setPosts(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const createPost = async (post: Post) => {
    try {
      await postService.create({
        title: post.title,
        content: post.content || '',
        author: post.author,
        category: post.category,
        status: post.status || 'draft',
      });
      await loadPosts();
      setAlertMessage(`게시글이 생성되었습니다`);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const updatePost = async (id: number, post: Post) => {
    try {
      await postService.update(id, post);
      await loadPosts();
      setAlertMessage(`게시글이 수정되었습니다`);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await postService.delete(id);
      await loadPosts();
      setAlertMessage('삭제되었습니다');
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const handleStatusPost = async (
    id: number,
    action: 'publish' | 'archive' | 'restore'
  ) => {
    try {
      if (action === 'publish') {
        await postService.publish(id);
      } else if (action === 'archive') {
        await postService.archive(id);
      } else if (action === 'restore') {
        await postService.restore(id);
      }

      await loadPosts();
      const message =
        action === 'publish' ? '게시' : action === 'archive' ? '보관' : '복원';
      setAlertMessage(`${message}되었습니다`);
    } catch (error: any) {
      setErrorMessage(error.message || '작업에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  return {
    posts,
    alertMessage,
    errorMessage,
    showErrorAlert,
    loadPosts,
    createPost,
    updatePost,
    deletePost,
    handleStatusPost,
  };
};
