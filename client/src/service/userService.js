import {BASE_URL, LOGIN, REGISTER} from '../utils/constants'

export const register = async (userData) => {
    const response = await fetch(`${BASE_URL}${REGISTER}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
  return response.json();
}

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}${LOGIN}`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(email, password)
    })
   return response.json();
}