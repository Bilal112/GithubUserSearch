import React from 'react';
import { useSelector } from 'react-redux';
import Item from '../Item/Item';
import styles from './List.module.css';

const List =() => {
  const users = useSelector((state: any) => state.user.users);
  const loading = useSelector((state: any) => state.user.loading);
  const error = useSelector((state: any) => state.user.error);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.lists}>
      {users.map((user: any) => (
        <Item key={user.id} user={user} />
      ))}
    </div>
  );
};

export default List;
