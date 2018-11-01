import React from 'react';
import {  compose } from 'recompose'
import { connect } from 'react-redux'
import classnames from 'classnames';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';





import {
  AppBar,
  Tabs,
  Tab, 
  Typography} from '@material-ui/core';


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
    console.log("PROPS ON ANSWER FILTER", this.props)
    return(
         <div>
        <AppBar 
        position="static" 
        color="default"
        id="answer-filter-bar"
        style={{  
          flexGrow: 1,
          width: '100%',  
          backgroundColor: '#FFF'
        }}>
          <Tabs
            value={false}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
          {Object.keys(this.props.answerOptions).map( (answerOption, i) =>{
            let data = this.props.answerOptions[answerOption];
            return (<Tab
            key={i}
            onClick={()=>this.props.handleAnswerOptionChange(answerOption)}
            label={
              <div>
              <Typography variant="subheading" component="p">
                {data.label}
              </Typography>
              <Typography variant="subheading" component="p">
                {data.answerOption}
              </Typography>
              </div>
            }
            value={data.label}
              style={{
                backgroundColor: Object.keys(this.props.answerFilters).includes(answerOption)
                    ? this.props.answerFilters[answerOption].color
                    : theme.palette.secondary.main,
                  color: Object.keys(this.props.answerFilters).includes(answerOption)
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                  height:'70px',
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

