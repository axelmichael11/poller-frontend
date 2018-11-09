
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom'
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme =>({
  button: theme.overrides.MuiButton,
  menuItem: theme.overrides.MuiMenuItem,
})
class NavigateGettingStartedButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.navigateGettingStartedPage = this.navigateGettingStartedPage.bind(this)
  }

  navigateGettingStartedPage(){
      this.props.history.push('/gettingstarted')
  }

  render() {
    let {classes} = this.props
    return (
      <div className={classes.container}>
        <Button onClick={this.navigateGettingStartedPage} className={classes.button}>What is this?</Button>

      </div>
    )
  }
}
export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
  })
  
  NavigateGettingStartedButton.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true})
)(NavigateGettingStartedButton)