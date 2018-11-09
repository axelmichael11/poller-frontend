import React from 'react';
import {  compose } from 'recompose'
import { connect } from 'react-redux'
import classnames from 'classnames';


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';





import {
  Button,
  AppBar,
  Tabs,
  Tab, 
  Typography} from '@material-ui/core';


import MoreVertIcon from '@material-ui/icons/MoreVert';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'
import ArrayBackIcon from '@material-ui/icons/arrowback';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import subjects_list  from '../../lib/poll-subjects'


const ITEM_HEIGHT = 48;

const styles = theme => ({
    cardContent:{
      root:{
        wordWrap: 'break-word'
      }
    },
    container:{
      display:'inline-block'
    },
    answerFilterButton:{
      root:{
        overflowWrap:'break-word',
        display:'inline-block',
        // color:theme.palette.primary.main,
        margin: theme.spacing.unit * 2,
      },
    }
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
    console.log("RENDERING ANSWER FILTER", this.props)
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
            // centered
          >
          {Object.keys(this.props.answerOptions).map( (answerOption, i) =>{
            let data = this.props.answerOptions[answerOption];
            console.log("DATA on ANSWER FILTER" , data)
            return (<Tab
            key={i}
            onClick={()=>this.props.handleAnswerOptionChange(answerOption)}
            label={
              <div>
              <Typography component="h4" style={{fontSize:15}}>
                {data.label}
              </Typography>
              <Typography variant="subheading" component="p" style={{overflowWrap:'break-word'}}>
                {data.answerOption}
              </Typography>
              </div>
            }
            value={data.label}
              style={{
                overflowWrap:'break-word',
                backgroundColor: Object.keys(this.props.answerFilters).includes(answerOption)
                    ? this.props.answerFilters[answerOption].color
                    : theme.palette.secondary.main,
                  color: Object.keys(this.props.answerFilters).includes(answerOption)
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                  height:'75px',
              }}
            />)
          })}
          </Tabs>
        </AppBar>
      </div>
    )
  }  
}

// class AnswerFilter extends React.Component {
//   constructor(props){
//       super(props)
//       this.state = {
//       }
//   }

// render(){
//   let {classes, theme} = this.props;
//   return(
//     <div style={{width:'80%', textAlign:'center', display:'inline-flex', marginBottom:'10px'}}>
//       {Object.keys(this.props.answerOptions).map( (answerOption, i) =>{
//           let data = this.props.answerOptions[answerOption];
//           return (
//           <Button 
//             key={i}
//             onChange={()=>this.props.handleAnswerOptionChange(answerOption)}
//             size="small"
//             variant="contained" 
//             color="primary" 
//             aria-label="Add" 
//             value={data.label}
//             className={classes.answerFilterButton}
//             style={{
//               backgroundColor: Object.keys(this.props.answerFilters).includes(answerOption)
//                   ? this.props.answerFilters[answerOption].color
//                   : theme.palette.secondary.main,
//                 color: Object.keys(this.props.answerFilters).includes(answerOption)
//                 ? theme.palette.secondary.main
//                 : theme.palette.primary.main,
//                 height:'70px',
//             }}
//             onClick={this.props.handleExpandQuestion}>
//             <Typography variant="title">
//               {data.label}
//             </Typography>
//             <Typography component="p">
//               {data.answerOption}
//             </Typography>
//         </Button>
//         )})}
//     </div>
//     )
//   }  
// }

  
export default compose(
    withStyles(styles, {withTheme:true}),
  )(AnswerFilter);

