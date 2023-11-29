import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/AuthContext.jsx';
import styles from './PostCard.module.css';
import * as postService from '../../service/postService.js';
import heart from '../../img/heart.svg';
import heartFilled from '../../img/heartFilled.svg';
import UserAvatar from '../UserAvatar/UserAvatar.jsx';
import EditDeleteBtns from '../EditDeleteBtns/EditDeleteBtns.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import { handleResponse } from '../../utils/handleResponse.js';

export default function Post({
  userAvatar,
  country,
  imageUrl,
  _id,
  owner,
  confirmTask,
  likes,
  liked,
}) {
  const [loggedUser,] = useContext(UserContext);
  const [, setErrorMessage] = useContext(ErrorContext);
  const [likePost, setLikePost] = useState(liked);
  const [likesCount, setLikesCount] = useState(likes.length);

  const handleLikePostClick = async () => {
    try {
      const response = await postService.likePost(_id, loggedUser.id);
      await handleResponse(response);
      setLikePost(true);
      setLikesCount((prev) => prev + 1);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleUnlikeClick = async () => {
    try {
      const response = await postService.unLikePost(_id, loggedUser.id);
      await handleResponse(response);
      setLikePost(false);
      setLikesCount((prev) => prev - 1);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <article data-testid = 'postCard' className={styles.card}>
      <div className={styles.info}>
        <UserAvatar id={owner} userAvatar={userAvatar} />
        <span>{country}</span>
      </div>
      <Link to={`/post-details/${_id}`}>
        <img src={imageUrl} alt="Post image" className={styles.postImg} />
      </Link>
      {loggedUser && (
        <div data-testid = 'interaction' className={styles.interaction}>
          <div>
            <span>Likes {likesCount}</span>
            {loggedUser.id !== owner && (
              <>
                {likePost && (
                  <img data-testid = 'unLikePost'
                    onClick={handleUnlikeClick}
                    className={styles.cardIcon}
                    src={heartFilled}
                    alt="Filled Heart"
                  />
                )}{' '}
                {!likePost && (
                  <img data-testid = 'likePost'
                    onClick={handleLikePostClick}
                    className={styles.cardIcon}
                    src={heart}
                    alt="Heart"
                  />
                )}
              </>
            )}
          </div>
          {loggedUser.id === owner && (
            <EditDeleteBtns id={_id} item="post" confirmTask={confirmTask} />
          )}
        </div>
      )}
    </article>
  );
}
