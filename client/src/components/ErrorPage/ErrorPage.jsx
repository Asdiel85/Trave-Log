import errorPage from '../../img/errorPage.png'
import styles from './ErrorPage.module.css'

export default function ErrorPage() {
    return (
        <>
        <div>
            <img className={styles.errorImage} src={errorPage} alt="Error image" />
        </div>
        </>
    )
}