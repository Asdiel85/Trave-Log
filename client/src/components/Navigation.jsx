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
            <li className={styles.add}>
              <span>add</span>
            </li>
          </a>
          <a>
            <li>
              <span>home</span>
            </li>
          </a>
          <a>
            <li>
              <span>dashboard</span>
            </li>
          </a>
          <li>
            <a>
              <span className="material icons">account_circle</span>
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
