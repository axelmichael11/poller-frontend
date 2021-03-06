
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import {  compose } from 'recompose'
import {loadingOn, loadingOff} from '../../action/loading-actions'




import IconButton from '@material-ui/core/IconButton';


import EmailIcon from '@material-ui/icons/email'
import AccountIcon from '@material-ui/icons/accountbox'
import CreateIcon from '@material-ui/icons/create'


import {Paper,
 Typography,
 Button} from '@material-ui/core'
import FeedBackPage from '../feedback-page'


const styles = theme =>({
  contentMargin: theme.uniqueStyles.contentMargin,
  container:theme.overrides.MuiPaper,
  button: theme.overrides.MuiButton,
  icon:{
    color: theme.palette.primary.main,
    // backgroundColor: theme.palette.secondary.main,
  }
})

class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  

  render() {
    const {classes} = this.props;

    return (
        <div className={classes.contentMargin}>
          <Paper square elevation={2} className={classes.container}>
          <Typography variant="display4" style={{textAlign:'center'}}>
            Contact          
          </Typography>
                <a href='https://github.com/axelmichael11/poller' id='source-code-link' style={{textDecoration:'none'}}>
                <Button 
                variant="outlined"
                className={classes.button}
                style={{marginTop:50, marginBottom:50}}
                >
                SOURCE CODE                
                </Button>
                </a>

              <Typography variant="headline" >
                Michael Axelson
              </Typography>

              <div className="contact-menu" style={{textAlign:'center'}}>
              
                <IconButton>
                <a href="mailto:axelmichael11@gmail.com">
                  <EmailIcon className={classes.icon}/>
                </a>
                </IconButton>
                <IconButton>
                <a href="https://www.linkedin.com/in/michael-axelson-80620389/">
                  <AccountIcon className={classes.icon}/>
                </a>
                </IconButton>
                <IconButton>
                <a href="https://github.com/axelmichael11">
                  <CreateIcon className={classes.icon}/>
                </a>
                </IconButton>
              </div>
          </Paper>
          <FeedBackPage/>
        </div>
      )
    }
  }


    
export default compose(
  withStyles(styles, {withTheme:true}),
)(ContactPage);

