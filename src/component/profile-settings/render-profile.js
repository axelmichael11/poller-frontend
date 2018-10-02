
import React from 'react'
import {compose, branch, renderComponent} from 'recompose'
import Error from '../error'
import Loader from '../loading/loader'
import { withStyles } from '@material-ui/core/styles';


import ProfileSettings from './profile-settings'
const styles = theme => ({
  container: theme.overrides.MuiPaper,
  ageSelect:{
    marginLeft: 15,
  },
  button: theme.overrides.MuiButton,
 
  text: theme.typography.text,
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    display: 'flex',
  },
  expandMoreIcon:{
    colorPrimary: theme.palette.secondary.main
  },

  cardHeader:theme.overrides.PollCard.cardHeader,
  cardContent:theme.overrides.PollCard.cardContent,
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  pollActions: theme.overrides.PollCard.pollActions,
});


const WithLoading = (props) => {
  return (
    <div>
      <Loader start={Date.now()} timeError={props.timeError}/>
    </div>
  )
}


const RenderProfile = compose(
  withStyles(styles, {withTheme:true}),
  branch(
    (props)=>props.Loading && !props.error,
    renderComponent(WithLoading)
  ),
  branch(
    props =>
    !props.Loading && props.error,
    renderComponent(Error)
  ),
)(ProfileSettings);

export default RenderProfile







