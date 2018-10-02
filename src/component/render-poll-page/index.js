
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose, branch, renderComponent } from 'recompose'
import _ from 'lodash'


import {fetchPolls} from '../../action/public-poll-actions.js'
import LoginPage from '../login'
import PublicPoll from '../public-poll-card'


import PollVotePage from '../poll-vote-page'
import PollResultsPage from '../poll-results-page'
import Loader from '../loading/loader'
import Error from '../error'



const withError = (conditionFn) => (Component) => (props) =>{
  return(
  <div>
    <Component {...props} />

    <div className="interactions">
      {
        conditionFn(props) &&
        <div>
          <Error/>
        </div>
      }
    </div>
  </div>
  )
}


const withLoading = (conditionFn) =>  (Component) => (props) => {
  return(
    <div>
    <Component {...props} />

    <div className="interactions">
    <Component {...props}/>
      {conditionFn(props) && <Loader start={Date.now()} timeError={props.throwError}/>}
    </div>
  </div>
  )
}

const renderVotePage =(conditionFn) =>  (Component) => (props) => {
      return (
          <div>
              <Component {...props}/>
          {conditionFn(props) && <PollVotePage {...props}/>}
          </div>
         )
  }

  const renderVoteResults =(conditionFn) => (Component) =>  (props) => {
      return (
          <div>
            <Component {...props}/>
          {conditionFn(props) && <PollResultsPage {...props}/>}
          </div>
         )
  }


  const notYetVotedCondition = props =>
  props.alreadyVoted===false
  && props.pollData===null
  && !props.Loading
  && !props.error;

  
  const alreadyVotedCondition = props =>
  props.alreadyVoted
  && props.pollData
  && !props.Loading
  && !props.error

  const loadingCondition = props =>
  props.Loading && !props.error;

  const withErrorCondition = props =>
   !props.Loading && props.error;




  const RenderPollPage = compose(
    branch(
      (props)=>props.Loading,
      renderComponent(Loader)
  ),
  branch(
      (props) =>
      props.alreadyVoted
      && props.pollData
      && !props.Loading
      && !props.error,
      renderComponent(PollResultsPage)
  ),
  branch(
    props =>
    !props.alreadyVoted
    && !props.pollData
    && !props.Loading
    && !props.error,
      renderComponent(PollVotePage)
  )
  )(Error);

export default RenderPollPage