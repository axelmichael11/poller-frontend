import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';

import LoadingHOC from '../loading/loadingHOC.js'
import {MyPolls} from '../my-polls'

import HelpTab from '../help-feature'


import {Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 withMobileDialog,
 List,
 ListItem,
 ListItemIcon,
 ListItemText } from '@material-ui/core'


import ReportIcon from '@material-ui/icons/report'



const SubmitButton = ({...props}) =>{
  return (
    <div>
      <Button 
      variant="outlined"
      onClick={props.submitClick} 
      className={props.classes.button}>
      {props.dialogSubmitText}
      </Button>
    </div>
  )
}



const FeedBackSubmitButton = LoadingHOC(SubmitButton)

const styles = theme => ({
  dialogButtons: {
    justifyContent:'center',
    margin: '10px',
  }
  });

  

const ResponsiveDialog = ({...props}) => {
    return (
      <div>
        <Dialog
          open={props.dialogOpen}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle > {props.dialogTitle}</DialogTitle>
          <DialogContent>
            <div>
              {props.dialogContent}
            </div>
          </DialogContent>
          <DialogActions
          className={props.classes.dialogButtons}
          >
               <div className={props.classes.container}>
            <Button 
              variant="outlined"
              onClick={props.handleClose} 
              className={props.classes.button}
            >
              Cancel
            </Button>
            </div>
            <div className={props.classes.container}>

            <FeedBackSubmitButton
                classes={props.classes}
                submitClick={props.submitClick}
                dialogSubmitText={props.dialogSubmitText}
                Loading={props.submitLoading}
                timeError={props.timeError}
              />
            </div>
           
          </DialogActions>
        </Dialog>
      </div>
    );
  }

ResponsiveDialog.propTypes = {
timeError:PropTypes.func.isRequired,
dialogTitle: PropTypes.string.isRequired,
dialogSubmitText:PropTypes.string.isRequired,
dialogOpen: PropTypes.bool.isRequired,
handleClose: PropTypes.func.isRequired,
submitClick:PropTypes.func.isRequired,

};


export default compose(
    withStyles(styles)
  )(ResponsiveDialog)

