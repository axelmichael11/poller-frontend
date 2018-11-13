export const setAuthToken = (token) => {
    console.log('setting token!', token)
    return {type: 'AUTH0TOKEN', payload: token}
}



