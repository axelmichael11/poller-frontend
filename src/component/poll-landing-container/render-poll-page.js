
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose, branch, renderComponent } from 'recompose'
import _ from 'lodash'


import {fetchPolls} from '../../action/public-poll-actions.js'

import PollVotePage from './poll-vote'
import PollResultsPage from './poll-results-page'

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
  withError(withErrorCondition),
  branch(
    (props) =>
    props.alreadyVoted
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
  )(withError(withErrorCondition));

export default RenderPollPage