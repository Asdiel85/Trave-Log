import {BASE_URL, CREATE_POST, POSTS, LIKES} from '../utils/constants'
import {getToken} from '../utils/auth';

export const getAllPosts = async () => {
    const posts = await fetch(BASE_URL);
    const result = await posts.json();
    return result;
}

export const getPostDetails = async (id) => {
    const response = await fetch(`${BASE_URL}${POSTS}/${id}`)
   return response;
}

export const createPost  = async (postData) => {
    const response = await fetch(`${BASE_URL}${CREATE_POST}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify(postData)
    })
    return response;
}

export const likePost = async (postId, userId) => {
    const response = await fetch(`${BASE_URL}${POSTS}/${postId}/${LIKES}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify({userId})
    })
    return response;
}

export const unLikePost = async (postId, userId) => {
    const response = await fetch(`${BASE_URL}${POSTS}/${postId}/${LIKES}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': getToken()
        },
        body: JSON.stringify({userId})
    })
    return response;
}

export const deletePost = async (postId) => {
    await fetch(`${BASE_URL}${POSTS}/${postId}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': getToken()
        },
    })
}