import axios from 'axios';
import { useState } from 'react';
import { axiosInstance } from '../../../shared/api/axios';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (loginValue: string, passwordValue: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/auth/login/', {
        login: loginValue,
        password: passwordValue,
      });

      if (!response.data.success) {
        setError(response.data.message || 'Ошибка авторизации');
        return false;
      }

      const userData = response.data.data;

      if (!userData || !userData.auth_key) {
        setError('Ошибка: данные пользователя не получены');
        return false;
      }

      localStorage.setItem('auth_key', userData.auth_key);
      localStorage.setItem('userData', JSON.stringify(userData));

      return true;
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.message || 'Incorrect login or password');
      } else {
        setError('Unexpected error');
      }
      return false;
    }
  };

  return { login, loading, error };
};
