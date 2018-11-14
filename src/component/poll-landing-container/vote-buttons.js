import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Button, Typography} from '@material-ui/core'


const styles = theme =>({
    container: theme.overrides.MuiPaper,
    text: theme.typography.text,
    voteButton: theme.uniqueStyles.MuiVoteButton,
    // voteButtonTitleText: theme.uniqueStyles.MuiVoteButton.titleText,
    voteButtonOptionText: theme.uniqueStyles.MuiVoteButton.optionText,
    button:theme.overrides.MuiButton,
  })

export const YNVoteButton = withStyles(styles, {withTheme:true})((props) =>{
    console.log('classes on votebutton', props)
    return (
      <div>
        <Button 
        variant="outlined"
        onClick={()=>props.handleVoteClick(props.voteValue)} 
        className={props.classes.voteButton}
        >
      {props.optionChoice} 
        </Button>
      </div>
    )
  })
  
export const MCVoteButton = withStyles(styles, {withTheme:true})((props) =>{
    console.log('classes on votebutton', props)
    return (
      <div>
        <Button 
        variant="outlined"
        onClick={()=>props.handleVoteClick(props.voteValue)} 
        className={props.classes.voteButton}
        style={{display:'block', wordWrap:'break-word'}}
        >
        {props.voteButtonText}
        </Button>
      </div>
    )
  })