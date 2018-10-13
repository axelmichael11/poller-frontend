import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames';
import PropTypes from 'prop-types';import {compose, withContext} from 'recompose'

import {
  pollsFetch,
  pollDelete,
  pollSend,
  } from '../../action/user-polls-actions.js'
  import LoadingHOC from '../loading/loadingHOC.js'
  import SubmitButton from '../loading/button.js'
  import MyPolls from '../my-polls'
  import HelpTab from '../help-feature'

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
InputAdornment,
withTheme} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import SubjectAndQuestionForm from './subject-and-question-form'

const FeedBackSubmitButton = LoadingHOC(SubmitButton)


  const styles = theme => ({
    
  });
  
class YesNoForm extends React.Component {
  constructor(props) {
        super(props)
        this.state = {

        }
    }
    render(){
      const {classes} = this.props;
        return (
            <div>
            <SubjectAndQuestionForm {...this.props}/>
            <Divider/>
            <CardContent className={classes.container}>
              <FeedBackSubmitButton
                submitClick={this.props.handleYesNoPollSubmit}
                buttonTitle={'Create Yes/No Poll'}
                Loading={this.props.pollCreateLoad}
                timeError={this.props.handleUnknownError}
                loadingError={this.props.openPollCreateError}
                loadingErrorMessage={this.props.pollCreateErrorMessage}
                handleLoadingError={this.props.handlePollCreateError}
              />
            </CardContent>
            </div>
        )
    }
}

export default  compose(
  withStyles(styles, {withTheme:true})
)(YesNoForm)
