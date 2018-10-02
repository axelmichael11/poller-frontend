import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom'





import {Collapse,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Menu,
 Button } from '@material-ui/core'


import ArrayBackIcon from '@material-ui/icons/arrowback';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'


const styles = theme => ({
    container: theme.overrides.MuiPaper.root,
    helpBarButton:theme.uniqueStyles.helpBarButton,
    backButton: theme.uniqueStyles.backButton,
    text: {
      fontFamily:"Play",
        fontSize: 25,
        display:'inline',


    },
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
})



const Help = ({...props}) => {
  return (
  <div className={props.classes.container}>
    <Button
      size='small'
      className={props.classes.backButton}
      onClick={props.history.goBack}>
      <ArrayBackIcon/>
    </Button>
    <Button
    className={props.classes.helpBarButton}
    size='small'>
      <CardActions 
        disableActionSpacing
        onClick={props.handleHelpExpand}
        disableActionSpacing
        style={{boxSizing:'initial'}}>
        <Typography className={props.classes.text} variant="title">
          Help
        </Typography>
        
          <ExpandMoreIcon 
          className={classnames(props.classes.expand, {
            [props.classes.expandOpen]: props.helpExpanded,
          })}
          aria-expanded={props.helpExpanded}
          style={{color:'white'}}/>
      </CardActions>
      <Collapse in={props.helpExpanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography className={props.classes.text}>
            {props.helpText}
          </Typography>
        </CardContent>
      </Collapse>
    </Button>
    </div>
  )
}

Help.proptypes = {
    helpText: PropTypes.string.isRequired,
    handleHelpExpand: PropTypes.func.isRequired,
    helpExpanded: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}


const HelpTab = compose(
  withRouter,
    withStyles(styles, {withTheme:true}),
    )(Help);
    
export default HelpTab