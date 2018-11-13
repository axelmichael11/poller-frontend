//packages
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {recompose, compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';

import {castVote} from '../../action/vote-actions'
import {loadingOff} from '../../action/loading-actions'
import {deletePollFromPublic} from '../../action/public-poll-actions.js'
import {reportPoll} from '../../action/report-poll-actions'
import subjects_list from '../../lib/poll-subjects'
import LoadingHOC from '../loading/loadingHOC.js'
import ProfileCategory from './profile-category'
import CardMenu from '../card-menu'
import ResponsiveDialog from '../dialog'
import {MCVoteButton, YNVoteButton} from './vote-buttons'
import AnswerCardCase from '../poll-card-design/answer-card-case'
//Methods

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...



//Style

import {Dialog,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle,
InputLabel,
Button,
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
List,
ListItem,
ListItemText,
Menu,
ListItemIcon} from '@material-ui/core'

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'
import NotInterested from '@material-ui/icons/NotInterested';


const styles = theme =>({
  container: theme.overrides.MuiPaper,
  text: theme.typography.text,
  
  voteButton: theme.uniqueStyles.MuiVoteButton,
  cardHeader:theme.overrides.PollCard.cardHeader,
  stretchedButtons: theme.uniqueStyles.dialogStretchedButtons,
  button:theme.overrides.MuiButton,
})


const SubmitButton = ({...props}) =>{
  return (
    <div 
    // className={props.classes.buttonContainer}
    >
      <Button 
      variant="outlined"
      onClick={props.submitClick} 
      className={props.classes.button}
      >
      {props.buttonTitle}
      </Button>
    </div>
  )
}

const FeedBackSubmitButton = LoadingHOC(SubmitButton)


class PollVotePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openVoteConfirmAlert:false,
      vote:null,
      //loading
      castVoteLoad: false,
      dialogLoading:false,

      //dialog
      dialogOpen: false,
      dialogTitle:'',
      dialogSubmitText:'',
      dialogContent:'',
      dialogSubmitClick: null,
      dialogLoading:false,

       //report dialog
       reportPollSuccessSnack: false,
       reportPollErrorSnack: false,
       reportTitle:'Report This poll?',
       reportContent:"Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :(",
       submitReportText:'Report Poll',
       reportContentSuccess:'This poll has been reported... we will review this',
       reportContentError: 'There was an error reporting this ... try again later',
       snackBarDuration:4000,

       //submit vote dialog
       submitVoteTitle:"Are you sure?",
       submitVoteText:'Submit Vote',
       submitVoteContentSuccess:'This poll has been submitVoteed... we will review this',
       submitVoteContentError: 'There was an error submitting your vote... try again later',
       submitVoteError:false,


       //vote dialog
      anchorEl:null,
      pollMenuFocus:null,
      snackBarDuration: 4000,

      //poll has been deleted...
      pollNotFoundMessage:'It appears that this poll has recently been deleted! Log out or return to the explore page',
      pollNotFound:false,
      answerLabels: this.props.answerLabels,
    }
    this.handleConfirmYesVoteAlert = this.handleConfirmYesVoteAlert.bind(this)
    this.handleSubmitVote = this.handleSubmitVote.bind(this)
    this.handleCancelVote = this.handleCancelVote.bind(this)
    this.handleConfirmNoVoteAlert = this.handleConfirmNoVoteAlert.bind(this)
    this.renderMenuButtons = this.renderMenuButtons.bind(this)
    this.handleCloseCardMenu = this.handleCloseCardMenu.bind(this)
    this.setPoll = this.setPoll.bind(this)
    this.handleOpenCardMenu = this.handleOpenCardMenu.bind(this)
    this.handlePollNotFoundError = this.handlePollNotFoundError.bind(this)
    this.handleReportSuccess = this.handleReportSuccess.bind(this)
    this.handleReportError = this.handleReportError.bind(this)
    this.reportPoll = this.reportPoll.bind(this)
    this.openReportDialog = this.openReportDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.renderReportDialogContent = this.renderReportDialogContent.bind(this) 
    this.openSubmitVoteDialog = this.openSubmitVoteDialog.bind(this)
    this.renderSubmitVoteDialogContent = this.renderSubmitVoteDialogContent.bind(this)
    this.handleSubmitVoteError = this.handleSubmitVoteError.bind(this)
    this.handleConfirmVoteChange = this.handleConfirmVoteChange.bind(this)
  }

  handleConfirmVoteChange(value){
    // e.persist()
    console.log('clicking button value!!',value);
    this.setState((oldState)=>{
      return {
        vote: value,
      }
    });
    this.openSubmitVoteDialog()
  }


  handleConfirmYesVoteAlert(e){
    console.log('clicking button value!!', e.target);
    this.setState((oldState)=>{
      return {
        vote:"yes",
      }
    });
    this.openSubmitVoteDialog()
  }

  handleConfirmNoVoteAlert(){
    this.setState((oldState)=>{
      return {
        vote:"no",
      }
    });
    this.openSubmitVoteDialog()
  }

  handleCancelVote(){
    this.setState({
      vote:null,
      dialogOpen: false,
    })
  }




  handleSubmitVote(){
    let {vote} = this.state
    let voteData = Object.assign({}, {...this.props.userProfile, ...this.props.location.state, vote})
    console.log('VOTE DATA', voteData)
    this.setState({dialogLoading:true})
    this.props.castVote(voteData)
    .then((result)=>{
      if (result.status==200){
        this.setState({dialogLoading:false, submitVoteError:false})
        this.props.successOnCastVote(result)
      }
    })
    .catch(err=>{
      if (err.status===404){
        this.setState({dialogLoading:false, pollNotFound:true,})
        this.props.deletePollFromPublic(this.props.location.state)
      }
      if (err.status===500){
        this.setState({dialogLoading:false, submitVoteError:true, pollNotFound:true,})
        this.props.throwGeneralError()
      } else {
        this.setState({dialogLoading:false, submitVoteError:true })
      }
    })
  }

  
  renderMenuButtons(){
    return (
      <MenuItem onClick={this.openReportDialog} className={this.props.classes.menuItem}
      >
        <ListItemIcon style={{display:'inline-block'}}>
            <NotInterested />
          </ListItemIcon>
        <ListItemText style={{display:'inline-block'}} inset primary="Report Poll" />
      </MenuItem>
    )
  }

  handleCloseCardMenu(){
    this.setState({ anchorEl: null, reportDialog: false, pollMenuFocus:null });
  };

    
  setPoll(poll){
    this.setState({pollMenuFocus: poll})
  }

  handleOpenCardMenu(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePollNotFoundError(){
    this.setState((oldState)=>{
      return {
        pollNotFound: !oldState.pollNotFound,
      }
    });
  }

  reportPoll(){
    this.setState({ dialogLoading: true });
    this.props.reportPoll(this.state.pollMenuFocus)
    .then((res)=>{
        if (res.status===200){
         this.handleReportSuccess()
        }
      })
    .catch((err)=>{
        this.handleReportError()
      })
  }

  
handleReportSuccess(){
  this.setState((oldState)=> {
      return {
        reportPollErrorSnack: false,
        reportPollSuccessSnack: !oldState.reportPollSuccessSnack,
        dialogOpen: false,
        dialogLoading:false,
      }
    })
  }

  handleReportError(){
    this.setState((oldState)=> {
      return {
        reportPollSuccessSnack:false,
        reportPollErrorSnack: !oldState.reportPollErrorSnack,
        dialogOpen: false,
        dialogLoading:false,
      }
    })
  }

  
  openReportDialog(poll){
    this.setState({
      dialogSubmitButton: this.reportPoll,
      dialogTitle: this.state.reportTitle,
      dialogContent: this.renderReportDialogContent(),
      dialogSubmitText: this.state.submitReportText,
      dialogSubmitClick: 'report',
      dialogOpen: true,
      anchorEl:null,
    })
  }

  openSubmitVoteDialog(){
    this.setState({
      dialogSubmitButton: this.handleSubmitVote,
      dialogTitle: this.state.submitVoteTitle,
      dialogContent: this.renderSubmitVoteDialogContent(),
      dialogSubmitText: this.state.submitVoteText,
      dialogSubmitClick: 'submitVote',
      dialogOpen: true,
      anchorEl:null,
    })
  }

  
  handleCloseDialog(){
    this.setState({
      dialogOpen:false,
      dialogTitle:'',
      dialogContent:null,
      dialogSubmitText:'',
      dialogSubmitClick:null,
    })
  }
  renderSubmitVoteDialogContent(){
    return (
      <div>
      <DialogContentText id="alert-dialog-description">
      You are about to submit this demographic information for the question!
      </DialogContentText>
      <ProfileCategory/>
      </div>
    )
  }
  renderReportDialogContent(){
    <div>
      <DialogContentText id="alert-dialog-description">
      Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :(
      </DialogContentText>
      </div>
  }

  throwError(){
    this.setState({dialogLoading: false, reportPollErrorSnack:true})
  }
  
  handleSubmitVoteError(){
    this.setState({dialogLoading: false, submitVoteError:true})
  }

  render() {
    let {classes} = this.props
    let poll = this.props.location.state
    console.log('POLL INFO', poll)
    return (
      <div>
         <CardMenu
            anchorEl={this.state.anchorEl}
            renderMenuButtons={this.renderMenuButtons}
            handleClose={this.handleCloseCardMenu}
          />

        <Paper square elevation={2} className={this.props.classes.container}>
                    <Card style={{padding:7}}>
                    <div style={{width:'10%', textAlign:'right', float:'right'}}>
                    <IconButton
                      onClick={(event)=> {
                        this.handleOpenCardMenu(event)
                        this.setPoll(poll)
                      }}>
                    <MoreVertIcon 
      style={{color:'#000'}}
      />
      </IconButton>
                    </div>
          <CardContent>
            <Typography variant="subheading" component="p" style={{width:'50%'}}>
                      {poll.author_username}:
            </Typography>
          </CardContent>
          <CardContent>
              <Typography variant="display3" style={{textAlign:'center'}}>
                  {poll.question}
              </Typography>
          </CardContent>

          <CardContent>
            {poll.type=='MC' && Object.keys(poll.categories).map((category, key)=>
              <div key={key}>
                <MCVoteButton 
                handleVoteClick={this.handleConfirmVoteChange} 
                optionChoice={category} 
                voteButtonText={poll.categories[category]} 
                voteValue={category}/>
              </div>
            )}
            {poll.type=='YN' && Object.keys(poll.categories).map((category, key)=>
              <div key={key}>
                <YNVoteButton 
                handleVoteClick={this.handleConfirmVoteChange} 
                optionChoice={category} 
                voteButtonText={poll.categories[category]} 
                voteValue={category}/>
              </div>
            )}
          </CardContent>

          <CardContent>
            <Typography variant="subheading">
                    {subjects_list[poll.subject]}
                </Typography>
            {/* <Typography variant="subheading">
                    Poll Expiration: {poll.expiration} hours
            </Typography> */}
          </CardContent>
        </Card>
      </Paper>

        <ResponsiveDialog
          dialogTitle={this.state.dialogTitle}
          dialogContent={this.state.dialogContent}
          dialogOpen={this.state.dialogOpen}
          handleClose={this.handleCloseDialog}
          dialogSubmitText={this.state.dialogSubmitText}
          submitClick={this.state.dialogSubmitClick==='report'? this.reportPoll: this.handleSubmitVote }
          submitLoading={this.state.dialogLoading}
          timeError={this.state.dialogSubmitClick==='report'? this.handleReportError : this.handleSubmitVoteError}
        />


         <Snackbar
          open={this.state.pollNotFound}
          message={this.state.pollNotFoundMessage}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handlePollNotFoundError}
        />
        <Snackbar
          open={this.state.reportPollSuccessSnack}
          message={this.state.reportContentSuccess}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleReportPollSuccess}
        />
        <Snackbar
          open={this.state.reportPollErrorSnack}
          message={this.state.reportContentError}
          action={null}
          autoHideDuration={this.state.snackBarDuration}
          onClose={this.handleReportError}
        />

        <Snackbar
           open={this.state.submitVoteError}
           message={this.state.submitVoteContentError}
           action={null}
           autoHideDuration={this.state.snackBarDuration}
           onClose={this.handleSubmitVoteError}
        />

      </div>
      )
    }
  }

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  userProfile: state.userProfile
})

export const mapDispatchToProps = dispatch => ({
    fetchVoteHistory: (poll) => dispatch(fetchVoteHistory(poll)),
    castVote: (voteData) => dispatch(castVote(voteData)),
    reportPoll: (poll) => dispatch(reportPoll(poll)),
    deletePollFromPublic: (poll)=> dispatch(deletePollFromPublic(poll))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
withStyles(styles, {withTheme:true}),
withRouter,
)(PollVotePage);