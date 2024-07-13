import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchUserDetails } from '../../store/actions/userSlice';
import styles from './Item.module.css';

interface ItemProps {
  user: any;
}

const Item: React.FC<ItemProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(fetchUserDetails(user.login));
  };

  return (
    <div className={styles.item} onClick={handleClick}>
      <img src={user.avatar_url} alt={user.login} className={styles.avatar} />
      <div className={styles.details}>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          {user.login}
        </a>
      </div>
    </div>
  );
};

export default Item;
