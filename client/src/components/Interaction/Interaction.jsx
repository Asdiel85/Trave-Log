import { useContext } from 'react';
import { UserContext } from '../../contexts/AuthContext.js';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';
import heart from '../../img/heart.svg';
import styles from './Interaction.module.css'

export default function Interaction({id, item, confirmTask}) {
    const [loggedUser, setLoggedUser] = useContext(UserContext)
    return (
        <>
        {loggedUser ? (
            <div className={styles.interaction}>
              <div>
              <span>0</span>
              {loggedUser.id !== id ? (
                <>
                  <img className={styles.cardIcon} src={heart} alt="Heart" />
                </>
              ) : null}
              </div>
              {loggedUser.id === id ? <EditDeleteBtns item={item} confirmTask={confirmTask} /> : null}
            </div>
          ) : null}
          </>
    )
}