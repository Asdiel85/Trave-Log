import notFount from '../../img/notFound.png'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
    return (
        <>
        <div>
            <img className={styles.errorImage} src={notFount} alt="Error image" />
        </div>
        </>
    )
}