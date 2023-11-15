import { BASE_URL, LOGIN, POSTS, REGISTER, USERS } from '../utils/constants';
import getToken from '../utils/token';

export const register = async (userData) => {
  const response = await fetch(`${BASE_URL}${REGISTER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response;
};

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}${LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(email, password),
  });
  return response;
};

export const getOne = async (id) => {
  const response = await fetch(`${BASE_URL}${USERS}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });
  return response;
};

export const getUserPosts = async (id) => {
  const response = await fetch(`${BASE_URL}${USERS}/${id}/${POSTS}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
  });
  return response;
};
