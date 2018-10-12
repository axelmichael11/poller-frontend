import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose, branch, renderComponent} from 'recompose'
import _ from 'lodash'

import { withStyles } from '@material-ui/core';

import {RemoveCircle,
  NotInterested,
  MoreVertIcon } from '@material-ui/icons'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  AppBar,
  Button,
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
  ageSelect:{
    marginLeft: 15,
  },
  container: theme.overrides.MuiPaper.root,
  cardHeader:theme.overrides.PollCard.cardHeader,
  cardContent:theme.overrides.PollCard.cardContent,
  text: theme.typography.text,
  listContainer: theme.overrides.MuiListItem.container,
  listItem:theme.overrides.MuiListItem,
  table:{
    maxWidth: '85%',
    margin: 'auto',
  }
})

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: 20,
  },
  body: {
    fontSize: 14,
    maxWidth:'75%',
  },
}))(TableCell);


const AnswerOption = ({...props}) =>{
  let {classes} = props;
    return (
          <TableRow>
                <CustomTableCell>
                {props.answerLabels[props.answerOptionNumber]}
                </CustomTableCell>
                <CustomTableCell>{props.answerOptionText}</CustomTableCell>
                <CustomTableCell>
                  <IconButton
                  onClick={()=> props.handleRemoveOptionAnswer(props.answerOptionNumber)}
                  >
                    <RemoveCircle/>
                  </IconButton>
                </CustomTableCell>
          </TableRow>)}


class RenderAnswerOptions extends React.Component {
  constructor(props){
    super(props)
    this.rowFeedBack = this.rowFeedBack.bind(this)
  }

  rowFeedBack(){
    if (Object.keys(this.props.answerOptions).length === 0){
      return (<AnswerFeedBackRow feedBackText="You need to submit at least two Options"/>)
    }
    if (Object.keys(this.props.answerOptions).length === 1){
      return (<AnswerFeedBackRow feedBackText="One more Needed"/>)
    }
  }
    
    render(){
    let {answerOptions, classes} = this.props
    console.log("ANSWER OPTIONS TO RENDER", Object.values(answerOptions))
    return(
        <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Optional Answers</CustomTableCell>
            <CustomTableCell></CustomTableCell>
            <CustomTableCell> </CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {answerOptions.map((answerOption, key) => {
            return (
              <AnswerOption {...this.props} 
                key={key}
                answerOptionNumber={key} 
                answerOptionText={answerOption}
              />);
          })}
          {this.rowFeedBack()}
        </TableBody>
      </Table>
    )
  }
}

    const AnswerFeedBackRow = ({feedBackText}) => {
      return (
          <TableRow>
            <CustomTableCell>{feedBackText}</CustomTableCell>
            <CustomTableCell></CustomTableCell>
            <CustomTableCell></CustomTableCell>
          </TableRow>
      )
    }


    const SubmitAnswerOption = ({...props}) =>{
      let {classes } = props;
      return (
        <div>
    <CardContent className={classes.cardContent}>
    <Toolbar className={classes.cardContent}>
      <Typography variant="subheading" component="h3" style={{marginRight:15}}>
          Answer
      </Typography>
      <FormControl>
        <InputLabel >{props.questionError ? props.questionErrorText : ""}</InputLabel>
        <Input
          value={props.pollAnswerOption}
          onChange={props.handleAnswerOptionChange}
          rows={6}
          rowsMax="2"
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
      <div style={{
        marginTop:'1em',
        marginBottom:'1em',
      }}>
        <RenderAnswerOptions {...props}/>
        
        {props.answerOptions.length >= 4 ?
          null : <SubmitAnswerOption {...props}/>}
          <Divider/>
      </div>
    )
  }
  
  
export default compose(
  withStyles(styles, {withTheme:true})
)(RenderAnswerSubmit)
  
  

