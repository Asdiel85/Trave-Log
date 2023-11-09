import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.links}>
          <a>
            <div className={styles.title}>Travel Log</div>
          </a>
        <div className={styles.icons}>
          <a>
            <li >
              <span>Dashboard</span>
            </li>
          </a>
          <a>
            <li>
              <span>Create Post</span>
            </li>
          </a>
          <a>
            <li>
              <span>Profile</span>
            </li>
          </a>
          <a>
            <li >
              <span>Login</span>
            </li>
          </a>
          <a>
            <li >
              <span>Logout</span>
            </li>
          </a>
          <a>
            <li >
              <span>Register</span>
            </li>
          </a>
          <li>
            <a>
              <span>account_circle</span>
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
