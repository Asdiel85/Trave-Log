export default function getToken() {
    return 'Bearer '  + localStorage.getItem('token')
}