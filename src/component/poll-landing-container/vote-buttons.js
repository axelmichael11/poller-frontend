import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Button, Typography} from '@material-ui/core'


const styles = theme =>({
    container: theme.overrides.MuiPaper,
    text: theme.typography.text,
    voteButton: theme.uniqueStyles.MuiVoteButton,
    voteButtonTitleText: theme.uniqueStyles.MuiVoteButton.titleText,
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
        // value={props.voteValue}
        >
        <Typography 
            className={props.classes.voteButtonTitleText}
            // style={{width:'40%' }}
        >{props.optionChoice} 
        </Typography>
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
        >
        <Typography 
            className={props.classes.voteButtonTitleText}
        > {props.optionChoice}: 
        </Typography>
        <Typography 
            className={props.classes.voteButtonOptionText}
        > "{props.voteButtonText}"
        </Typography>
        </Button>
      </div>
    )
  })