
// import React from 'react'
// import auth from './auth.js';
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types';
// import { Link, withRouter } from 'react-router-dom'
// import {compose} from 'recompose'
// import { withStyles } from '@material-ui/core/styles';


// import Button from '@material-ui/core/Button';


// const styles = theme => ({
//   // container: theme.overrides.MuiButton.container,
//   button: theme.overrides.MuiButton,
// })


// class AuthJsButton extends React.Component {
//     constructor(props) {
//         super(props)
//         this.login = this.login.bind(this);
//         this.logout = this.logout.bind(this);
//         this.handleAuthentication = this.handleAuthentication.bind(this);
//         this.isAuthenticated = this.isAuthenticated.bind(this);
//       }
    
//       componentWillMount(){
//         this.auth0 = new auth0.WebAuth({
//           domain: __AUTH0_CLIENT_DOMAIN__,
//           clientID: __AUTH0_CLIENT_ID__,
//           // audience: ,
//           redirectUri:__AUTH0_REDIRECT_URI__,
//           responseType: 'token id_token',
//           scope:  'openid profile userId user_metadata update:users_app_metadata openid email profile read:clients write:clients update:users_app_metadata update:users update:current_user_metadata'
//         });
//       }
    
//       handleAuthentication() {
//         this.auth0.parseHash((err, authResult) => {
//           if (authResult && authResult.accessToken && authResult.idToken) {
//             this.setSession(authResult);
//             this.props.setAuthToken(authResult.accessToken)
//             this.props.profileFetch()
//             .then(profile=>{
//                 if (this.props.loggedIn && this.props.userProfile){
//                   this.props.history.push('/explore')
//                 }
//             }).catch(err=>console.log('error!', err))
    
//           } else if (err) {
//             history.replace('/home');
//             console.log(err);
//           }
//         });
//       }
    
//       setSession(authResult) {
//         // Set the time that the Access Token will expire at
//         let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
//         localStorage.setItem('access_token', authResult.accessToken);
//         localStorage.setItem('id_token', authResult.idToken);
//         localStorage.setItem('expires_at', expiresAt);
//         // navigate to the home route
//                   // this.props.history.push('/explore')
//       }
    
//       logout(){
//         // Clear Access Token and ID Token from local storage
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('id_token');
//         localStorage.removeItem('expires_at');
//         // navigate to the home route
//         this.props.history.push('/login')
//       }
    
//       isAuthenticated() {
//         // Check whether the current time is past the 
//         // Access Token's expiry time
//         let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//         return new Date().getTime() < expiresAt;
//       }
    
    
//       login() {
//         this.auth0.authorize();
//       }

//   render() {
//       let {classes} = this.props
//     return (
//       <div>
//         <Button 
//         variant="outlined"
//         onClick={this.props.loggedIn ? this.logout : this.login} 
//         className={classes.button}>
//         {this.props.loggedIn ? 'LOGOUT' : 'SIGNUP / LOGIN'}
//         </Button>
//       </div>
//     )
//   }
// }
// export const mapStateToProps = state => ({
//     loggedIn: state.loggedIn,
//     userProfile: state.userProfile,
//   })
  
//   export const mapDispatchToProps = dispatch => ({
//     setAuthToken:(token) => dispatch(setAuthToken(token)),
//     logout: () => dispatch(logout()),
//     profileFetch: () => dispatch(profileFetch()),
//   })
  

//   AuthJsButton.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };


//   export default compose(
//     withRouter,
//     connect(mapStateToProps, mapDispatchToProps),
//     withStyles(styles)
//   )(AuthJsButton)