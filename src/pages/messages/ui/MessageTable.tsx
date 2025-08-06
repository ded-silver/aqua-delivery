import { Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useMessages } from '../model/useMessages';
import styles from './MessageTable.module.css';

interface Message {
  id: number;
  created_at: string;
  type: string;
  message: string;
  user_id: number;
}

export const MessageTable = () => {
  const userDataString = localStorage.getItem('userData');
  let currentUserId: number | null = null;
  let currentUsername = 'Guest';

  try {
    if (userDataString) {
      const parsed = JSON.parse(userDataString);
      currentUserId = parsed.id ?? null;
      currentUsername = parsed.username ?? 'Guest';
    }
  } catch {
    currentUserId = null;
  }

  const { messages, loading, error } = useMessages(currentUserId ?? 0);

  const columns = [
    {
      title: 'DATE',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => (
        <span className={styles.boldColumn}>
          {dayjs(text).format('DD.MM.YYYY HH:mm')}
        </span>
      ),
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => (
        <span className={styles.typeColumn}>{text}</span>
      ),
    },
    {
      title: 'MESSAGE',
      dataIndex: 'message',
      key: 'message',
      render: (text: string) => (
        <span className={styles.boldColumn}>{text}</span>
      ),
    },
  ];

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUsername)}&background=6E6B7B&color=ffffff&size=128`;

  const [tableHeight, setTableHeight] = useState(600);

  useEffect(() => {
    const updateHeight = () => {
      const offsetTop = 250;
      const height = window.innerHeight - offsetTop;
      setTableHeight(height);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Messages</div>
        <div className={styles.userBlock}>
          <img src={avatarUrl} alt="avatar" className={styles.avatar} />
          <div className={styles.username}>Hi, {currentUsername}</div>
        </div>
      </div>

      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div className={styles.error}>Ошибка: {error}</div>
      ) : (
        <div className={styles.tableWrapper}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={messages}
            pagination={false}
            scroll={{ y: tableHeight }}
            rowClassName={(record: Message) => {
              const isUserMessage = record.user_id !== null && record.type === 'user';
              return isUserMessage ? styles.userRow : '';
            }}
          />
        </div>
      )}
    </div>
  );
};
