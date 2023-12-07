import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/AuthContext.jsx";
import { ErrorContext } from "../../contexts/ErrorContext.jsx";
import * as postService from "../../service/postService";
import styles from "./PostDetails.module.css";
import heart from "../../img/heart.svg";
import heartFilled from "../../img/heartFilled.svg";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import EditDeleteBtns from "../EditDeleteBtns/EditDeleteBtns.jsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.jsx";
import { handleResponse } from "../../utils/handleResponse.js";
import {
  INITIAL_STATE,
  postDetailsReducer,
} from "../../reducers/postDetailsReducer.js";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loggedUser] = useContext(UserContext);
  const [, setErrorMessage] = useContext(ErrorContext);
  const [state, dispatch] = useReducer(postDetailsReducer, INITIAL_STATE);

  const handleLikePostClick = async () => {
    try {
      const response = await postService.likePost(
        state.post._id,
        loggedUser.id
      );
      await handleResponse(response);
      dispatch({
        type: "LIKE_POST",
        payload: state.post.likes,
        userId: loggedUser.id,
      });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/error");
    }
  };

  const handleUnlikeClick = async () => {
    try {
      const response = await postService.unLikePost(
        state.post._id,
        loggedUser.id
      );
      await handleResponse(response);
      dispatch({
        type: "UNLIKE_POST",
        payload: state.post.likes,
        userId: loggedUser.id,
      });
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/error");
    }
  };

  const deletePost = async (id) => {
    try {
      await postService.deletePost(id);
      dispatch({type : "DELETE_POST"})
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      navigate("/error");
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_START" });
    postService
      .getPostDetails(id)
      .then((response) => handleResponse(response))
      .then((post) => {
        if(post === null) {
          navigate('*')
        } else {
          dispatch({
            type: "FETCH_SUCCES",
            payload: post,
            userId: loggedUser?.id,
          });
        }
      })
      .catch((error) => {
        dispatch({type: "FETCH_FAILED"})
        setErrorMessage(error.message);
        navigate("/error");
      });
  }, [id]);

  return (
    <>
      {state.loading ? (
        <LoadingSpinner />
      ) : (
        <Card data-testid="card" style={{ width: "60%", margin: "30px auto" }}>
          <Card.Img variant="top" src={state.post.imageUrl} />
          <Card.Body>
            <Card.Title>
              <span>
                <UserAvatar id={state.post.owner} userAvatar={state.post.userAvatar} />
              </span>{" "}
              Country: {state.post.country}
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>City: {state.post.city}</ListGroup.Item>
            <ListGroup.Item>Cost: {state.post.cost} Euro</ListGroup.Item>
            <ListGroup.Item> {state.post.description}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            {loggedUser && (
              <div>
                <div>
                  <span>Likes {state.likesCount}</span>
                  {loggedUser.id !== state.post.owner && (
                    <>
                      {state.likePost && (
                        <img
                          onClick={handleUnlikeClick}
                          className={styles.cardIcon}
                          src={heartFilled}
                          alt="Filled Heart"
                        />
                      )}{" "}
                      {!state.likePost && (
                        <img
                          onClick={handleLikePostClick}
                          className={styles.cardIcon}
                          src={heart}
                          alt="Heart"
                        />
                      )}
                    </>
                  )}
                </div>
                {loggedUser.id === state.post.owner && (
                  <EditDeleteBtns
                    id={state.post._id}
                    item="post"
                    confirmTask={() => deletePost(state.post._id)}
                  />
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}
