import styles from './UserAvatar.module.css'
export default function UserAvatar({userAvatar}) {
    return (
        <img src={userAvatar} alt="User Avatar" className={styles.userAvatar} />
    )
}