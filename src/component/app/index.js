import React from 'react'
import { connect } from 'react-redux'
import Auth0Lock from 'auth0-lock'
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



class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.props.loggedIn
    }
    this.checkAuthorization = this.checkAuthorization.bind(this)
  }

  componentWillMount(){
    // this.checkAuthorization();
  }




  checkAuthorization(){
    if (localStorage.poller_token && !this.props.loggedIn && !this.props.storageLoginAttempt){
      this.props.localStorageProfileFetch().then(()=>this.props.storageLogin())
    }
  }

  render() {
    const history = createBrowserHistory()
    return (
      <div className="app">
        <BrowserRouter>
          <div>
              <Switch>
              <Route path="/gettingstarted" render={()=> <GettingStartedPage/>}/>
              <Route path="/login" render={()=> <LoginPage/>}/>
              <Route  path="/*" component={LoginPage}/>
              <PrivateRoute  loggedIn={this.props.loggedIn} path="/" redirectTo="/login" component={LandingContainer} />
              </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  storageLoginAttempt: state.storageLoginAttempt
})

export const mapDispatchToProps = dispatch => ({
  localStorageProfileFetch: ()=>dispatch(localStorageProfileFetch()),
  storageLogin:()=>dispatch(storageLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)