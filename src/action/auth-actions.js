export const login = () => {
    return {
      type: 'LOGIN',
      payload: true,
    }
  }



  
  export const logout = () => {
    localStorage.removeItem('pollerProfile')
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('poller_token')
    localStorage.removeItem('reduxPersist:auth')
    //might need these later... need to research redux persist
    localStorage.removeItem('reduxPersist:userId')
    localStorage.removeItem('reduxPersist:profile')
    localStorage.removeItem('reduxPersist:userInfo')

    
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    return { type: 'LOGOUT' }
  }