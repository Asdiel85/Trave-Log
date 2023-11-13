import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/AuthContext.js'
import styles from './PostCard.module.css'
import heart from '../../img/heart.svg'
import UserAvatar from '../UserAvatar/UserAvatar.jsx'
export default function Post ({userAvatar, country, imageUrl, _id}) {
  const [loggedUser, setLoggedUser] = useContext(UserContext)
    return (
        <article className={styles.card}>
        <div className={styles.info}>
          <UserAvatar userAvatar={userAvatar} />
          <span>{country}</span>
        </div>
        <Link to={`/post-details/${_id}`}>
        <img src={imageUrl} alt="Post image" className={styles.postImg} />
        </Link>
        {loggedUser ? <><div className={styles.interaction}>
       <span>0</span> <img className={styles.cardIcon} src={heart} alt="Heart" />
       </div></> : null}
        </article>
    )
}