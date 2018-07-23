import React from 'react';
import {  compose } from 'recompose'
import { connect } from 'react-redux'
import classnames from 'classnames';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MenuList from '@material-ui/core/MenuList';
import Snackbar from '@material-ui/core/Snackbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import ArrayBackIcon from '@material-ui/icons/arrowback';
import Button from '@material-ui/core/Button';

import subjects_list  from '../../lib/poll-subjects'

const styles = theme => ({
    categoryCollapse:{
        container:{
            maxWidth:'300px'
        },
        wrapper:{
            maxWidth:'300px'

        },
        wrapperInner:{
            maxWidth:'300px'

        },
        entered:{
            maxWidth:'300px'
        }
    },
    selectedItem:{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
    },
    unselectedItem:{
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    },
    list:{
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 200,
    },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
    container: theme.overrides.MuiPaper.root,
    helpBarButton:theme.uniqueStyles.filterButton,
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

});

class PollFilter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chipData: [
                { key: 0, label: 'Angular' },
                { key: 1, label: 'jQuery' },
                { key: 2, label: 'Polymer' },
                { key: 3, label: 'React' },
                { key: 4, label: 'Vue.js' },
              ],
        }
    }

  handleDelete (data){
    
    this.setState(state => {
      const chipData = [...this.state.chipData];
      const chipToDelete = chipData.indexOf(data);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
  };

  render() {
    const { classes, theme } = this.props;

    return (
        <div className={classes.container}>
    <Button
    className={classes.helpBarButton}
    size='small'>
      <CardActions 
        disableActionSpacing
        onClick={this.props.handleFilterExpand}
        disableActionSpacing
        className={classes.categoryCollapse}
        style={{boxSizing:'initial'}}>
        <Typography className={classes.text} variant="title">
          Filter By Category
        </Typography>
        
          <ExpandMoreIcon 
          className={classnames(classes.expand, {
            [classes.expandOpen]: this.props.filterExpanded,
          })}
          aria-expanded={this.props.filterExpanded}
          style={{color:'white'}}/>
      </CardActions>
      <Collapse in={this.props.filterExpanded} timeout="auto" unmountOnExit className={classes.categoryCollapse}>
        <CardContent style={{maxWidth:'300px'}}>
        <List className={classes.list} style={{maxWidth:'300px'}}>
            <ListItem button
                onClick={this.props.handleClearAllCategories}>
                Clear All Filters
            </ListItem>
            {
                
            this.props.categories.map(data => (
              <ListItem
                button
                onClick={()=>this.props.handleFilterChange(data)}
                key={data}
                value={data}
                style={{
                  backgroundColor:
                    this.props.categoryFilters.includes(data)
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                    color: this.props.categoryFilters.includes(data)
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                }}
              >
                {subjects_list[data]}
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
      <div style={{maxWidth:'300px'}}>
      {
      (this.props.categoryFilters.length > 0)?
        this.props.categoryFilters.map(data => {
          return (
            <Chip
              key={data}
              label={subjects_list[data]}
              onDelete={()=> this.props.deleteFilter(data)}
              className={classes.chip}
            />
          );
        }) : null
    }
    </div>
    </Button>
    
      </div>
    );
  }
}
  
export default compose(
    withStyles(styles, {withTheme:true}),
  )(PollFilter);

// export default withStyles(styles)(PollFilter);