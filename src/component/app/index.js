import React from 'react'
import { connect } from 'react-redux'
// import Auth0Lock from 'auth0-lock'
import { Link, withRouter } from 'react-router-dom'
import {compose} from 'recompose'


import randomstring from "randomstring"
import auth0 from 'auth0-js';

import { createBrowserHistory } from 'history'


import { Route, BrowserRouter, Switch, Router } from 'react-router-dom'
import LandingContainer from '../landing-container'

import LoginPage from '../login'

import {
  localStorageProfileFetch,
} from '../../action/profile-actions.js'

import {storageLogin} from '../../action/storage-login-attempt'

import PrivateRoute from './privateroute.js'

import GettingStartedPage from '../getting-started/horizontal'

import Callback from '../callback'

// import Auth from '../auth0-js/auth'


// const auth = new Auth();


import {
  profileFetch,
} from '../../action/profile-actions.js'
import {
    storageLoginAttempt,
} from '../../action/storage-login-attempt.js'
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
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.setSession = this.setSession.bind(this)
    this.auth0 = new auth0.WebAuth({
      domain: __AUTH0_CLIENT_DOMAIN__,
      clientID: __AUTH0_CLIENT_ID__,
      });
  }

  handleAuthentication() {
    let result;
    return new Promise((resolve,reject)=>{
    this.auth0.parseHash({ hash: window.location.hash }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('ATUHR RESULTS', authResult)
        this.setSession(authResult);
        result = authResult
        this.props.profileFetch()
        this.props.history.push('/explore')
        return resolve()
        
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
        return reject(err)
      }
    })
  })    
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    console.log('auth result!!!!!', authResult);
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    
      this.props.setAuthToken(authResult.accessToken)
  }

  logout(){
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.props.history.push('/login')
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let accessToken = localStorage.getItem('access_token')
    if (new Date().getTime() < expiresAt && accessToken){
      this.props.setAuthToken(accessToken);
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
    return (
      <div className="app">
          <div>
              <Switch>
              <Route  path="/gettingstarted" render={()=><GettingStartedPage login={this.login}/>}/>
              <Route  path="/login" render={() =><LoginPage login={this.login} />}/>
              <Route path="/callback" render={(props) => {
                this.handleCallBackAuthentication(props);
                return <Callback {...props} /> 
              }}/>
              <PrivateRoute loggedIn={this.isAuthenticated()} path="/" redirectTo="/login" component={LandingContainer} />
              </Switch>
          </div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  storageLoginAttempt: state.storageLoginAttempt,
  userProfile: state.userProfile,
})

export const mapDispatchToProps = dispatch => ({
  localStorageProfileFetch: ()=>dispatch(localStorageProfileFetch()),
  storageLogin:()=>dispatch(storageLogin()),
  setAuthToken:(token) => dispatch(setAuthToken(token)),
  logout: () => dispatch(logout()),
  profileFetch: () => dispatch(profileFetch()),
})



export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App)