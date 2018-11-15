import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {compose} from 'recompose'
import MaterialStyles from '../../style/material-ui-style'
import {
  Button,
  Paper,
  Typography  
} from '@material-ui/core';


import Face from '@material-ui/icons/face'
import { withStyles } from '@material-ui/core/styles';
import NavigateGettingStartedButton from '../getting-started-button'


const styles = theme=> ({
  contentMargin: theme.uniqueStyles.contentMargin,
  container: theme.overrides.MuiPaper,
  title: theme.uniqueStyles.loginTitle,
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
      <div className={classes.contentMargin}>
          <Paper elevation={2} className={classes.container}
          style={{marginTop: '3em'}}
          >
            <p className={classes.loginTitle}>Poller</p>
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
