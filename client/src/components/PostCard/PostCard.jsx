import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';
import styles from './PostCard.module.css';
import heart from '../../img/heart.svg';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';
export default function Post({ userAvatar, country, imageUrl, _id, owner }) {
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <UserAvatar id={owner} userAvatar={userAvatar} />
        <span>{country}</span>
      </div>
      <Link to={`/post-details/${_id}`}>
        <img src={imageUrl} alt="Post image" className={styles.postImg} />
      </Link>
      {loggedUser ? (
        <div className={styles.interaction}>
          <div>
          <span>0</span>
          {loggedUser.id !== owner.toString() ? (
            <>
              <img className={styles.cardIcon} src={heart} alt="Heart" />
            </>
          ) : null}
          </div>
          {loggedUser.id === owner ? <EditDeleteBtns /> : null}
        </div>
      ) : null}
    </article>
  );
}
