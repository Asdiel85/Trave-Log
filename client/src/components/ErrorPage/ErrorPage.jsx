import styles from './ErrorPage.module.css'
import errorImage from '../../img/errorImage.webp'

export default function ErrorPage() {
    return (
        <div>
            <img className={styles.errorImage} src={errorImage} alt="Error image" />
        </div>

    )
}