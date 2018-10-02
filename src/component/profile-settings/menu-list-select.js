import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {recompose, compose} from 'recompose'
import {ageValidation} from '../../lib/util.js'

import country_list from '../../lib/countries.js'
import profession_list from '../../lib/professions.js'
import ethnicity_list from '../../lib/ethnicities.js'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {DialogTitle,
Dialog,
DialogActions,
DialogContent,
DialogContentText,
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
MoreVertIcon,
Avatar,
TextField,
Toolbar,
FormControlLabel,
List,
ListItem,
ListItemText,
Menu} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'


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


const MenuListSelect = ({list, listTitle, handleOpenList, selectedItem, anchorEl, handleCloseList,  classes, theme, renderMenuItems, changeListValue })=> {
      return (
      <CardContent>
        <Toolbar 
        className={classes.cardContent}
        >
            <Typography variant="subheading" component="h3" style={{width:'40%' }} >
                {listTitle}
            </Typography>
        <div className={classes.listContainer}>
         <List component="nav">
      <ListItem
        button
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="When device is locked"
        onClick={handleOpenList}
        className={classes.listItem}
      >
          <ListItemText primary={selectedItem}/>
        <DropDownArrowIcon/>

      </ListItem>
    </List>
    <Menu
      id="lock-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseList}
      PaperProps={{
        style: {
          maxHeight: 48 * 4.5,
          maxWidth: 300,
        },
      }}
    >
      <MenuItem
      value={null}
      style={{...classes.text}}
      onClick={event => changeListValue(null)}
      >
        I don't wish to answer
      </MenuItem>
      {renderMenuItems(list, changeListValue)}
    </Menu>
    </div>
    </Toolbar>
    </CardContent>
    )
}


MenuListSelect.propTypes = {
  list: PropTypes.object.isRequired,
  listTitle: PropTypes.string.isRequired,
  handleOpenList: PropTypes.func.isRequired,
  changeListValue: PropTypes.func.isRequired, 
  selectedItem: PropTypes.string.isRequired,
  handleCloseList: PropTypes.func.isRequired,
  renderMenuItems: PropTypes.func.isRequired
};


export default compose(
  withStyles(styles, {withTheme:true}),
)(MenuListSelect);