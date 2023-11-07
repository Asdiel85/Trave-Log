import styles from './Post.module.css'
import heart from '../img/heart.svg'
export default function Post ({userImg, country, postImgUrl}) {
    return (
        <article className={styles.card}>
        <div className={styles.info}>
          <img src={userImg} alt="" className={styles.userImg} />
          <span>{country}</span>
        </div>
        <img src={postImgUrl} alt="" className={styles.postImg} />
       <div className={styles.interaction}>
        <img className={styles.cardIcon} src={heart} alt="" />
       </div>
        </article>
    )
}