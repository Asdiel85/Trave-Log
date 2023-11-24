import styles from './SubmitBtn.module.css'
export default function SubmitBtn({name, testId}) {
    return (
        <button data-testid ={testId} type="submit" className={styles.button}>
        {name}
      </button>
    )
}