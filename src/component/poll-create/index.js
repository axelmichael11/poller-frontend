import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import PropTypes from 'prop-types';import {compose} from 'recompose'

import {
  pollsFetch,
  pollDelete,
  pollSend,
  } from '../../action/user-polls-actions.js'
  import UserPollCard from '../user-poll-card'
  import LoadingHOC from '../loading/loadingHOC.js'
  import SubmitButton from '../loading/button.js'
  import MyPolls from '../my-polls'
  import HelpTab from '../help-feature'
  import RenderFormType from './render-form-type'

  import { withStyles } from '@material-ui/core/styles';
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
InputAdornment} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import poll_subjects from '../../lib/poll-subjects'

const FeedBackSubmitButton = LoadingHOC(SubmitButton)


  const styles = theme => ({
    container: theme.overrides.MuiPaper,
    button: theme.overrides.MuiButton,
   
    text: theme.typography.text,
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    actions: {
      display: 'flex',
    },
    expandMoreIcon:{
      colorPrimary: theme.palette.secondary.main
    },

    cardHeader:theme.overrides.PollCard.cardHeader,
    cardContent:theme.overrides.PollCard.cardContent,
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
  });




class PollCreatePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        //inputs
        pollSubject: null,
        pollQuestion:'',
        snackBarDuration: 5000,
        pollSubjectAnchor:null,

        //input validation
        subjectError: false,
        subjectErrorText: 'Max Subject Length Reached',
        questionError:false,
        questionErrorText: "Max Question Length Reached",
        openSubjectValidationError: false,
        subjectValidationErrorMessage: 'You have to enter one of the categories listed...',
        openQuestionValidationError:false,
        questionValidationErrorMessage: 'That can\'t be a question, it is too short!',

        //poll delete
        pollDeleteLoad:false,
        pollDeleteAlert: false,
        pollToDelete: null,
        //success
        openPollDeleteSuccess:false,
        pollDeleteSuccessMessage:'Poll has been deleted!',
        //failure
        pollDeleteErrorMessage:'The poll you attempted to delete was not found on our end...',
        openPollDeleteError:false,

        //mypolls
        myPollsLoad:false,
        myPollsError:false,
        myPollsErrorMessage:'Unable to retrieve your polls...',

        //poll create
        pollCreateLoad:false,
        openPollCreateSuccess:false,
        openPollDeleteError:false,
        pollCreateErrorMessage:'There was an error creating your poll... hmm',
        pollCreateSuccessMessage:'Poll has been created!',
        maxPollReachedMessage:'You already have three questions! That is the limit...',

        // unknown error
        unknownErrorMessage:'Unknown Error has Occurred... Try again later',
        unknownError: false,

        // help
        helpExpanded:false,
        helpText: `Represent yourself! None of these fields are required,
        and no demographic information specific to you is shown in the results of a poll.
        These can be updated as often as necessary. Why not make this app a little more interesting?`,

        //question types
        yesNoCheckBox: false,
        multipleChoiceCheckBox: false,

        //multiple choice
        answerOptions : [],
        pollAnswerOption:"",
        pollAnswerError:false,
        answerLabels: ["A","B","C","D","E"],

    }
  this.handleHelpExpand = this.handleHelpExpand.bind(this)
   this.handleYesNoPollSubmit = this.handleYesNoPollSubmit.bind(this)
   //input changes
   this.handleSubjectChange = this.handleSubjectChange.bind(this)
   this.handleQuestionChange = this.handleQuestionChange.bind(this)

   //error changes
   this.handleSubjectValidationError = this.handleSubjectValidationError.bind(this)
   this.handleQuestionValidationError = this.handleQuestionValidationError.bind(this)
   this.handlePollCreateSuccess = this.handlePollCreateSuccess.bind(this)
   this.handlePollClear = this.handlePollClear.bind(this)
   this.handleMaxPollReached = this.handleMaxPollReached.bind(this)
   this.handleUnknownError = this.handleUnknownError.bind(this)
   this.handlePollDeleteSuccess = this.handlePollDeleteSuccess.bind(this)
   this.handlePollDeleteAlertOpen = this.handlePollDeleteAlertOpen.bind(this)
   this.handlePollDeleteAlertClose = this.handlePollDeleteAlertClose.bind(this)
   this.handlePollDeleteError = this.handlePollDeleteError.bind(this)
   this.handleSubmitPollDelete = this.handleSubmitPollDelete.bind(this)
   this.handleMyPollsError = this.handleMyPollsError.bind(this)
   this.pollsFetch = this.pollsFetch.bind(this)
   this.handlePollCreateError= this.handlePollCreateError.bind(this)
   this.handleOpenPollSubjectList = this.handleOpenPollSubjectList.bind(this)
   this.handleClosePollSubjectList = this.handleClosePollSubjectList.bind(this)
   this.handlePollSubjectChange = this.handlePollSubjectChange.bind(this)
   this.renderMenuItems = this.renderMenuItems.bind(this)
   this.updateYesNoCheckBox = this.updateYesNoCheckBox.bind(this)

   //multiple choice
   this.updateMultipleChoiceCheckBox = this.updateMultipleChoiceCheckBox.bind(this)
   this.handleSubmitAnswerOption = this.handleSubmitAnswerOption.bind(this)
   this.validateAnswerOption =this.validateAnswerOption.bind(this)
   this.handleAnswerOptionChange = this.handleAnswerOptionChange.bind(this)
  }

  pollsFetch(){
    this.setState({myPollsLoad:true, myPollsError:false,})
    this.props.pollsFetch()
      .then(res => {
        if (res.status===200){
          this.setState({myPollsLoad:false, myPollsError:false, })
        }
    })
    .catch(err => {
      this.setState({myPollsLoad:false , myPollsError:true, })
      })
  }
  componentDidMount() {
    this.pollsFetch()
  }

  // passed down into BOTH 
  handleSubjectChange(e){
      if (e.target.value.length < 25){
        this.setState({pollSubject: e.target.value, subjectError:false})
      }else {
        this.setState({subjectError:true})
      }
  }

  //passed Down into BOTH
  handleQuestionChange(e){
    if (e.target.value.length < 150){
      this.setState({pollQuestion: e.target.value, questionError:false})
    }else {
      this.setState({questionError:true})
    }
  }

  // BOTH
  handleSubjectValidationError(){
    this.setState((oldState)=>{
      return {
        openSubjectValidationError: !oldState.openSubjectValidationError,
      }
    });
  }

  //BOTH
  handleQuestionValidationError(){
    this.setState((oldState)=>{
      return {
        openQuestionValidationError: !oldState.openQuestionValidationError,
      }
    });
  }

  //passed to BOTH
  handlePollCreateSuccess(){
    this.setState((oldState)=>{
        return {
          openPollCreateSuccess: !oldState.openPollCreateSuccess,
          pollCreateLoad:false,
        }
      });
  }


  //BOTH
  handleMaxPollReached(){
    this.setState((oldState)=>{
      return {
        openMaxPollReached: !oldState.openMaxPollReached,
        pollCreateLoad:false
      }
    });
  }

  handlePollDeleteSuccess(){
    this.setState((oldState)=>{
      return {
        openPollDeleteSuccess: !oldState.openPollDeleteSuccess,
        pollDeleteLoad:false,  
        pollDeleteAlert:false, 
        pollToDelete:null
      }
    });
  }

  handlePollDeleteError(){
    this.setState((oldState)=>{
      return {
        openPollDeleteError: !oldState.openPollDeleteError,
        pollDeleteLoad:false,  
        pollDeleteAlert:false, 
        pollToDelete:null
      }
    });
  }

  //BOTH
  handlePollClear(){
    this.setState({
          pollSubject: '',
          pollQuestion:'',
        });
  }

  handlePollDeleteAlertOpen(poll){
    this.setState({
      pollDeleteAlert: !this.state.pollDeleteAlert,
      pollToDelete: poll
    });
  };

  handlePollDeleteAlertClose(){
    this.setState({
      pollDeleteLoad:false,  
      pollDeleteAlert:false, 
      pollToDelete:null})
  };



  handleHelpExpand(){
    this.setState({ helpExpanded: !this.state.helpExpanded });
  }


  handleSubmitPollDelete(){
    this.setState({pollDeleteLoad:true})
    this.props.pollDelete(this.state.pollToDelete)
    .then((res)=>{
      if (res.status===200){
        this.handlePollDeleteSuccess()
      } else {
        this.handlePollDeleteSuccess()
      }
    })
    .catch(err=>{
      if (err.status===404){
        this.handlePollDeleteError()
      } else {
        this.handleUnknownError()
      }
    })
  }

  updateYesNoCheckBox() {
    this.setState((oldState) => {
      if (oldState.multipleChoiceCheckBox) {
        return {
          multipleChoiceCheckBox: !oldState.multipleChoiceCheckBox,
          yesNoCheckBox: !oldState.yesNoCheckBox,
        };
      }
      if (oldState.yesNoCheckBox) {
        return {
        yesNoCheckBox: !oldState.yesNoCheckBox,
        }
      }
      if (!oldState.yesNoCheckBox) {
        return {
          yesNoCheckBox: !oldState.yesNoCheckBox,
        }
      }
    });
  }

  updateMultipleChoiceCheckBox(){
    this.setState((oldState) => {
      if (oldState.yesNoCheckBox) {
        return {
          yesNoCheckBox: !oldState.yesNoCheckBox,
          multipleChoiceCheckBox: !oldState.multipleChoiceCheckBox,
        };
      }
      if (oldState.multipleChoiceCheckBox) {
        return {
        multipleChoiceCheckBox: !oldState.multipleChoiceCheckBox,
        }
      }
      if (!oldState.multipleChoiceCheckBox) {
        return {
          multipleChoiceCheckBox: !oldState.multipleChoiceCheckBox,
        }
      }
    });
  }
  

  handleYesNoPollSubmit(){
      let {pollSubject, pollQuestion} = this.state
      let {nickname} = this.props.userProfile
      let poll = Object.assign({}, {
        pollSubject, 
        pollQuestion, 
        nickname, 
        type:"YN",
      })
      if (poll.pollSubject === null){
          this.handleSubjectValidationError();
          return;
      }
      
      if (poll.pollQuestion.length < 10){
          this.handleQuestionValidationError();
          return;
      }
      this.setState({pollCreateLoad:true})
      this.props.pollSend(poll)
      .then((res)=>{
          if (res.status===200){
            this.handlePollClear()
            this.handlePollCreateSuccess()
          } else {
            this.handlePollClear()
            this.handlePollCreateSuccess()
          }
      })
      .catch(err=>{
        if (err.status===550){
          this.handleMaxPollReached();
        } else {
          this.handleUnknownError();
        }
      })
  }

  handleUnknownError(){
    this.setState((oldState)=>{
      return {
        unknownError: !oldState.unknownError,
        pollDeleteLoad: false,
        pollCreateLoad:false,
      }
    });
  }
  handleMyPollsError(){
    this.setState((oldState)=>{
      return {
        myPollsError: true,
        myPollsLoad: false,
        pollCreateLoad:false,
      }
    });
  }
  handlePollCreateError(){
    this.setState((oldState)=>{
      return {
        openPollCreateError: !oldState.openPollCreateError,
        pollCreateLoad:false,  
      }
    });
  }

    renderMenuItems(list, handleChangeMethod){
    let {classes} = this.props
    return Object.keys(list).map((key, i)=>{
        return (<MenuItem
        key={i}
        value={i}
        style={{...classes.text}}
        onClick={event => handleChangeMethod(key)}
        >
        {list[key]}
        </MenuItem>
        )
      })
  }

  handleOpenPollSubjectList(e){
    this.setState({ pollSubjectAnchor: e.currentTarget });
  }

  handleClosePollSubjectList(){
    this.setState({ pollSubjectAnchor: null });

  }
  handlePollSubjectChange(value){
    this.setState({pollSubject: parseInt(value), pollSubjectAnchor: null});
}

validateAnswerOption(){
  if (this.state.answerOptions.length>5){
    console.log('HITTING question error')
  }
}

handleAnswerOptionChange(e){
  if (e.target.value.length < 30){
    this.setState({pollAnswerOption: e.target.value, pollAnswerError:false})
  }else {
    this.setState({pollAnswerError:true})
  }
}

handleSubmitAnswerOption(){
  if (this.state.answerOptions.length > 4){
    console.log('MAX OPTIONS REACHED')
  } else {
    let {pollAnswerOption} = this.state;
    this.setState((oldState)=>{
      return {
        answerOptions: [...oldState.answerOptions, pollAnswerOption],
        pollAnswerOption: "",
      }
    })
  }
}

handleDeleteAnswerOption(option){

}

  render() {
    const {classes, theme} = this.props
    console.log("POLL CREATE STATE: YES NO", this.state.yesNoCheckBox,"MULTIPLE CHOICE", this.state.multipleChoiceCheckBox)
    return (
        <div>
          <Dialog
            open={this.state.pollDeleteAlert}
            modal={false}
        >
          <DialogTitle id="alert-dialog-title">"Are you sure?"</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this poll? You cannot undo this.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <div className={classes.container}>
            <Button 
              onClick={this.handlePollDeleteAlertOpen} 
              className={classes.button}
            >
              Cancel
            </Button>
            </div>
            <div className={classes.container}>
            <FeedBackSubmitButton
                // classes={classes}
                submitClick={this.handleSubmitPollDelete}
                buttonTitle={'Delete Poll'}
                Loading={this.state.pollDeleteLoad}
                timeError={this.handleUnknownError}
                loadingError={this.state.openPollDeleteError}
                loadingErrorMessage={this.state.pollDeleteErrorMessage}
                handleLoadingError={this.handlePollDeleteError}
              />
            </div>
          </DialogActions>
        </Dialog>

        <HelpTab
          helpExpanded={this.state.helpExpanded}
          handleHelpExpand={this.handleHelpExpand}
          helpText={this.state.helpText}
        />

            <Paper square elevation={2} className={classes.container}>
                <Card style={{padding:7}}>
                <CardHeader
                    className={classes.cardHeader}
                    title={"Poll Create"}
                    classes={{
                        title: classes.cardHeader
                    }}
                />

                <CardContent className={classes.cardContent}>
                <Toolbar>
                <Typography variant="subheading" component="h3" style={{display:'block'}}>
                    Question Type
                </Typography>
                <FormControlLabel
                style={{marginLeft:'1em'}}
                  control={
                    <Checkbox
                      checked={this.state.yesNoCheckBox}
                      onChange={this.updateYesNoCheckBox}
                        
                        className={classes.checkBox}
                        color="default"
                    />
                  }
                  label="Yes/No"
                />
                 <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.multipleChoiceCheckBox}
                      onChange={this.updateMultipleChoiceCheckBox}
                        className={classes.checkBox}
                        color="default"
                    />
                  }
                  label="Multiple Choice"
                />
              </Toolbar>    
                </CardContent>

                <Divider/>

                <RenderFormType
                  yesNoCheckBox={this.state.yesNoCheckBox}
                  multipleChoiceCheckBox={this.state.multipleChoiceCheckBox}
                  handleOpenPollSubjectList={this.handleOpenPollSubjectList}
                  pollSubject={this.state.pollSubject}
                  pollSubjectAnchor={this.state.pollSubjectAnchor}
                  handleClosePollSubjectList={this.handleClosePollSubjectList}
                  renderMenuItems={this.renderMenuItems}
                  handlePollSubjectChange={this.handlePollSubjectChange}
                  questionError={this.state.questionError}
                  questionErrorText={this.state.questionErrorText}
                  pollQuestion={this.state.pollQuestion}
                  handleQuestionChange={this.handleQuestionChange}
                  handleYesNoPollSubmit={this.handleYesNoPollSubmit}
                  pollCreateLoad={this.state.pollCreateLoad}
                  handleUnknownError={this.handleUnknownError}
                  openPollCreateError={this.state.openPollCreateError}
                  pollCreateErrorMessage={this.state.pollCreateErrorMessage}
                  handlePollCreateError={this.handlePollCreateError}
                  handleSubmitAnswerOption={this.handleSubmitAnswerOption}
                  handleAnswerOptionChange={this.handleAnswerOptionChange}
                  answerOptions={this.state.answerOptions}
                  answerLabels={this.state.answerLabels}
                  pollAnswerOption={this.state.pollAnswerOption}
                />

                
                </Card>
        </Paper>





        <Paper className={classes.container} style={{marginBottom:10}}>
          <CardContent className={classes.cardHeader}>
            <Typography variant="headline" component="h1" className={classes.cardHeader}>
              My Polls
            </Typography>
          </CardContent>
          </Paper>

          <div className="list">
            <MyPolls
            Loading={this.state.myPollsLoad}
            userPolls={this.props.userPolls}
            loadingError={this.state.myPollsError}
            loadingErrorMessage={this.state.myPollsErrorMessage}
            handleLoadingError={this.handleMyPollsError}
            error={this.state.myPollsError}
            errorTry={this.pollsFetch}
            timeError={this.pollsFetch}
            handlePollDeleteAlertOpen={this.handlePollDeleteAlertOpen}
            />
          </div>


         <Snackbar
          open={this.state.openSubjectValidationError}
          message={this.state.subjectValidationErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleSubjectValidationError}
        />

         <Snackbar
          open={this.state.openQuestionValidationError}
          message={this.state.questionValidationErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleQuestionValidationError}
        />

         <Snackbar
          open={this.state.openPollCreateSuccess}
          message={this.state.pollCreateSuccessMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollCreateSuccess}
        />

         <Snackbar
          open={this.state.openPollCreateError}
          message={this.state.pollCreateErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollCreateError}
        />


        <Snackbar
          open={this.state.openMaxPollReached}
          message={this.state.maxPollReachedMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleMaxPollReached}
        />
        <Snackbar
          open={this.state.openPollDeleteSuccess}
          message={this.state.pollDeleteSuccessMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollDeleteSuccess}
        />

        <Snackbar
          open={this.state.openPollDeleteError}
          message={this.state.pollDeleteErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollDeleteError}
        />
        <Snackbar
          open={this.state.unknownError}
          message={this.state.unknownErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleUnknownError}
        />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
    userPolls: state.userPolls,
  })
  
  export const mapDispatchToProps = dispatch => ({
    pollSend: (poll)=> dispatch(pollSend(poll)),
    pollsFetch: () => dispatch(pollsFetch()),
    pollDelete: (poll)=> dispatch(pollDelete(poll)),
  })
  
  PollCreatePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };  

  export default compose(
    withStyles(styles, {withTheme:true}),
    connect(mapStateToProps, mapDispatchToProps)
  )(PollCreatePage)