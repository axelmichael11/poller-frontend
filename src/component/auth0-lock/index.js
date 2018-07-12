
import React from 'react'
import Auth0Lock from 'auth0-lock'

import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import {compose} from 'recompose'
import MaterialStyles from '../../style/material-ui-style'
import { withStyles } from '@material-ui/core/styles';

import {
  profileFetch,
} from '../../action/profile-actions.js'
import {
    storageLoginAttempt,
} from '../../action/storage-login-attempt.js'
import {setAuthToken} from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'

import Button from '@material-ui/core/Button';


const styles = theme => ({
  // container: theme.overrides.MuiButton.container,
  button: theme.overrides.MuiButton,
})


class AuthLockButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.logout = this.logout.bind(this)
    this.showLock = this.showLock.bind(this)
  }

  componentWillMount() {
    const options = {
      // oidcConformant: true, //this determines METADATA is returned in scope...
      rememberLastLogin: true,
      // sso: true,
      redirect:false,
      auth: {
        // sso:true,
        redirect:false,
        audience: __AUTH0_AUDIENCE__,
        params: {
          scope: 'openid profile userId user_metadata update:users_app_metadata openid email profile read:clients write:clients update:users_app_metadata update:users update:current_user_metadata', //need to research the scope parameter...
        },
      },
      languageDictionary: {
        title: 'Poller',
      },
    }
    this.lock = new Auth0Lock(
        __AUTH0_CLIENT_ID__,
        __AUTH0_CLIENT_DOMAIN__,
      options
    )
    this.lock.on('authenticated', authResult => {
      if (!authResult) return new Error('failed to authenticate');
        this.props.setAuthToken(authResult.accessToken)
        this.props.profileFetch()
        .then(profile=>{
          // console.log('profile!', profile, this.props)
            if (this.props.loggedIn && this.props.userProfile){
            this.props.history.push('/explore')
          } else {
            this.props.history.push('login')
          }
        }).catch(err=>console.log('error!', err))
        
    })

    this.lock.on('unrecoverable_error', error=> console.log('unrevoreable error',error))

    // this.lock.resumeAuth(hash, function(error, authResult) {
    //   if (error) {
    //     alert("Could not parse hash");
    //   }
    //   console.log(authResult.accessToken);
    // });

    this.lock.on('authorization_error', (error)=>{
      console.log('authoriazation error', error)
    })



    // this.checkStorageLogin()
  }
  showLock() {
    // this.lock.checkSession({}, function (error, authResult) {
      // if (error || !authResult) {
        this.lock.show();
      // } else {
        // user has an active session, so we can use the accessToken directly.
        // this.lock.getUserInfo(authResult.accessToken, function (error, profile) {
        //   console.log(error, profile);
          
    //     });
    //   }
    // });
  }

    logout() {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('poller_token')
        localStorage.removeItem('reduxPersist:auth')
        //might need these later... need to research redux persist
        localStorage.removeItem('reduxPersist:userId')
        localStorage.removeItem('reduxPersist:profile')
        localStorage.removeItem('reduxPersist:userInfo')
        this.props.logout()
        this.lock.logout()
      }

  render() {
      let {classes} = this.props
    return (
      <div >
        <Button 
        variant="outlined"
        onClick={this.props.loggedIn ? this.logout : this.showLock} 
        className={classes.button}>
        {this.props.loggedIn ? 'LOGOUT' : 'SIGNUP / LOGIN'}
        </Button>
      </div>
    )
  }
}
export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
    setAuthToken:(token) => dispatch(setAuthToken(token)),
    logout: () => dispatch(logout()),
    profileFetch: () => dispatch(profileFetch()),
  })
  

  AuthLockButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
  )(AuthLockButton)