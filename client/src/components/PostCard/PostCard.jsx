import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';
import styles from './PostCard.module.css';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import Interaction from '../Interaction/Interaction.jsx';
export default function Post({ userAvatar, country, imageUrl, _id, owner, confirmTask }) {
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
     <Interaction id={owner} item= "post" confirmTask={confirmTask}/>
    </article>
  );
}
