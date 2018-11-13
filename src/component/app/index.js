import React from 'react'
import { connect, Provider } from 'react-redux'
// import Auth0Lock from 'auth0-lock'


import PrivateRoute from './privateroute.js'
import GettingStartedPage from '../getting-started/horizontal'
import Callback from '../callback'

import { Link, withRouter } from 'react-router-dom'
import {compose} from 'recompose'
import randomstring from "randomstring"
import auth0 from 'auth0-js';
import { createBrowserHistory } from 'history'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Route, BrowserRouter, Switch, Router } from 'react-router-dom'
import LandingContainer from '../landing-container'
import LoginPage from '../login'
import storeCreate from '../../lib/store-create'
import { persistStore } from 'redux-persist'





import {
  storeUserProfileFromLocalStorage,
  authTokenQuickCheck,
  profileQuickCheck,
  profileFetch,
} from '../../action/profile-actions.js'
import {setAuthToken} from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'




class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.props.loggedIn
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleCallBackAuthentication = this.handleCallBackAuthentication.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.setSession = this.setSession.bind(this)

    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.hasProfile = this.hasProfile.bind(this)
    this.accessGranted = this.accessGranted.bind(this)
    this.auth0 = new auth0.WebAuth({
      domain: __AUTH0_CLIENT_DOMAIN__,
      clientID: __AUTH0_CLIENT_ID__,
      });
  }

  handleAuthentication() {
    let result;
    return new Promise((resolve,reject)=>{
    this.auth0.parseHash({hash: window.location.hash}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        result = authResult
          this.setSession(authResult);
          return resolve();
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
        return reject(err)
      }
    })
  })
  .then(result=>{
      this.props.profileFetch()
      .then(success=>{
        console.log('SUCCESS')
        this.props.history.push('/explore')
      })
    })
    .catch(err=>console.log('EROR'))
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      this.props.setAuthToken(authResult.accessToken)
  }

  logout(){
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('poller_profile');
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.props.history.push('/login')
  }
  hasProfile(){
    if (!this.props.userProfile){
      let profileInStorage = localStorage.getItem('poller_profile');
      let profile = JSON.parse(profileInStorage);
    if (
      (typeof profile == 'object' && profile !==null) &&
      profile.hasOwnProperty('age') && 
      profile.hasOwnProperty('profession') &&
      profile.hasOwnProperty('religion') && 
      profile.hasOwnProperty('politics') && 
      profile.hasOwnProperty('email') && 
      profile.hasOwnProperty('nickname') &&
      profile.hasOwnProperty('gender')){
        console.log('passed, we got a profile', profile)

        this.props.storeUserProfileFromLocalStorage(profile)
        return true
      } else {
        console.log('FAILING check profile function')
        return false
      }
    } else {
      return true
    }
  }

  isAuthenticated(){
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let accessToken = localStorage.getItem('access_token')
      if (new Date().getTime() < expiresAt && accessToken){
          if (!this.props.auth0Token){
            this.props.setAuthToken(accessToken)
          }
          return true;
      } else {
        return false;
      }
}

accessGranted(){
  if (this.isAuthenticated() && this.hasProfile()){
    return true
  } else {
    return false
  }
}




  login() {
    this.auth0.authorize({
      audience: __AUTH0_AUDIENCE__,
      redirectUri: __AUTH0_REDIRECT_URI__,
      responseType: 'token id_token',
      scope:  'openid profile userId user_metadata update:users_app_metadata email profile read:clients write:clients update:users_app_metadata update:users update:current_user_metadata',
    })
  }

  handleCallBackAuthentication({location}){
      if (/access_token|id_token|error/.test(location.hash)) {
        this.handleAuthentication()
      }
  }

  render() {
    let {classes} = this.props;
    return (
      <div className="app">
          <div>
                <Switch>
                <Route  path="/gettingstarted" render={()=><GettingStartedPage login={this.login}/>}/>
                <Route  path="/login" render={(props) =><LoginPage login={this.login} props={props}/>}/>
                <Route path="/callback" render={(props) => {
                  // this.handleCallBackAuthentication(props);
                  return <Callback {...props} handleCallBackAuthentication={this.handleCallBackAuthentication}/> 
                }}/>
                <PrivateRoute loggedIn={this.accessGranted()} path="/" redirectTo="/login" component={LandingContainer} />
                </Switch>
        
          </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userProfile: state.userProfile,
  auth0Token:state.auth0Token,
})

export const mapDispatchToProps = dispatch => ({
  storeUserProfileFromLocalStorage:(profile)=>dispatch(storeUserProfileFromLocalStorage(profile)),
  setAuthToken:(token) => dispatch(setAuthToken(token)),
  logout: () => dispatch(logout()),
  profileFetch: () => dispatch(profileFetch()),
})



export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App)