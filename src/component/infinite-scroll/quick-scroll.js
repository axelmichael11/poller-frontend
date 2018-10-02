import React from 'react'
import {  compose, branch, renderComponent} from 'recompose'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
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