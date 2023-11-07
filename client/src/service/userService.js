import {BASE_URL, LOGIN, REGISTER} from '../utils/constants'

export const register = async (userData) => {
    const response = await fetch(`${BASE_URL}${REGISTER}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    const result = await response.json();
    return result;
}