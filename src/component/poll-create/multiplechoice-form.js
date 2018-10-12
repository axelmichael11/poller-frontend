import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import PropTypes from 'prop-types';import {compose, withContext} from 'recompose'


  import { withStyles } from '@material-ui/core/styles';
  import {CardContent, Divider } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import LoadingHOC from '../loading/loadingHOC.js'
import poll_subjects from '../../lib/poll-subjects'
import SubjectAndQuestionForm from './subject-and-question-form'
import RenderAnswerSubmit from './render-answer-options'
import SubmitButton from '../loading/button.js'


const FeedBackSubmitButton = LoadingHOC(SubmitButton)


  const styles = theme => ({
    
  });
  
class MultipleChoiceForm extends React.Component {
  constructor(props) {
        super(props)
        this.state = {

        }
    }
    render(){
      const {classes} = this.props;
        return (
            <div>

            <Divider/>
            <SubjectAndQuestionForm {...this.props}/>
            <Divider/>
            <RenderAnswerSubmit {...this.props}/>
           
            {/* <CardContent className={classes.container}> */}
              <FeedBackSubmitButton
                submitClick={this.props.handleMultipleChoicePollSubmit}
                buttonTitle={'Create Multiple Choice Poll'}
                Loading={this.props.pollCreateLoad}
                timeError={this.props.handleUnknownError}
                loadingError={this.props.openPollCreateError}
                loadingErrorMessage={this.props.pollCreateErrorMessage}
                handleLoadingError={this.props.handlePollCreateError}
              />
            {/* </CardContent> */}
            </div>
        )
    }
}

export default  compose(
  withStyles(styles, {withTheme:true})
)(MultipleChoiceForm)
