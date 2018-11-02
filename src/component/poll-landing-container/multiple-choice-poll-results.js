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
import ChartDesign from './chart-design'
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

// ICONS
import Delete from '@material-ui/icons/Delete';
import PieChartIcon from '@material-ui/icons/PieChart'
import AreaChartIcon from '@material-ui/icons/photo'
import LineChartIcon from '@material-ui/icons/ShowChart'
import BarChartIcon from '@material-ui/icons/assessment'
import ScatterIcon from '@material-ui/icons/Grain'

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
            chartOptions:{
              chartType:{
                name:'column',
                icon:<BarChartIcon/>
              },
              showLegend:false,
            },
            chartTypes:[
              {name:'column', icon:<BarChartIcon/>},
              {name:'bar', icon:<BarChartIcon/>},
              {name:'area', icon:<AreaChartIcon/>},
              {name:'areaspline', 
                icon:<AreaChartIcon/>
              },
              {name:'line', icon:<LineChartIcon/>},
              {name:'pie', icon:<PieChartIcon/>},
              {name:'scatter', 
                icon:<ScatterIcon/>,
                tooltip: {
                  headerFormat: '<b>{series.name}</b><br>',
                  pointFormat: '{point.name}, {point.y} %'
               }
              },
              // {name:'errorbar', icon:<AssessmentIcon/>},
              // {name:'funnel', icon:<AssessmentIcon/>},
              // {name:'variwide', icon:<AssessmentIcon/>},
              // {name:'sunburst', icon:<AssessmentIcon/>},
              // {name:'scatter3d', icon:<AssessmentIcon/>},
              // {name:'columnrange', icon:<AssessmentIcon/>},
              // {name:'variablepie', icon:<AssessmentIcon/>},
              // {name:'pareto', icon:<AssessmentIcon/>},
              // {name:'heatmap', icon:<AssessmentIcon/>},
              // {name:'bellcurve', icon:<AssessmentIcon/>},
              // {name:'bubble', icon:<AssessmentIcon/>},
              // {name:'bullet', icon:<AssessmentIcon/>},
              // {name:'boxplot', icon:<AssessmentIcon/>},
              // {name:'polygon', icon:<AssessmentIcon/>},
              // {name:'pyramid', icon:<AssessmentIcon/>}, !!!!
              // {name:'histogram', icon:<AssessmentIcon/>},



            ],
            demographicLabels: this.props.pollData.demographicLabels,
            demographicDialogOpen:false,
        }
        
        // answerOption Change
        this.handleAnswerOptionChange = this.handleAnswerOptionChange.bind(this)
        this.deleteAnswerOptionFilter = this.deleteAnswerOptionFilter.bind(this)
        this.addAnswerOptionFilter = this.addAnswerOptionFilter.bind(this)
        
        //methods for demographic modal
        this.handleChartDesignChange = this.handleChartDesignChange.bind(this)
        this.addChartDesignOption = this.addChartDesignOption.bind(this)
        this.deleteDemographicFilter = this.deleteDemographicFilter.bind(this)
        this.handleOpenChartDesign = this.handleOpenChartDesign.bind(this)
        this.handleCloseChartDesign = this.handleCloseChartDesign.bind(this)
        this.renderChartDesignOptions = this.renderChartDesignOptions.bind(this)

        //GRAPH DATA
        this.getAnswerFilters = this.getAnswerFilters.bind(this)
        this.renderGraphData = this.renderGraphData.bind(this)
        this.renderTotalVotesData =this.renderTotalVotesData.bind(this)
        this.renderDemographicsData =this.renderDemographicsData.bind(this)
        this.getChartOptions=this.getChartOptions.bind(this)
        this.handleChangeShowLegend = this.handleChangeShowLegend.bind(this)
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

    handleChartDesignChange(label){
      console.log('HANDLE DEM CHANGE LABEL', label)
      let {chartType} =this.state.chartOptions;
      // values are the demographic labels
      if (label == chartType.name){
      console.log('already selected');
      } else {
        this.addChartDesignOption(label)
        // this.renderGraphData()
      }
    }

    addChartDesignOption(label){
      let {chartOptions, chartTypes} =this.state;
      
      let newChartType = chartTypes.reduce((acc,curr)=>{
        if (curr.name==label){
          acc['name']=curr.name
          acc['icon']=curr.icon
          return acc
        } else {
          return acc
        }
      },{})
      console.log('NEW CHART TYPE', newChartType)
      chartOptions.chartType = newChartType;
      console.log('new chart options', chartOptions)
          this.setState({
            chartOptions: chartOptions,
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
  

  handleOpenChartDesign(){
    this.setState({
      demographicDialogOpen:true,
    })
  }

  handleCloseChartDesign(){
    this.setState({
      demographicDialogOpen:false,
    })
  }


  renderChartDesignOptions(){
    let {chartTypes,chartOptions} = this.state;
    let {theme} = this.props;
    console.log('CHART DESIGN OPTIONS', chartOptions)
    return (
    <div >
      {chartTypes.map((chart, key) => (
            <MenuItem 
            key={key}
            //  selected={demographic === 'Pyxis'}
            value={chart.name}
              onClick={()=>this.handleChartDesignChange(chart.name)}
              style={{
                backgroundColor: chartOptions.chartType.name == chart.name
                    ? 'rgb(10,2,8,0.6)'
                    : 'rgb(255,255,255, 0.3)',
                  color: chartOptions.chartType.name == chart.name
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                  // width:'50%'
                }}
              >
              {chart.icon} {chart.name}
            </MenuItem>))}
            <MenuItem 
            //  selected={demographic === 'Pyxis'}
            // value={chart.name}
              onClick={()=>this.handleChangeShowLegend()}
              style={{
                backgroundColor: chartOptions.chartType.showLegend
                    ? 'rgb(10,2,8,0.6)'
                    : 'rgb(255,255,255, 0.3)',
                  color:  chartOptions.chartType.showLegend
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main,
                  // width:'50%'
                }}>
              Show Legend
            </MenuItem>
            </div>
          )
        //   +( 
        //   <div style={{width:'50%'}}>
        //   suhhh dude
        //   </div>
        // )
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
          z:0,
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
getChartOptions(){
  let {chartOptions} = this.state;
  return chartOptions
}

handleChangeShowLegend(){
  let {chartOptions} = this.state

  chartOptions.showLegend = !chartOptions.showLegend;
  console.log('Changing legend' , chartOptions)
  this.setState({
    chartOptions : chartOptions,
  })
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
                <ChartDesign
                  chartOptions={this.state.chartOptions}
                  chartTypes={this.state.chartTypes}
                  renderChartDesignOptions={this.renderChartDesignOptions()}
                />
                <RenderSwipeGraphs
                chartTitles={this.state.chartTitles}
                chartOptions={this.getChartOptions()}
                chartData={this.renderGraphData()}
                pollData={this.props.pollData}
                demographicLabels={this.state.demographicLabels}
                categories={this.state.categories}
                chartOptions={this.state.chartOptions}
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