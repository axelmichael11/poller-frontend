
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {Route, Switch} from 'react-router-dom'

import ExplorePage from '../explore-page'
import ProfilePage from '../profile-settings'
import PollCreatePage from '../poll-create'
import PollLandingContainer from '../poll-landing-container'
import LoginPage from '../login'

import PrivateRoute from '../app/privateroute'
import ContactPage from '../contact-page'
import FeedBackPage from '../feedback-page'

import {
  profileFetch,
} from '../../action/profile-actions.js'



class LandingContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <NavBar/>
         <Switch>
          <Route  path="/settings" component={ProfilePage}/>
          <Route  path="/explore" component={ExplorePage}/>
          <Route path="/pollcreate" component={PollCreatePage}/>
          <Route path='/poll/:author_username/:created_at' component={PollLandingContainer}/>
          <Route path="/contact" component={ContactPage}/>
          <Route  path="/" component={ExplorePage}/>
        </Switch>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile
  })
  
  export const mapDispatchToProps = dispatch => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer)