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
    Typography,
    CardContent,
    Collapse, 
    Button } from '@material-ui/core'
    
    
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';





const styles = theme =>({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  container:{
    display:'inline-block'
  },
    selectedItem:{
      backgroundColor: 'rgb(10,2,8,0.6)',
      color: theme.palette.secondary.main
  },
  unselectedItem:{
      backgroundColor: 'rgb(255,255,255, 0.6)',
      color: theme.palette.primary.main
  },
  cardContent:{
    root:{
      wordWrap: 'break-word',
      marginTop:'1em',
    }
  }

})

class QuestionExpand extends React.Component {
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
      <div className={classes.container}>
          <Button 
            size="small"
            variant="contained" 
            color="primary" 
            aria-label="Add" 
            onClick={this.props.handleExpandQuestion}>
          <MoreHorizIcon />
        </Button>
      </div>
    )
  }
}

export const QuestionExpandWithStyle =  compose(
    // connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(QuestionExpand);



class QuestionCardContent extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }
    
    render() {
      let {classes, theme} = this.props
      return (
        <div>
            <Collapse in={this.props.questionExpanded} timeout="auto" unmountOnExit>
            <CardContent>
            <Typography variant="subheading" style={{
                marginTop:'1em',
                overflowWrap:'break-word'}}
                >
                        {this.props.authorUsername}:
                        </Typography>
                        <Typography variant="display3" style={{overflowWrap:'break-word'}}>
                        {this.props.question}
                        </Typography>
                    </CardContent>
              </Collapse>
        </div>
      )
    }
  }

export const QuestionCardContentWithStyle =  compose(
    // connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(QuestionCardContent);

