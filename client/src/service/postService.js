import {BASE_URL, CREATE_POST} from '../utils/constants'

export const getAllPosts = async () => {
    const posts = await fetch(BASE_URL);
    const result = await posts.json();
    return result;
}

export const createPost  = async (postData) => {
    const response = await fetch(`${BASE_URL}${CREATE_POST}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    const post = await response.json();
    return post;
}