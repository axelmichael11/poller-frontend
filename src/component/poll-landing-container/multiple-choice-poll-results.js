import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PieResults from '../charts/yes-no-pie/index'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';

import randomColor from 'randomcolor'; // import the script
import {
  fetchVoteHistory
} from '../../action/vote-actions'

import AnswerFilter from './answer-filter'
import AnswerCardCase from '../poll-card-design/answer-card-case'

// import TotalVotesGraph from '../charts/vote-totals/index'



import ReactHighcharts from 'react-highcharts'
import DemographicSelect from './demographic-select'
import SwipeActionsWrapper from '../swipe-actions-wrapper'
import SwipeableViews from 'react-swipeable-views';
import RenderSwipeGraphs from './render-swipe-graphs'



import profession_data from '../../lib/professions.js'
import ethnicity_data from '../../lib/ethnicities.js'
import country_data from '../../lib/countries.js'
//Methods

//These will be used, to store id of the user in the database...
import * as util from '../../lib/util.js'




//Style
import { withStyles } from '@material-ui/core/styles';


import {
  MenuItem,
  Paper,
Card,
CardHeader,
CardMedia,
CardContent,
CardActions,
Collapse,
Avatar,
IconButton,
Typography,
red,
AppBar,
Toolbar,
Button} from '@material-ui/core'


import Delete from '@material-ui/icons/Delete';




const styles = theme =>({
  container: theme.overrides.MuiPaper.root,
  cardHeader:theme.overrides.PollCard.cardHeader,
  headline: {...theme.typography.title, fontSize: 30},
  highCharts: theme.uniqueStyles.highCharts,
  highCharts:{
    fontFamily: 'Play',
  },
  menuItem:{
    
  }
})

class MCPollResults extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            pollData: this.props.pollData,
            answerOptions: this.props.pollData.answerOptions,
            answerFilters:{},
            categories: [],
            tableCategory: 'totals',
            selectedDemographics:{},
            demographicLabels: this.props.pollData.demographicLabels,
            demographicDialogOpen:false,
        }
        
        // answerOption Change
        this.handleAnswerOptionChange = this.handleAnswerOptionChange.bind(this)
        this.deleteAnswerOptionFilter = this.deleteAnswerOptionFilter.bind(this)
        this.addAnswerOptionFilter = this.addAnswerOptionFilter.bind(this)
        
        //methods for demographic modal
        this.handleDemographicChange = this.handleDemographicChange.bind(this)
        this.addDemographicFilter = this.addDemographicFilter.bind(this)
        this.deleteDemographicFilter = this.deleteDemographicFilter.bind(this)
        this.handleOpenDemographicDialog = this.handleOpenDemographicDialog.bind(this)
        this.handleCloseDemographicDialog = this.handleCloseDemographicDialog.bind(this)
        this.renderDemographicList = this.renderDemographicList.bind(this)

        //GRAPH DATA
        this.getAnswerFilters = this.getAnswerFilters.bind(this)
        this.renderGraphData = this.renderGraphData.bind(this)
        this.renderTotalVotesData =this.renderTotalVotesData.bind(this)
        this.renderDemographicsData =this.renderDemographicsData.bind(this)
    }



    

    

    
    handleAnswerOptionChange(answerOption){
      let {answerFilters, demographic} = this.state;
        if (this.state.answerFilters[answerOption]){
          this.deleteAnswerOptionFilter(answerOption)
        } else {
          this.addAnswerOptionFilter(answerOption)
        }
      }
    
    deleteAnswerOptionFilter(answerOption){
        let {answerFilters, answerOptions} = this.state;
        let newFilters = Object.keys(answerFilters)
        .reduce((acc, curr, i)=>{
          if (curr != answerOption){
            acc[curr] = answerOptions[curr];
            return acc;
          } else {
            return acc;
          }
        }, {})
        let categories = Object.keys(newFilters).reduce((acc,curr)=>{
          return [...acc, newFilters[curr].label]
        }, [])

        this.setState({
            answerFilters: newFilters,
            categories: categories,
        })
      }

    addAnswerOptionFilter(answerOption){
    let {answerFilters} = this.state;
    let {answerOptions} = this.state;
    
    let newFilter = {};
    newFilter[answerOption] = answerOptions[answerOption];
    let newFilters = Object.assign({}, answerFilters, newFilter)

    let categories = Object.keys(newFilters).reduce((acc,curr)=>{
      return [...acc, newFilters[curr].label]
    }, [])
    this.setState({
        answerFilters: newFilters,
        categories: categories,
    })
  }

    handleDemographicChange(label){
      console.log('HANDLE DEM CHANGE LABEL', label)
      let {selectedDemographics} =this.state;
      // values are the demographic labels
      if (Object.values(selectedDemographics).includes(label)){
        this.deleteDemographicFilter(label);
        
        // this.renderGraphData()
      } else {
        this.addDemographicFilter(label)
        // this.renderGraphData()
      }
    }

    addDemographicFilter(label){
      let {demographicLabels, selectedDemographics} =this.state;
      let newSelectedDemographics =  Object.keys(demographicLabels).reduce((acc, curr, i)=>{
            if (demographicLabels[curr]==label){
              let demographicKey = Object.keys(demographicLabels)[i]
              acc[demographicKey]= demographicLabels[curr]
              return acc;
            } else {
              return acc;
            }
        },selectedDemographics)
          
          console.log('NEWSELECTEDDEMOGRPHAICS', newSelectedDemographics)
          this.setState({
            selectedDemographics: newSelectedDemographics,
          })
        
    }

  deleteDemographicFilter(label){
    let {selectedDemographics, demographicLabels} = this.state;
    let newSelectedDemographics = Object.keys(demographicLabels)
    .reduce((acc, curr, i)=>{
      if (demographicLabels[curr]==label){
        delete acc[curr]
        return acc;
      } else {
        return acc;
      }
    }, selectedDemographics)
    this.setState({
        selectedDemographics: newSelectedDemographics,
    })
  }
  

  handleOpenDemographicDialog(){
    this.setState({
      demographicDialogOpen:true,
    })
  }

  handleCloseDemographicDialog(){
    this.setState({
      demographicDialogOpen:false,
    })
  }


  renderDemographicList(){
    let {demographicLabels, selectedDemographics} = this.state;
    let {theme} = this.props;
    return (Object.values(demographicLabels).map((label, key) => (
            <MenuItem 
            key={key}
            //  selected={demographic === 'Pyxis'}
            value={label}
              onClick={()=>this.handleDemographicChange(label)}
              style={{
                backgroundColor:
                  Object.values(selectedDemographics).includes(label)
                    ? 'rgb(10,2,8,0.6)'
                    : 'rgb(255,255,255, 0.3)',
                  color: Object.values(selectedDemographics).includes(label)
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                  
              }}
              >
              {label}
            </MenuItem>
          )
        )
      )
  }
  getAnswerFilters(){
    return this.state.answerFilters
  }



  //GRAPH DATA

  renderTotalVotesData() {
    // let {answerOptions} = this.state;
    let {answerFilters} = this.state;
    console.log('ANSWER FILTERS', answerFilters)
    let data = Object.keys(answerFilters).reduce((acc, curr, i) =>{
        let dataPoint = {
          name: answerFilters[curr].label,
          y: answerFilters[curr].totalVotePercent,
          color: answerFilters[curr].color,
        }
        return [...acc, dataPoint];
    }, [])
    
    let totalsData = {
      title:'Total Votes',
      data: data,
      categories: this.state.categories,
    }
    console.log('TOTALS DATA', totalsData)
    return totalsData;
}


renderDemographicsData(){
  let {demographicLabels, answerFilters, answerOptions} = this.state;

  let totalDemographicsData = Object.keys(demographicLabels).reduce((demographicDataAcc, currentDemographic, i) =>{      
      let dataPoints = Object.keys(answerFilters).reduce((answerFiltersAcc, currentAnswerFilter)=>{
        let currentAnswerFilterAtCurrentDemographic = answerFilters[currentAnswerFilter].demographics[currentDemographic]
        return [...answerFiltersAcc, ...currentAnswerFilterAtCurrentDemographic]
      }, [])

      let demographicData = {
        title: demographicLabels[currentDemographic],
        data: dataPoints,
        categories: dataPoints.map(dataPoint=>dataPoint.name),
      }
      console.log('demgoraphic DATA', demographicData)
    return [...demographicDataAcc, demographicData];
  }, [])

  console.log('Demographic Data DATA', totalDemographicsData)
  return totalDemographicsData;
}



renderGraphData() {
  let demographicsData = this.renderDemographicsData()
  let totalsData = this.renderTotalVotesData()
  let graphData = [totalsData, ...demographicsData]
  console.log('GRAPH DATA', graphData);
  return graphData;
}

  


  


    render(){
      let body = document.getElementsByTagName('body');

      const boxStyle = {
        position: 'absolute',
        bottom: 0,
      };
      let {classes} = this.props;

        return(
            <div id="mc-results">
            <div>
                <AnswerCardCase 
                {...this.props}>

                <RenderSwipeGraphs
                chartTitles={this.state.chartTitles}
                chartData={this.renderGraphData()}
                pollData={this.props.pollData}
                demographicLabels={this.state.demographicLabels}
                categories={this.state.categories}
                />

                <AnswerFilter
                    handleAnswerOptionChange={this.handleAnswerOptionChange}
                    answerFilters={this.state.answerFilters}
                    deleteAnswerOptionFilter={this.deleteAnswerOptionFilter}
                    answerOptions={this.state.answerOptions}
                />

                </AnswerCardCase>
            </div>
            </div>
        )
    }
}



export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
  })
  
  export const mapDispatchToProps = dispatch => ({
  })
  
  
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles, {withTheme:true}),
  )(MCPollResults);