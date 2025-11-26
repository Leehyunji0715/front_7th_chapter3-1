import { useState } from 'react';
import { userService, type User } from '../services/userService';

export const useUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const loadUsers = async () => {
    try {
      const result: User[] = await userService.getAll();
      setUsers(result);
    } catch (error: any) {
      setErrorMessage('데이터를 불러오는데 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const createUser = async (user: User) => {
    try {
      await userService.create({
        username: user.username,
        email: user.email,
        role: user.role || 'user',
        status: user.status || 'active',
      });
      await loadUsers();
      setAlertMessage(`사용자가 생성되었습니다`);
    } catch (error: any) {
      setErrorMessage(error.message || '생성에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const updateUser = async (id: number, user: User) => {
    try {
      await userService.update(id, user);
      await loadUsers();
      setAlertMessage(`사용자가 수정되었습니다`);
    } catch (error: any) {
      setErrorMessage(error.message || '수정에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await userService.delete(id);
      await loadUsers();
      setAlertMessage('삭제되었습니다');
    } catch (error: any) {
      setErrorMessage(error.message || '삭제에 실패했습니다');
      setShowErrorAlert(true);
    }
  };

  return {
    users,
    alertMessage,
    errorMessage,
    showErrorAlert,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};
