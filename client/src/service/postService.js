import {BASE_URL} from '../utils/constants'

export const getAllPosts = async () => {
    const posts = await fetch(BASE_URL);
    const result = await posts.json();
    return result;
}