import {BASE_URL, CREATE_POST, POSTS} from '../utils/constants'
import getToken from '../utils/token';

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
    const token = getToken()
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

export const deletePost = async (postId) => {
    const token = getToken();
    await fetch(`${BASE_URL}${POSTS}/${postId}`,{
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': getToken()
        },
    })
}