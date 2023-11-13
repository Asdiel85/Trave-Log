import { Link } from 'react-router-dom'
import styles from './PostCard.module.css'
import heart from '../../img/heart.svg'
import UserAvatar from '../UserAvatar/UserAvatar.jsx'
export default function Post ({userImg, country, imageUrl, _id}) {
    return (
        <article className={styles.card}>
        <div className={styles.info}>
          <UserAvatar userAvatar={"https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"} />
          <span>{country}</span>
        </div>
        <Link to={`/post-details/${_id}`}>
        <img src={imageUrl} alt="Post image" className={styles.postImg} />
        </Link>
       <div className={styles.interaction}>
        <img className={styles.cardIcon} src={heart} alt="Heart" />
       </div>
        </article>
    )
}