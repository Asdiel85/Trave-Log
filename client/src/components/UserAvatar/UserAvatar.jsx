import styles from './UserAvatar.module.css'
import { Link } from 'react-router-dom'

export default function UserAvatar({userAvatar, id}) {
    return (
       <Link to={`/user/${id}/details`}>
        <img src={userAvatar} alt="User Avatar" className={styles.userAvatar} />
        </Link>
    )
}