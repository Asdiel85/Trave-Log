import { BASE_URL, EDIT, LOGIN, POSTS, REGISTER, USERS } from '../utils/constants';
import {getToken} from '../utils/auth';

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

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}${USERS}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    }
  })
  return response;
}

export const getOne = async (id) => {
  const response = await fetch(`${BASE_URL}${USERS}/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  });
  return response;
};

export const getUserPosts = async (id) => {
  const response = await fetch(`${BASE_URL}${USERS}/${id}/${POSTS}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
  });
  return response;
};

export const editUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}${USERS}/${id}/${EDIT}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
    body: JSON.stringify(userData),
  });
  return response;
};

export const deleteUser = async(id) => {
  const response = await fetch(`${BASE_URL}${USERS}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    }
  })
  return response;
}