import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose, branch, renderComponent} from 'recompose'
import _ from 'lodash'
import {fetchPolls} from '../../action/public-poll-actions.js'
import LoginPage from '../login'
import PublicPollCard from '../poll-card-design/public-poll-card.js'
import Loader from '../loading/loader'
import Error from '../error'
import ResponsiveDialog from '../dialog'
import NoPolls from './no-polls'
import LoadingHOC from '../loading/loadingHOC.js'
import MaxPolls from './max-polls'

import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import NotInterested from '@material-ui/icons/NotInterested';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const styles = (theme) =>({
  button:theme.overrides.MuiButton,
})

const List = ({ ...props }) => {
  let pollList = Object.keys(props.list)
  return(
    <div className="list">
    {pollList.map((poll, key) => 
      <div className="list-row" key={key}>
        <PublicPollCard
          pollActions={<IconButton
            onClick={(event)=> {
              props.handleOpenCardMenu(event)
              props.setPoll(poll)
            }}>
            <MoreVertIcon 
            style={{color:'#fff'}}
            />
            </IconButton>}
          poll={props.list[poll]}
          key={key}
        />
      </div>)}
      {null}
  </div>
  )
}

const withError = (conditionFn)  => (Component) => (props) => {
  return (
  <div>
        <Component {...props} />

    <div className="interactions">
      {
        conditionFn(props) &&
        <div>
          <Error {...props}/>
        </div>
      }
    </div>
  </div>
  )
}

const withLoading = (conditionFn) => (Component) => (props) => {
  return(
    <div>
    <Component {...props} />

    <div className="interactions">
    {conditionFn(props) && <Loader start={Date.now()} timeError={props.throwError}/>}
    </div>
  </div>
  )
}

const withNoPolls  = (conditionFn) => (Component) => (props) => {
  return (
    <div>
      <Component {...props} />
      <div>
      { conditionFn(props) && <NoPolls {...props}/>}
      </div>
    </div>
   )
}

const withInfiniteScroll =(conditionFn) => (Component) => 
  class WithInfiniteScroll extends React.Component {
       constructor(props) {
          super(props);
          this.state={
          }
          this.onScroll = this.onScroll.bind(this);
        } 

        onScroll(){
          console.log('HITTING INFINITE SCROLL', conditionFn(this.props), )
          if (conditionFn(this.props)){
            let debounced = _.debounce(()=>this.props.fetchPolls(), 800)
            debounced()
          }
        }

        render() {
          return (
          <div>
          <Component {...this.props} />
          {this.onScroll()}
          </div>
          )
        }
      }

  const withMaxPublicPolls = (conditionFn) => (Component) => (props) =>
    <div>
      <Component {...props} />
      <div>
      { conditionFn(props) && <MaxPolls {...props}/>}
      </div>
    </div>


//additional props
 const mapStateToProps = state => ({
  noPolls:state.noPolls,
  loggedIn: state.loggedIn,
  publicPolls: state.publicPolls,
  maxPublicPolls: state.maxPublicPolls
})

 const mapDispatchToProps = dispatch => ({
})


//conditions
const infiniteScrollCondition = props =>
(window.innerHeight + window.pageYOffset) > (document.body.offsetHeight+15)
&&  Object.keys(props.list).length !== 0 
&& !props.maxPublicPolls
&& props.list
&& !props.Loading
&& !props.error;

const loadingCondition = props =>
props.Loading;

const errorCondition = props =>
 !props.Loading 
 && props.error;

 const noPollsCondition = props =>
 Object.keys(props.list).length === 0 
 && !props.Loading 
 && !props.error;

 const maxPublicPollsCondition = props =>
props.maxPublicPolls
&& Object.keys(props.list).length > 0 
 && !props.Loading && !props.error ;

  const AdvancedList = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withError(errorCondition),
    withInfiniteScroll(infiniteScrollCondition),
    withMaxPublicPolls(maxPublicPollsCondition),
    withNoPolls(noPollsCondition),
    withLoading(loadingCondition),
  )(List);


  export default AdvancedList

