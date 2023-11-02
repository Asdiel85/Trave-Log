import styles from './Login.module.css';

export default function Login() {
  return (
    <div className={styles.login}>
      <h2>Travel Log</h2>
      <input type="email" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button className={styles.button}>Login</button>
    </div>
  );
}
