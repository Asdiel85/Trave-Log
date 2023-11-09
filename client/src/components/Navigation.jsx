import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.links}>
          <Link to={'/'}>
            <div className={styles.title}>Travel Log</div>
          </Link>
        <div className={styles.icons}>
          <Link to={'/'}>
            <li>
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to={'/create'}>
            <li>
              <span>Create Post</span>
            </li>
          </Link>
          <Link>
            <li>
              <span>Profile</span>
            </li>
          </Link>
          <Link to={'/login'}>
            <li>
              <span>Login</span>
            </li>
          </Link>
          <Link to={'/logout'}>
            <li>
              <span>Logout</span>
            </li>
          </Link>
          <Link to={'/register'}>
            <li>
              <span>Register</span>
            </li>
          </Link>
          <li>
            <Link>
              <span>account_circle</span>
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
