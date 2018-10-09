
import React from 'react'
import {compose, branch, renderComponent} from 'recompose'
import Error from '../error'
import Loader from '../loading/loader'
import { withStyles } from '@material-ui/core/styles';


import ProfileSettings from './profile-settings'
import NoProfile from './no-profile'


const displayProfile = ({...props}) => props.userProfile ? <ProfileSettings/> :null;



const WithLoading = (props) => {
  console.log('HITTING WITH LODAING')
  return (
    <div>
      <Loader start={Date.now()} timeError={props.timeError}/>
    </div>
  )
}

const withProfileCondition = props =>
props.userProfile;

const RenderProfile = compose(
  branch(
    (props)=>props.Loading && !props.error,
    renderComponent(WithLoading)
  ),
  branch(
    props =>
    !props.Loading && props.error,
    renderComponent(Error)
  ),
  // withProfile(withProfileCondition)
)(displayProfile);

export default RenderProfile







