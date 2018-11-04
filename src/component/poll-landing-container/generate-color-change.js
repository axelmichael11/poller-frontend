//packages
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';


import randomColor from 'randomcolor'; // import the script

//Methods


//These will be used, to store id of the user in the database...



//Style

import { withStyles } from '@material-ui/core/styles';



import { 
 
    Button } from '@material-ui/core'
    
    
import ColorChangeIcon from '@material-ui/icons/autorenew'

const ITEM_HEIGHT = 48;


const styles = theme =>({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  colorChangeButton: theme.uniqueStyles.colorChangeButton.root,
 colorChangeIcon:{
   backgroundColor:'linear-gradient(45deg, orange, yellow, green, cyan, blue, violet)',
  color:'linear-gradient(45deg, orange, yellow, green, cyan, blue, violet)',
 }
})

class GenerateColorChange extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  
  render() {
    let {classes, theme} = this.props
    let {anchorEl} = this.state;
    let {chartTypes , chartOptions} = this.props;

    return (
      <div style={{position:'absolute'}}>
          <Button 
            size="small"
            variant="fab" 
            color="primary" 
            onClick={this.props.handleGenerateNewColors}>
          <ColorChangeIcon  
            className={classes.colorChangeIcon}
          />
        </Button>
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
)(GenerateColorChange);