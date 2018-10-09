import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {compose} from 'recompose'
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';


import Scroll from 'react-scroll'
const Link       = Scroll.Link;

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });



class MyPollsButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
        this.nextPath = this.nextPath.bind(this)
      }

    nextPath(){
        this.props.history.push('/pollcreate')
        this.props.handleClose()

    }
    render(){
        return (
            <div>
                <Link activeClass="active" to="app" spy={true} smooth={false} offset={-5} duration={0}>
                <MenuItem onClick={()=>this.nextPath()}>My Polls</MenuItem>
                </Link>
           </div>
        )
    }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
      userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
  })
  
  export default compose(
    // These are both single-argument HOCs
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter
  )(MyPollsButton)