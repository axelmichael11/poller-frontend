//packages
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';


import randomColor from 'randomcolor'; // import the script

//Methods
import Swipe from 'react-easy-swipe';


//These will be used, to store id of the user in the database...



//Style

import { withStyles } from '@material-ui/core/styles';



import { 
  Popper,
  Grow,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Menu,
    MenuItem,
    Toolbar,
    Button } from '@material-ui/core'
    
    
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


// const ITEM_HEIGHT = 48;


const styles = theme =>({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },

  selectedItem:{
    backgroundColor: 'rgb(10,2,8,0.6)',
    color: theme.palette.secondary.main
},
unselectedItem:{
    backgroundColor: 'rgb(255,255,255, 0.6)',
    color: theme.palette.primary.main
},
menu:{
  paper:{

    backgroundColor: "rgb(0, 0, 0)",
    /* RGBa with 0.6 opacity */
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  }
}
 
})

class SwipeActionsWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onSwipeStart = this.onSwipeStart.bind(this)
    this.onSwipeMove = this.onSwipeMove.bind(this)
    this.onSwipeEnd = this.onSwipeEnd.bind(this) 
  }

  onSwipeStart(event) {
    console.log('Start swiping...', event);
  }

  onSwipeMove(position, event) {
    console.log(`Moved ${position.x} pixels horizontally`, event);
    console.log(`Moved ${position.y} pixels vertically`, event);
  }

  onSwipeEnd(event) {
    console.log('End swiping...', event);
  }
 
  render() {
    let {classes, theme} = this.props
    console.log('SWIPE CHILDREN', this.props.children)
    return (
      <div>
        <Swipe
            onSwipeStart={this.onSwipeStart}
            onSwipeMove={this.onSwipeMove}
            onSwipeEnd={this.onSwipeEnd}>
            {this.props.children}
        </Swipe>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
  })

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(SwipeActionsWrapper);