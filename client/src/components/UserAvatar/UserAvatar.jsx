import styles from './UserAvatar.module.css'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/AuthContext.js'
import { useContext } from 'react'
export default function UserAvatar({userAvatar, id}) {
    return (
       <Link to={`/user/${id}/details`}>
        <img src={userAvatar} alt="User Avatar" className={styles.userAvatar} />
        </Link>
    )
}