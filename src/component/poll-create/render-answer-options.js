import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose, branch, renderComponent} from 'recompose'
import _ from 'lodash'

import { withStyles } from '@material-ui/core';

import NotInterested from '@material-ui/icons/NotInterested';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Input,
  MenuItem,
  FormControl,
  Select,
  Divider,
  Paper,
  Typography,
  Checkbox,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  MenuList,
  Snackbar,
  IconButton,
  Collapse,
  Avatar,
  TextField,
  Toolbar,
  FormControlLabel,
InputAdornment,
withTheme} from '@material-ui/core'
import LoadingHOC from '../loading/loadingHOC.js'
import SubmitButton from '../loading/button.js'




const FeedBackSubmitButton = LoadingHOC(SubmitButton)



const styles = (theme) =>({
  button:theme.overrides.MuiButton,
    container: theme.overrides.MuiPaper,
  ageSelect:{
    marginLeft: 15,
  },
  cardContent:theme.overrides.PollCard.cardContent,
  text: theme.typography.text,

  listContainer: theme.overrides.MuiListItem.container,
  listItem:theme.overrides.MuiListItem,
  // listTitle: theme.overrides.MuiListItem.title,
})


const AnswerOption = ({...props}) =>{
  let {classes} = props;
    return (
        <div>
            <CardContent className={classes.cardContent}>
              <Toolbar className={classes.cardContent}>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Answer {props.answerLabels[props.answerOptionNumber]}:
                </Typography>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    {props.answerOptionText}
                </Typography>
              </Toolbar>
            </CardContent>
            <Divider/>
        </div>
    )
}


const RenderAnswerOptions = ({ ...props }) => {
    let {answerOptions} = props
    return(
      <div className="list">
      {answerOptions.map((answerOption, key) => 
        <div className="list-row" key={key}>
          <AnswerOption {...props} answerOptionNumber={key} answerOptionText={answerOption}/>
        </div>)}
        {null}
    </div>
    )}

    const NoAnswersListed = ({...props}) => {
      return (
        <div>
          <Typography variant="headline" component="h3" style={{width:'100%' , margin:'auto', textAlign:'center' }}>
          You need to submit at least two answer options
          </Typography>
        </div>
      )
    }


    const SubmitAnswerOption = ({...props}) =>{
      let {classes } = props;
      return (
        <div>
          <Divider/>
    <CardContent className={classes.cardContent}>
    <Toolbar className={classes.cardContent}>
      <Typography variant="subheading" component="h3" style={{marginRight:15}}>
          Answer
      </Typography>
      <FormControl>
        <InputLabel >{props.questionError ? props.questionErrorText : ""}</InputLabel>
        <Input
          multiline={true}
          id="adornment-amount"
          value={props.pollAnswerOption}
          onChange={props.handleAnswerOptionChange}
          rows={6}
          rowsMax="6"
        />
      </FormControl>
      <SubmitButton
        submitClick={props.handleSubmitAnswerOption}
        buttonTitle={'Submit Answer Option'}
      />
    </Toolbar>
  </CardContent>
        </div>
      )
    }






  const RenderAnswerSubmit = ({...props}) => {
    let {classes} = props;
    return (
      <div>
        {props.answerOptions.length > 0 ?
        <RenderAnswerOptions {...props}/>:<NoAnswersListed/>}

        <SubmitAnswerOption {...props}/>
      </div>
    )
  }
  
  
export default compose(
  withStyles(styles, {withTheme:true})
)(RenderAnswerSubmit)
  
  

