import React from 'react'
import {  compose, branch, renderComponent} from 'recompose'



import '../../style/index.scss'

import MaterialStyles from '../../style/material-ui-style'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/cancel'
import Paper from '@material-ui/core/Paper';
import UpArrow from '@material-ui/icons/arrowupward'



const styles = theme => ({
  container: theme.overrides.MuiPaper,
  button:theme.overrides.MuiButton
})


 const QuickScroll = ({...props}) => {
      return(
        <div style={{
            textAlign:'center',
            position: 'fixed',
            top: '57px',
            width: '100%',
            zIndex: 100,
        }}>
      <Button variant="fab" color="primary" aria-label="Add">
        <UpArrow/>
      </Button>
        </div>
      )
}


export default  compose(
  withStyles(styles, {withTheme:true})
)(QuickScroll)