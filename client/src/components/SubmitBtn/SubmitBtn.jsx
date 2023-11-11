import styles from './SubmitBtn.module.css'
export default function SubmitBtn({name}) {
    return (
        <button type="submit" className={styles.button}>
        {name}
      </button>
    )
}