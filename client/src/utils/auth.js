export const  getToken =() => {
    return 'Bearer '  + localStorage.getItem('token')
}

export const getLoggedUser= () => {
   return JSON.parse(localStorage.getItem('user'))
}