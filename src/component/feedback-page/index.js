
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose } from 'recompose'

import {
  pollsFetch,
  pollDelete,
  pollSend,
  } from '../../action/user-polls-actions.js'

  
  import PropTypes from 'prop-types';


  import { withStyles } from '@material-ui/core/styles';

  import {
    InputLabel,
    Input,
    FormControl,
    Paper,
    Typography,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Snackbar,
    Toolbar } from '@material-ui/core'
  // ;)


  import LoadingHOC from '../loading/loadingHOC.js'
  import SubmitButton from '../loading/button.js'
  import {feedBackSend} from '../../action/feedback-actions'

const FeedBackSubmitButton = LoadingHOC(SubmitButton)



const styles = theme =>({
  button: theme.overrides.MuiButton,
  menuItem: theme.overrides.MuiMenuItem,
  
})

class FeedBackPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedBack:'',
      openFeedBackError: false,
      feedBackErrorText:'Max Feedback Characters reached',
      openFeedBackValidationError:false,
      openFeedBackValidationErrorMessage: 'You need to submit more than 10 characters!',
      openFeedBackSuccessMessage:'FeedBack successfully submitted! Thank you for your comments!',
      feedBackErrorMessage:'There was an error submitting your feedback',
      openFeedBackSuccess:false,
      snackBarDuration:4000,
      // unknown error
      unknownErrorMessage:'Unknown Error has Occurred... Try again later',
      unknownError: false,
      //max feedback submissions
      openMaxFeedBackReached:false,
      maxFeedBackReachedMessage:'You have already submitted a comment! Thanks for the input!',

    }

    this.handleFeedBackClear = this.handleFeedBackClear.bind(this)
    this.handleFeedBackError = this.handleFeedBackError.bind(this)
    this.handleFeedBackSuccess = this.handleFeedBackSuccess.bind(this)
    this.handleMaxFeedBackReached = this.handleMaxFeedBackReached.bind(this)
    this.handleUnknownError = this.handleUnknownError.bind(this)
    this.handleFeedBackSubmit = this.handleFeedBackSubmit.bind(this)
    this.handleFeedBackValidationError = this.handleFeedBackValidationError.bind(this)
    this.handleFeedBackChange = this.handleFeedBackChange.bind(this)

  }

  handleFeedBackSubmit(){
    let {feedBack} = this.state
    let {nickname} = this.props.userProfile
    let feedBackData = Object.assign({}, {feedBack, nickname})
    
    if (feedBack < 10){
        this.handleQuestionValidationError();
        return;
    }
    this.setState({feedBackLoad:true})
    this.props.feedBackSend(feedBackData)
    .then((res)=>{
      console.log('RESPONSE',res)
        if (res.status===200){
          this.handleFeedBackClear()
          this.handleFeedBackSuccess()
        } else {
          this.handleFeedBackClear()
          this.handleFeedBackSuccess()
        }
    })
    .catch(err=>{
      console.log('ERROR',err)
      if (err.status===550){
        this.handleMaxFeedBackReached();
      } else {
        this.handleUnknownError();
      }
    })
}

handleFeedBackValidationError(){
  this.setState((oldState)=>{
    return {
      openFeedBackValidationError: !oldState.openFeedBackValidationError,
    }
  });
}

handleFeedBackSuccess(){
  this.setState((oldState)=>{
      return {
        openFeedBackSuccess: !oldState.openFeedBackSuccess,
        feedBackLoad:false,
      }
    });
}

handleFeedBackError(){
    this.setState((oldState)=>{
      return {
        openFeedBackError: !oldState.openFeedBackError,
        feedBackLoad:false,  
      }
    });
}

handleFeedBackClear(){
  this.setState({
        feedBack: '',
      });
}

handleUnknownError(){
  this.setState((oldState)=>{
    return {
      unknownError: !oldState.unknownError,
      feedBackLoad: false,
    }
  });
}

handleMaxFeedBackReached(){
  this.setState((oldState)=>{
    return {
      openMaxFeedBackReached: !oldState.openMaxFeedBackReached,
      feedBackLoad:false
    }
  });
}

handleFeedBackChange(e){
  if (e.target.value.length < 150){
    this.setState({feedBack: e.target.value, openFeedBackValidationError:false})
  }else {
    this.setState({openFeedBackValidationError:true})
  }
}


  render() {
    const {classes} = this.props;
    return (
        <div>
            <Paper className={classes.container}>

        <Card>
          <CardContent className={classes.cardHeader}>
                <Typography variant="headline" component="h1" className={classes.cardHeader}>
                    Rate this app!
                </Typography>
            </CardContent>
            <CardContent>
                <Typography component='h3'>
                    Any feedback on this application is tremendously appreciated!
                    Due to data limitations, you can only submit one comment.
                    Your comments are anonymous,
                    again any feedback will help this application!
                </Typography>
            </CardContent>
            <CardContent className={classes.cardContent}>
              <Toolbar className={classes.cardContent}>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Submit Feedback
                </Typography>
                <FormControl fullWidth>
                  <InputLabel >{this.state.feedBackError ? this.state.feedBackErrorText : ""}</InputLabel>
                  <Input
                    multiline={true}
                    id="adornment-amount"
                    value={this.state.feedBack}
                    onChange={this.handleFeedBackChange}
                    rows={6}
                    rowsMax="6"
                  />
                </FormControl>
              </Toolbar>
            </CardContent>
            <CardContent className={classes.container}>
              <FeedBackSubmitButton
                submitClick={this.handleFeedBackSubmit}
                buttonTitle={'Submit Feedback'}
                Loading={this.state.feedBackLoad}
                timeError={this.handleUnknownError}
                loadingError={this.state.openFeedBackError}
                loadingErrorMessage={this.state.feedBackErrorText}
                handleLoadingError={this.handleFeedBackError}
              />
            </CardContent>
          </Card>
        </Paper>

         <Snackbar
          open={this.state.openFeedBackValidationError}
          message={this.state.openFeedBackValidationErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleFeedBackValidationError}
        />

         <Snackbar
          open={this.state.openFeedBackSuccess}
          message={this.state.openFeedBackSuccessMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleFeedBackSuccess}
        />

         <Snackbar
          open={this.state.openFeedBackError}
          message={this.state.feedBackErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleFeedBackError}
        />
        <Snackbar
          open={this.state.unknownError}
          message={this.state.unknownErrorMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleUnknownError}
        />

        <Snackbar
          open={this.state.openMaxFeedBackReached}
          message={this.state.maxFeedBackReachedMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleMaxFeedBackReached}
        />
        </div>
      )
    }
  }


  
export const mapStateToProps = state => ({
  userProfile: state.userProfile
})

export const mapDispatchToProps = dispatch => ({
  feedBackSend: (poll)=> dispatch(feedBackSend(poll))
})

    
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(FeedBackPage);

