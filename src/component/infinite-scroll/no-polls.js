import React from 'react'
import {  compose, branch, renderComponent} from 'recompose'

import {Typography, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/cancel'



const styles = theme => ({
  container: theme.overrides.MuiPaper,
  button:theme.overrides.MuiButton
})


 const NoPolls = ({...props}) => {
      return(
        <div style={{textAlign:'center'}}>
            <CancelIcon style={{fontSize:40}}/>
            <Typography variant="headline">
            No Polls Listed...
                </Typography>
                <Button 
                variant="outlined"
                onClick={props.fetchPolls} 
                className={props.classes.button}
                style={{marginTop:10}}
                >
                SEARCH FOR MORE POLLS
                </Button>
    </div>
      )
}


export default  compose(
  withStyles(styles, {withTheme:true})
)(NoPolls)