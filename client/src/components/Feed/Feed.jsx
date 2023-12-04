import {useEffect, useContext, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../PostCard/PostCard';
import * as postService from '../../service/postService';
import { handleResponse } from '../../utils/handleResponse.js';
import { UserContext } from '../../contexts/AuthContext.jsx';
import { ErrorContext } from '../../contexts/ErrorContext.jsx';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import { INITIAL_STATE, feedReducer } from '../../reducers/feedReducer.js';

export default function Feed() {
  const [state, dispatch] = useReducer(feedReducer, INITIAL_STATE)
  const [loggedUser, setLoggedUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useContext(ErrorContext);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({type: "FETCH_START"})
    postService
      .getAllPosts()
      .then((responese) => handleResponse(responese))
      .then((posts) =>{
        dispatch({type: "FETCH_SUCCESS", payload: posts})
      })
      .catch((error) => {
        setErrorMessage(error.message);
        navigate('/error')
      });
  }, []);

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      dispatch({type: "DELETE_POST", payload: state.posts.filter((post) => post._id !== id)})

    } catch (error) {
      setErrorMessage(error.message);
      navigate('/error')
    }
  };

  return (
    <>
      {state.loading ? (
        <LoadingSpinner />
      ) : state.posts.length > 0 ? (
        state.posts.map((post) => (
          <PostCard
            key={post._id}
            {...post}
            liked={post.likes.includes(loggedUser?.id)}
            confirmTask={() => deletePost(post._id)}
          />
        ))
      ) : (
        <h1 style={{ textAlign: 'center', marginTop: '30px' }}>
          There are no posts yet
        </h1>
      )}
    </>
  );
}
