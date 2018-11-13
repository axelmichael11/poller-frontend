const superagent = require('superagent');

import {setAuthToken,setAuth0Profile } from './auth0-actions.js'

import {login} from './auth-actions.js'

import {loadingOn, loadingOff} from './loading-actions'

const storeUserProfileFromFetch = (userProfile) => {
  console.log('PROFILE TO STORE from fetch', userProfile)
  localStorage.setItem('poller_profile', JSON.stringify(userProfile))
    return { type: 'user_profile', payload: userProfile }
}

export const storeUserProfileFromLocalStorage = (userProfile) => {
  console.log('PROFILE TO STORE from local storage', userProfile)
    return { type: 'user_profile', payload: userProfile }
}

export const profileFetch = () => (dispatch, getState) => {
  let { auth0Token } = getState()
  console.log('FIRING PROFILE FETCH')
  return superagent
    .get(`${__API_URL__}/api/user`)
    .set('Authorization', `Bearer ${auth0Token}`)
    .then(res => {
      let parsed = JSON.parse(res.text)
      localStorage.setItem('poller_token', auth0Token)
      console.log('USER PROFILE', parsed)
      dispatch(storeUserProfileFromFetch(parsed))
      dispatch(login())
      return parsed
    })
    .catch(err => {
      console.log('error fetching profile',err)
    })
}


export const profileUpdate = (profile) => (dispatch, getState) => {
  let { auth0Token } = getState();
  return superagent
      .put(`${__API_URL__}/api/user`)
      .set('Authorization', `Bearer ${auth0Token}`)
      .send(profile)
      .then(res => {
        let parsed = JSON.parse(res.text)
        dispatch(storeUserProfile(parsed))
        parsed.status=res.status
        return parsed
      })
}