import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import {recompose, compose} from 'recompose'
import {ageValidation} from '../../lib/util.js'
import { withStyles } from '@material-ui/core/styles';


import RenderProfile from './render-profile'
import {
    profileFetch,
  } from '../../action/profile-actions.js'




const styles = theme => ({
  
})



class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        fetchProfileLoading:false,
        fetchProfileError:false,
    }
    this.handleFetchProfile = this.handleFetchProfile.bind(this)
  }
  componentDidMount(){
      this.handleFetchProfile();
  }

  handleFetchProfile(){
    if (!this.props.userProfile){
    this.setState({fetchProfileLoading:true, 
        fetchProfileError: false
    })
    this.props.profileFetch()
    .then(profile=>{
        this.setState({fetchProfileLoading:false, 
          fetchProfileError: false
      })
    })
    .catch(err=>{
        this.setState({
            fetchProfileError:true,
            fetchProfileLoading:false,
        })
    })
    console.log('DONE WITH FETCH')
    }
  }

  render() {
    let {classes, theme} = this.props
    console.log('LANDING PAGE', this.state, 'PROFILE', this.props.userProfile)
    return (
      <div>
        <RenderProfile
            Loading={this.state.fetchProfileLoading}
            userProfile={this.props.userProfile}
            loadingError={this.state.fetchProfileError}
            error={this.state.fetchProfileError}
            handleFetchProfile={this.handleFetchProfile}
            errorTry={this.handleFetchProfile}
            timeError={this.handleFetchProfile}
          />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userProfile: state.userProfile,
})

export const mapDispatchToProps = dispatch => ({
    profileFetch: ()=> dispatch(profileFetch()),
})




export default compose(
  withStyles(styles, {withTheme:true}),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfilePage)


