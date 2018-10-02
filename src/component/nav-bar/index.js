//packages
import React from 'react'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types';
import {compose} from 'recompose'

//Methods
import { setAuthToken } from '../../action/auth0-actions.js'
import { login, logout } from '../../action/auth-actions.js'

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...

import NavMenu from '../nav-menu/index.js'

//Style

import {grey50} from 'material-ui/styles/colors';


//new Material UI
import { withStyles } from '@material-ui/core/styles';

import {AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu } from '@material-ui/core'


import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme =>({
  appBar: theme.overrides.MuiAppBar,

})


class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      landing: true,
      loggedIn: this.props.loggedIn,
      openMenu: false,
    }
  }

  componentWillMount() {
  }


  handleOpenMenu(){
    this.setState({
      openMenu: true,
    });
  }

  handleOnRequestChange(value){
    this.setState({
      openMenu: value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <AppBar position="static" className={classes.appBar}>
          <Toolbar>
         
            <Typography variant="display1" color="inherit" style={{flex: 1}}>
              Poller
            </Typography>
            <NavMenu/>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn
})

export const mapDispatchToProps = dispatch => ({
  setAuthToken: (token) => dispatch(setAuthToken(token)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
})


NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,

};


export default compose(
  // These are both single-argument HOCs
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles , {withTheme: true})
)(NavBar)