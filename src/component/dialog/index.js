import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReportIcon from '@material-ui/icons/report'
import LoadingHOC from '../loading/loadingHOC.js'
import {MyPolls} from '../my-polls'

import HelpTab from '../help-feature'


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
          <DialogActions>
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

