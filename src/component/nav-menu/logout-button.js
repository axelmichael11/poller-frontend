import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {compose} from 'recompose'
import MenuItem from '@material-ui/core/MenuItem';

import { withStyles } from '@material-ui/core/styles';

import {logout} from '../../action/auth-actions'

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });


class LogoutButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
        this.nextPath = this.nextPath.bind(this)
      }

    nextPath(){
        this.props.logout()
        this.props.history.push('/login')
    }
    render(){
        return (
            <div>
                <MenuItem onClick={()=>this.nextPath()}>Log out</MenuItem>
           </div>
        )
    }
}
export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
    userProfile: state.userProfile,
})

export const mapDispatchToProps = dispatch => ({
    logout:()=>dispatch(logout())
})

export default compose(
  // These are both single-argument HOCs
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter,
)(LogoutButton)