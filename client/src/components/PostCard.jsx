import { Link } from 'react-router-dom'
import styles from './PostCard.module.css'
import heart from '../img/heart.svg'
export default function Post ({userImg, country, imageUrl, _id}) {
    return (
        <article className={styles.card}>
        <div className={styles.info}>
          <img src={userImg} alt="" className={styles.userImg} />
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