import styles from './Post.module.css'
export default function Post () {
    return (
        <article className={styles.card}>
        <div className={styles.info}>
          <img src='https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg' alt="" className={styles.userImg} />
          <span>Post Name</span>
        </div>
        <img src='https://media.npr.org/assets/img/2017/09/12/macaca_nigra_self-portrait-3e0070aa19a7fe36e802253048411a38f14a79f8-s1100-c50.jpg' alt="" className={styles.postImg} />
       <div className={styles.interaction}></div>
        </article>
    )
}