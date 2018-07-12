// import React from 'react'
// import auth0 from 'auth0-js';

// import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
// import { Link, withRouter } from 'react-router-dom'
// import {compose} from 'recompose'
// import { withStyles } from '@material-ui/core/styles';


// import {
//   profileFetch,
// } from '../../action/profile-actions.js'
// import {
//     storageLoginAttempt,
// } from '../../action/storage-login-attempt.js'
// import {setAuthToken} from '../../action/auth0-actions.js'
// import { login, logout } from '../../action/auth-actions.js'


// export default class Auth {

//   constructor() {
//     this.login = this.login.bind(this);
//     this.logout = this.logout.bind(this);
//     this.handleAuthentication = this.handleAuthentication.bind(this);
//     this.isAuthenticated = this.isAuthenticated.bind(this);
//     this.auth0 = new auth0.WebAuth({
//       domain: __AUTH0_CLIENT_DOMAIN__,
//       clientID: __AUTH0_CLIENT_ID__,
//       // audience: ,
//       redirectUri:__AUTH0_REDIRECT_URI__,
//       responseType: 'token id_token',
//       scope:  'openid profile userId user_metadata update:users_app_metadata openid email profile read:clients write:clients update:users_app_metadata update:users update:current_user_metadata'
//     });
//   }

//   handleAuthentication() {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         console.log('ATUHR RESULTS')
//         this.setSession(authResult);
//         return authResult
//         // history.replace('/home');
//       } else if (err) {
//         // history.replace('/home');
//         console.log(err);
//         alert(`Error: ${err.error}. Check the console for further details.`);
//         return new Error(err)
//       }
//     })
//   }

//   setSession(authResult) {
//     // Set the time that the Access Token will expire at
//     let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//     localStorage.setItem('access_token', authResult.accessToken);
//     localStorage.setItem('id_token', authResult.idToken);
//     localStorage.setItem('expires_at', expiresAt);
//   }

//   logout(){
//     // Clear Access Token and ID Token from local storage
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('expires_at');
//     // navigate to the home route
//     this.props.history.push('/login')
//   }

//   isAuthenticated() {
//     // Check whether the current time is past the 
//     // Access Token's expiry time
//     let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//     return new Date().getTime() < expiresAt;
//   }


//   login() {
//     this.auth0.authorize()
//   }
// }

// export const mapStateToProps = state => ({
//   loggedIn: state.loggedIn,
//   userProfile: state.userProfile,
// })

// export const mapDispatchToProps = dispatch => ({
//   setAuthToken:(token) => dispatch(setAuthToken(token)),
//   logout: () => dispatch(logout()),
//   profileFetch: () => dispatch(profileFetch()),
// })


// Auth.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


// export default compose(
//   withRouter,
//   connect(mapStateToProps, mapDispatchToProps),
// )(Auth)