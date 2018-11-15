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


import {updatePageType} from '../../action/page-type-actions'
//Style



//new Material UI
import { withStyles } from '@material-ui/core/styles';

import {AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu } from '@material-ui/core'


import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import QuickScroll from './quick-scroll'






const styles = theme =>({
  appBar: theme.overrides.MuiAppBar.root,

})

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      landing: true,
      loggedIn: this.props.loggedIn,
      openMenu: false,
      scrollY : 0,
      innerHeight: 0,
      pageYOffset: 0,
      offsetHeight: 0,
      pageWidth: window.innerWidth || document.body.clientWidth,

    }
    this.updateScrollPosition = this.updateScrollPosition.bind(this);
    this.quickScrollCondition = this.quickScrollCondition.bind(this);
    this.resetScroll = this.resetScroll.bind(this);

    //page type... mobile or desktop
    this.updateWidthPosition = this.updateWidthPosition.bind(this)
  }

  componentDidMount(){
    window.addEventListener('scroll', ()=>this.updateScrollPosition(), true);
    window.addEventListener('resize', ()=>this.updateWidthPosition(), true);
  }

  componentWillUnmount(){
    // window.removeEventListener('scroll', ()=>this.updateScrollPosition(), true);
  }


  updateWidthPosition(){
    let width = window.innerWidth || document.body.clientWidth;
    let {pageType} = this.props;
    if (width < 600 && (pageType!='mobile')){
      this.props.updatePageType('mobile');
    }
    if (width > 600 && (pageType!='desktop')){
      this.props.updatePageType('desktop');
    }
    this.setState({
        pageWidth: window.innerWidth || document.body.clientWidth,
      });
    
  }

  updateScrollPosition(){
    this.setState({
      innerHeight: window.innerHeight,
      scrollY: window.scrollY,
      pageYOffset: window.pageYOffset,
      offsetHeight: document.body.offsetHeight+19
    });
  }

  resetScroll(){
    this.setState({
      innerHeight: 0,
      scrollY: 0,
      pageYOffset: window.pageYOffset,
      offsetHeight: 0,
    });
  }
  quickScrollCondition(){
    if(this.state.pageYOffset > this.state.innerHeight){
      return true
    } else {
      return false
    }
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
          <div id="nav-clear"></div>
          <AppBar position="static" className={classes.appBar} id="nav-bar">
          <Toolbar>
            <Typography variant="display1" color="inherit" style={{flex: 1}}>
              Poller
            </Typography>
            {this.quickScrollCondition() && <QuickScroll/>}
            <NavMenu resetScroll={this.resetScroll}/>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  pageType: state.pageType,
})

export const mapDispatchToProps = dispatch => ({
  setAuthToken: (token) => dispatch(setAuthToken(token)),
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  updatePageType: (pageType) => dispatch(updatePageType(pageType)),
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