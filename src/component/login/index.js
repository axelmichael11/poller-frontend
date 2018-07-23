import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {compose} from 'recompose'
import MaterialStyles from '../../style/material-ui-style'
import Button from '@material-ui/core/Button';


import Face from '@material-ui/icons/face'
// import SpeakerNotes from '@material-ui/icons/speaker-notes'
// import Assessment from '@material-ui/icons/assessment'
// import SwapVert from '@material-ui/icons/swap-vert'


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


import NavigateGettingStartedButton from '../getting-started-button'

import '../../style/index.scss'

const styles = theme=> ({
  container: theme.overrides.MuiPaper,
 
})
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.login = this.login.bind(this)
  }

  login() {
    this.props.login();
  }

  render() {
    let {classes, theme} = this.props;
    
    return (
      <div>
          <Paper elevation={2} className={classes.container}>
            <p id="title">Poller</p>
            <NavigateGettingStartedButton/>
          </Paper>
          <Button
            variant="outlined"
            onClick={this.props.login} 
            className={classes.button}
            style={{marginTop:15}}>
            SIGNUP / LOGIN
         </Button>
      </div>
    )
  }
}


LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default compose(
  // These are both single-argument HOCs

  withStyles(MaterialStyles, {withTheme:true})
)(LoginPage)
