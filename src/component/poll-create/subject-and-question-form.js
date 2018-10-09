import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {recompose, compose} from 'recompose'
import {ageValidation} from '../../lib/util.js'
import poll_subjects from '../../lib/poll-subjects'




import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {Dialog,
 DialogActions,
 DialogContent,
 DialogContentText,
 DialogTitle,
 InputLabel,
 Input,
 MenuItem,
 FormControl,
 Select,
 Divider,
 Paper,
 Typography,
 Checkbox,
 Card,
 CardActions,
 CardContent,
 CardHeader,
 CardMedia,
 MenuList,
 Snackbar,
 IconButton,
 Collapse,
 Avatar,
 TextField,
 Toolbar,
 FormControlLabel,
 List,
 ListItem,
 ListItemText,
Menu} from '@material-ui/core';


import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'


import country_list from '../../lib/countries.js'
import profession_list from '../../lib/professions.js'
import ethnicity_list from '../../lib/ethnicities.js'



const styles = theme => ({
    container: theme.overrides.MuiPaper,
  ageSelect:{
    marginLeft: 15,
  },
  cardContent:theme.overrides.PollCard.cardContent,
  text: theme.typography.text,

  listContainer: theme.overrides.MuiListItem.container,
  listItem:theme.overrides.MuiListItem,
  // listTitle: theme.overrides.MuiListItem.title,
})


const SubjectAndQuestionForm = ({...props})=> {
  const {classes} = props;
      return (
        <div>
      <CardContent>
        <Toolbar 
        className={classes.cardContent}
        >
          <Typography variant="subheading" component="h3" style={{width:'40%' }} >
              Subject
          </Typography>
        <div className={classes.listContainer}>
         <List component="nav">
      <ListItem
        button
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="When device is locked"
        onClick={props.handleOpenPollSubjectList}
        className={classes.listItem}
      >
          <ListItemText primary={
            props.pollSubject!==null ? 
            poll_subjects[props.pollSubject] : ''
          }/>
        <DropDownArrowIcon/>

      </ListItem>
    </List>
    <Menu
      id="lock-menu"
      anchorEl={props.pollSubjectAnchor}
      open={Boolean(props.pollSubjectAnchor)}
      onClose={props.handleClosePollSubjectList}
      PaperProps={{
        style: {
          maxHeight: 48 * 4.5,
          maxWidth: 300,
        },
      }}>
      {props.renderMenuItems(poll_subjects, props.handlePollSubjectChange)}
    </Menu>
    </div>
    </Toolbar>
    </CardContent>
    <Divider/>
    <CardContent className={classes.cardContent}>
    <Toolbar className={classes.cardContent}>
      <Typography variant="subheading" component="h3" style={{marginRight:15}}>
          Question
      </Typography>
      <FormControl fullWidth>
        <InputLabel >{props.questionError ? props.questionErrorText : ""}</InputLabel>
        <Input
          multiline={true}
          id="adornment-amount"
          value={props.pollQuestion}
          onChange={props.handleQuestionChange}
          rows={6}
          rowsMax="6"
        />
      </FormControl>
    </Toolbar>
  </CardContent>
  </div>)}


SubjectAndQuestionForm.propTypes = {
  handleOpenPollSubjectList: PropTypes.func.isRequired,
  handlePollSubjectChange: PropTypes.func.isRequired, 
  handleClosePollSubjectList: PropTypes.func.isRequired,
  renderMenuItems: PropTypes.func.isRequired
};


export default compose(
  withStyles(styles, {withTheme:true}),
)(SubjectAndQuestionForm);