import React from 'react';
import {  compose } from 'recompose'
import { connect } from 'react-redux'
import classnames from 'classnames';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';





import {
  AppBar,
  Tabs,
  Tab } from '@material-ui/core';


import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'
import ArrayBackIcon from '@material-ui/icons/arrowback';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import subjects_list  from '../../lib/poll-subjects'

const styles = theme => ({
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
  
  chip: {
    margin: theme.spacing.unit / 2,
  },
    text: {
      fontFamily:"Play",
        fontSize: 25,
        display:'inline',
    },
    actions: {
      display: 'flex',
    },

});

class AnswerFilter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: 0,
        }
    }

  render(){
    let {classes, theme} = this.props;
    return(
         <div>
        <AppBar 
        position="static" 
        color="default"
        // id="explore-bar"
        style={{    
          backgroundColor: '#FFF'
        }}>
          <Tabs
            value={false}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
          {this.props.answerLabels.map( (data, key) =>{
            return (<Tab
            key={key}
            onClick={()=>this.props.handleFilterChange(data)}
            label={data}
            value={data}
              style={{
                backgroundColor:
                  this.props.answerFilters.includes(data)
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                  color: this.props.answerFilters.includes(data)
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                  height:'70px'
              }}
            />)
          })}
          </Tabs>
        </AppBar>
      </div>
    )
  }  
}

  
export default compose(
    withStyles(styles, {withTheme:true}),
  )(AnswerFilter);

