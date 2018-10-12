
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose, branch, renderComponent } from 'recompose'
import _ from 'lodash'


import {fetchPolls} from '../../action/public-poll-actions.js'

import PollVotePage from './poll-vote'
import YNPollResults from './yes-no-poll-results'
import MCPollResults from './multiple-choice-poll-results'

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
          {conditionFn(props) && <YNPollResults {...props}/>}
          </div>
         )
  }


  class RenderVotePage extends React.Component {
    constructor(props){
        super(props)
        this.state ={};

        this.renderVotePage = this.renderVotePage.bind(this)
    }

    renderVotePage(){
        if (this.props.alreadyVoted){
            console.log('HITTING ALREADY VOTED')
            return <YNPollResults {...this.props}/>
        } else {
          return <PollVotePage {...this.props}/>
        }
    }
    render(){
        return(
            <div>
                {this.renderVotePage()}
                {null}
            </div>
        )
    }
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
      && props.pollData.type =='YN'
      && !props.Loading
      && !props.error,
      renderComponent(YNPollResults)
  ),
  branch(
    (props) =>
    props.alreadyVoted
    && props.pollData.type =='MC'
    && !props.Loading
    && !props.error,
    renderComponent(MCPollResults)
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