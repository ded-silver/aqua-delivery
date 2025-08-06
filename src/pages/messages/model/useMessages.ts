import axios from 'axios';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../../shared/api/axios';

interface Message {
  id: number;
  message: string;
  type: string;
  created_at: string;
  user_id: number;
}

interface ApiResponse {
  success: boolean;
  data: Message[] | null;
  message?: string;
  errorType?: string;
}

export const useMessages = (id: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get<ApiResponse>(`/chat/get-messages?id=${id}`);

        if (response.data.success && Array.isArray(response.data.data)) {
          setMessages(response.data.data);
        } else {
          setMessages([]);
          setError(response.data.message || 'Failed to load messages');
        }
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data?.detail || 'Failed to load messages');
        } else {
          setError('Unexpected error');
        }
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMessages();
    }
  }, [id]);

  return { messages, error, loading };
};
