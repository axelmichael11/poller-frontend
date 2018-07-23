
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose } from 'recompose'

import '../../style/index.scss'



import {
  pollsFetch,
  pollDelete,
  pollSend,
  } from '../../action/user-polls-actions.js'

  
  import PropTypes from 'prop-types';


  import Button from '@material-ui/core/Button';
  import { withStyles } from '@material-ui/core/styles';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogContentText from '@material-ui/core/DialogContentText';
  
  import DialogTitle from '@material-ui/core/DialogTitle';
  import InputLabel from '@material-ui/core/InputLabel';
  import Input from '@material-ui/core/Input';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';
  import Divider from '@material-ui/core/Divider';
  import Paper from '@material-ui/core/Paper';
  import Typography from '@material-ui/core/Typography';
  import Checkbox from '@material-ui/core/Checkbox';
  import Card from '@material-ui/core/Card';
  import CardActions from '@material-ui/core/CardActions';
  import CardContent from '@material-ui/core/CardContent';
  import CardHeader from '@material-ui/core/CardHeader';
  import CardMedia from '@material-ui/core/CardMedia';
  import MenuList from '@material-ui/core/MenuList';
  import Snackbar from '@material-ui/core/Snackbar';
  import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
  import IconButton from '@material-ui/core/IconButton';
  import Collapse from '@material-ui/core/Collapse';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import Avatar from '@material-ui/core/Avatar';
  import TextField from '@material-ui/core/TextField';
  import Toolbar from '@material-ui/core/Toolbar';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import LoadingHOC from '../loading/loadingHOC.js'
  import SubmitButton from '../loading/button.js'
  import {feedbackSend} from '../../action/feedback-actions'

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
      maxFeedBackReachedMessage:'You have already submitted three comments! That is the limit... Thanks for the input!',

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
    this.props.pollSend(feedBackData)
    .then((res)=>{
        if (res.status===200){
          this.handleFeedBackClear()
          this.handleFeedBackSuccess()
        } else {
          this.handleFeedBackClear()
          this.handleFeedBackSuccess()
        }
    })
    .catch(err=>{
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
    console.log('FEEDBACK STATE', this.state, this.props)
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
                <Typography variant="headline">
                    Any feedback on this application is tremendously appreciated!
                    Only Three comments can back be made for the moment.
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
  connect(mapDispatchToProps, mapStateToProps),
  withStyles(styles, {withTheme:true}),
)(FeedBackPage);

