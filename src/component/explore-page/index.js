
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose } from 'recompose'

import subjects_list from '../../lib/poll-subjects'
import {getPublicPolls, fetchPublicPolls} from '../../action/public-poll-actions.js'
import {reportPoll} from '../../action/report-poll-actions'
import {handleThen} from '../../lib/util'
import {loadingOn, loadingOff} from '../../action/loading-actions'


import AdvancedList from '../infinite-scroll'
import LoginPage from '../login'
import ResponsiveDialog from '../dialog'
import CardMenu from '../card-menu'
import PollFilter from './filter.js'


import { withStyles } from '@material-ui/core';

import {MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  DialogContentText} from '@material-ui/core'

import NotInterested from '@material-ui/icons/NotInterested';


const styles = theme =>({
  button: theme.overrides.MuiButton,
  menuItem: theme.overrides.MuiMenuItem,
})

class ExplorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pollData: this.props.publicPolls,
      previousPolls:0,
      pollCount: Object.keys(this.props.publicPolls).length,
      noPolls:false,

      //filter
      explorePolls: this.props.publicPolls,
      filteredPolls:{},
      filterExpanded: false,
      categoryFilters:[],
      maxCategoryReachedError:false,
      maxCategoryReachedMessage:"You can only filter up to five categories",

      //loading
      exploreLoading:false,
      reportLoading:false,
      searchMoreLoading:false,

      exploreError: false,
      renderCount:0,
      maxPublicPolls: this.props.maxPublicPolls,

      //dialog
      dialogOpen: false,
      dialogTitle:'',
      dialogSubmitText:'',
      dialogContent:'',

      //report dialog
      reportPollSuccessSnack: false,
      reportPollErrorSnack: false,
      reportTitle:'Report This poll?',
      reportContent:"Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :(",
      submitReportText:'Report Poll',
      reportContentSuccess:'This poll has been reported... we will review this',
      reportContentError: 'There was an error reporting this ... try again later',
      snackBarDuration:4000,

      //card menu
      anchorEl: null,
      pollMenuFocus:null,

      //scroll
      scrollY : 0,
      innerHeight: 0,
      pageYOffset: 0,
      offsetHeight: 0,
    }

    this.fetchPolls = this.fetchPolls.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.openReportDialog = this.openReportDialog.bind(this);
    this.handleOpenCardMenu = this.handleOpenCardMenu.bind(this)
    this.handleCloseCardMenu = this.handleCloseCardMenu.bind(this)
    this.renderMenuButtons = this.renderMenuButtons.bind(this)
    this.reportPoll = this.reportPoll.bind(this)
    this.throwError = this.throwError.bind(this)
    this.setPoll = this.setPoll.bind(this)
    this.handleReportSuccess = this.handleReportSuccess.bind(this)
    this.handleReportError = this.handleReportError.bind(this)
    this.renderReportDialogContent = this.renderReportDialogContent.bind(this)
    this.handleFilterExpand = this.handleFilterExpand.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.deleteFilter = this.deleteFilter.bind(this)
    this.handleMaxCategory = this.handleMaxCategory.bind(this)
    this.handleClearAllCategories = this.handleClearAllCategories.bind(this)
    this.addFilter = this.addFilter.bind(this)
    this.updateScrollPosition = this.updateScrollPosition.bind(this);
  }
  componentDidMount(){
    if(Object.keys(this.props.publicPolls)== 0){
      this.fetchPolls()
    }
    // window.addEventListener('scroll', ()=>this.updateScrollPosition(), true);
  }

  updateScrollPosition(){
    this.setState({
      innerHeight: window.innerHeight,
      scrollY: window.pageYOffset,
      pageYOffset: window.pageYOffset,
      offsetHeight: document.body.offsetHeight+19
    });
    console.log('EXPLORE PAGE HITTING ON SCROLL ')
  }
  fetchPolls(){
    this.setState({exploreLoading:true, exploreError:false })
    this.props.getPublicPolls()
    .then((res)=>{
      if( res.polls.length===0){
        this.setState({
          exploreLoading:false, 
          exploreError:false,
          noPolls:true,
        })
      }
      if (res.polls.length > 0){
        this.setState({
          exploreLoading:false, 
          exploreError:false,
          noPolls:false,
        })
      }
    })
    .catch((err)=>{
      this.setState({exploreLoading:false, exploreError:true})
    })
  }

  handleCloseDialog(){
    this.setState({
      dialogOpen:false,
      dialogTitle:'',
      dialogSubmitText:'',
    })
  }


  openReportDialog(poll){
    this.setState({
      dialogTitle: this.state.reportTitle,
      // dialogContent: this.state.reportContent,
      dialogSubmitText: this.state.submitReportText,
      dialogOpen: true,
      anchorEl:null,
      dialogContent: this.renderReportDialogContent()
    })
  }
  
  handleOpenCardMenu(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseCardMenu(){
    this.setState({ anchorEl: null, reportDialog: false, pollMenuFocus:null });
  };

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


  reportPoll(){
    this.setState({ reportLoading: true });
    let pollToReport = this.props.publicPolls[this.state.pollMenuFocus]
    this.props.reportPoll(pollToReport)
    .then((res)=>{
        if (res.status===200){
         this.handleReportSuccess()
        }
      })
    .catch((err)=>{
      if (err.status===500){
        this.handleReportSuccess()
       }
      })
}

throwError(){
  this.setState({exploreLoading: false, exploreError:true})
}

setPoll(poll){
  this.setState({pollMenuFocus: poll})
}

handleReportSuccess(){
  this.setState((oldState)=> {
      return {
        reportPollErrorSnack: false,
        reportPollSuccessSnack: !oldState.reportPollSuccessSnack,
        dialogOpen: false,
        reportLoading:false,
      }
    })
  }

  handleReportError(){
    this.setState((oldState)=> {
      return {
        reportPollSuccessSnack:false,
        reportPollErrorSnack: !oldState.reportPollErrorSnack,
        dialogOpen: false,
        reportLoading:false,
      }
    })
  }
  renderReportDialogContent(){
    return (
      <div>
      <DialogContentText id="alert-dialog-description">
      Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :(
      </DialogContentText>
      </div>
    )
  }

  handleFilterChange(category){
        if (this.state.categoryFilters.includes(category)){
        this.deleteFilter(category)
        this.setState({maxCategoryReachedError:false})
        return;
      } else {
        if (this.state.categoryFilters.length ===5){
          this.handleMaxCategory()
          return;
        } else {
            this.addFilter(category)
        }
      }
  }

  handleFilterExpand(){
    this.setState({ filterExpanded: !this.state.filterExpanded });
  }

  deleteFilter(category){
    let {publicPolls} =this.props;
    let {categoryFilters} = this.state;
    let keys = Object.keys(publicPolls)
    let newFilters = categoryFilters.filter(filter=> filter!==category)

      return new Promise((resolve,reject)=>{
        let polls = {}
        newFilters.map(category=>{
          keys.map(pollKey=>{
            if (publicPolls[pollKey].subject===parseInt(category)){
              polls[pollKey]= publicPolls[pollKey]
            }
          })
        })
        resolve(polls);
      })
      .then(polls=>{
        this.setState({
          filteredPolls: polls,
          categoryFilters: newFilters,
        })
      })
      .catch(err=>console.log(err))
  }

  handleMaxCategory(){
    this.setState({maxCategoryReachedError: true})
  }

  handleClearAllCategories(){
    this.setState({
      maxCategoryReachedError: false,
      categoryFilters:[],
      filteredPolls: {},
    })
  }

  addFilter(category){
    let {publicPolls} =this.props;
    let {categoryFilters} = this.state;
    let keys = Object.keys(publicPolls)
    let newFilters = categoryFilters.concat(category);
      return new Promise((resolve,reject)=>{
        let polls = {}
        newFilters.map(category=>{
          keys.map(pollKey=>{
            if (publicPolls[pollKey].subject===parseInt(category)){
              polls[pollKey]= publicPolls[pollKey]
            }
          })
        })
        resolve(polls);
      })
      .then(polls=>{
        this.setState({
          filteredPolls: polls,
          categoryFilters: newFilters,
        })
      })
      .catch(err=>console.log(err))
  }
  


  render() {
    const {stepIndex} = this.state;
    const {classes} = this.props;
    console.log('public polls', this.props.publicPolls)
    return (
        <div id="explore-page">
          <ResponsiveDialog
                dialogTitle={this.state.dialogTitle}
                dialogContent={this.state.dialogContent}
                dialogOpen={this.state.dialogOpen}
                handleClose={this.handleCloseDialog}
                dialogSubmitText={this.state.dialogSubmitText}
                submitClick={this.reportPoll}
                submitLoading={this.state.reportLoading}
                timeError={this.handleReportError}
                />
                <CardMenu
                  anchorEl={this.state.anchorEl}
                  renderMenuButtons={this.renderMenuButtons}
                  handleClose={this.handleCloseCardMenu}
                />     
          <PollFilter
          filterExpanded={this.state.filterExpanded}
          handleFilterExpand={this.handleFilterExpand}
          handleFilterChange={this.handleFilterChange}
          categories={Object.keys(subjects_list)}
          categoryFilters={this.state.categoryFilters}
          pollFilters ={this.state.pollFilters}
          deleteFilter={this.deleteFilter}
          handleClearAllCategories={this.handleClearAllCategories}
          />

            <div>
              <div id="explore-bar-clear"></div>
            <AdvancedList
              list={this.state.categoryFilters.length > 0 ?
                this.state.filteredPolls:
                this.props.publicPolls
              }
              error={this.state.exploreError}
              Loading={this.state.exploreLoading}
              page={this.state.page}
              fetchPolls={this.fetchPolls}
              handleOpenCardMenu={this.handleOpenCardMenu}
              noPolls={this.state.noPolls}
              errorTry={this.fetchPolls}
              timeError={this.fetchPolls}
              throwError={this.throwError}
              setPoll={this.setPoll}
              pollCount={this.state.pollCount}
              maxPublicPolls={this.state.maxPublicPolls}
              innerHeight={this.state.innerHeight}
              scrollY= {this.state.scrollY}
              pageYOffset={this.state.pageYOffset}
              offsetHeight={this.state.offsetHeight}
              />
            </div>

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
                open={this.state.maxCategoryReachedError}
                message={this.state.maxCategoryReachedMessage}
                action={null}
                autoHideDuration={this.state.snackBarDuration}
                onClose={this.handleMaxCategory}
              />
        </div>
      )
    }
  }

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    publicPolls: state.publicPolls,
    maxPublicPolls: state.maxPublicPolls,
    auth0Token: state.auth0Token, 
    userProfile: state.userProfile
  })
  
  export const mapDispatchToProps = dispatch => ({
    getPublicPolls:()=>dispatch(getPublicPolls()),
    fetchPublicPolls:(poll)=> dispatch(fetchPublicPolls(poll)),
    reportPoll: (poll)=>dispatch(reportPoll(poll))
  })

    
export default compose(
  withStyles(styles, {withTheme:true}),
  connect(mapStateToProps, mapDispatchToProps),
)(ExplorePage);

