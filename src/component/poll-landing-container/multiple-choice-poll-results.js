import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
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
import GenerateColorChange from './generate-color-change'
import {QuestionExpandWithStyle, QuestionCardContentWithStyle} from './display-question'

import profession_data from '../../lib/professions.js'
import ethnicity_data from '../../lib/ethnicities.js'
import country_data from '../../lib/countries.js'
import subjects_list from '../../lib/poll-subjects'

//Methods

//These will be used, to store id of the user in the database...
import * as util from '../../lib/util.js'




//Style
import { withStyles } from '@material-ui/core/styles';


import {
  FormControlLabel,
  Checkbox,
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
import ColorChangeIcon from '@material-ui/icons/autorenew'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'

const styles = theme =>({
  container: theme.overrides.MuiPaper.root,
  cardHeader:theme.overrides.PollCard.cardHeader,
  headline: {...theme.typography.title, fontSize: 30},
  highCharts: theme.uniqueStyles.highCharts,
  highCharts:{
    fontFamily: 'Play',
  },
  colorChangeButton: theme.uniqueStyles.colorChangeButton.root
})

class MCPollResults extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            pollData: this.props.pollData,
            answerOptions: this.props.pollData.answerOptions,
            answerFilters: this.props.pollData.answerOptions, //every answer selected on start
            categories: Object.keys(this.props.pollData.answerOptions).reduce((acc,curr)=>{
              return [...acc, this.props.pollData.answerOptions[curr].answerOption]
            }, []),
            tableCategory: 'totals',
            questionExpanded:true,
            chartOptions:{
              chartType:{
                name:'column',
                icon:<BarChartIcon/>
              },
              showLegend:false,
              showYAxis:false,
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
              //charts to explore...
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
        this.renderChartData = this.renderChartData.bind(this)
        this.renderTotalVotesData =this.renderTotalVotesData.bind(this)
        this.renderDemographicsData =this.renderDemographicsData.bind(this)
        this.getChartOptions=this.getChartOptions.bind(this)
        this.handleChangeShowLegend = this.handleChangeShowLegend.bind(this)
        this.handleChangeShowYAxis = this.handleChangeShowYAxis.bind(this)
        this.renderAxisOptions = this.renderAxisOptions.bind(this)
        this.handleGenerateNewColors = this.handleGenerateNewColors.bind(this)
        this.changeColors = this.changeColors.bind(this)
        this.handleExpandQuestion = this.handleExpandQuestion.bind(this);

    }

    componentDidMount(){
      let {answerOptions} = this.state;
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
          return [...acc, newFilters[curr].answerOption]
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
      return [...acc, newFilters[curr].answerOption]
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
        // this.renderChartData()
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
            {this.renderAxisOptions()}
            </div>
          )
  }
  getAnswerFilters(){
    return this.state.answerFilters
  }

  renderAxisOptions(){
    let {theme, classes} = this.props;
    let {chartOptions} = this.state;
    return(
      <div>
            <MenuItem
            style={{
              // root:{
              backgroundColor: chartOptions.chartType.showYAxis
              ? 'rgb(10,2,8,0.6)'
              : 'rgb(255,255,255, 0.3)'
            // }
            }}>
            <Checkbox
                checked={chartOptions.showYAxis}
                onClick={()=>this.handleChangeShowYAxis()}
                  label="Y Axis"
                  classes={{
                    backgroundColor: chartOptions.chartType.showYAxis
                      ? 'rgb(10,2,8,0.6)'
                      : 'rgb(255,255,255, 0.3)',
                    color: chartOptions.chartType.showYAxis
                    ? theme.palette.secondary.main
                    : theme.palette.primary.main,
                }}/> Y Axis
            </MenuItem>
        </div>
    )
  }



  //GRAPH DATA

  renderTotalVotesData(){
    let {answerFilters, categories, } = this.state;
    console.log('Categories!!!', answerFilters, categories)
    let data = Object.keys(answerFilters).reduce((acc, curr, i) =>{
      console.log('categories',categories)
        let dataPoint = {
          id: answerFilters[curr].label,
          name: answerFilters[curr].label,
          y: answerFilters[curr].totalVotePercent,
          color: answerFilters[curr].color,
        }
        return [...acc, dataPoint];
    }, [])
    
    let totalsData = {
      title:'Total',
      data: data,
      categories: categories
    }
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
    return [...demographicDataAcc, demographicData];
  }, [])

  return totalDemographicsData;
}



renderChartData() {
  let demographicsData = this.renderDemographicsData()
  let totalsData = this.renderTotalVotesData()
  let chartData = [totalsData, ...demographicsData]
  console.log('GRAPH DATA', chartData);
  return chartData;
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

handleChangeShowYAxis(){
  let {chartOptions} = this.state
  chartOptions.showYAxis = !chartOptions.showYAxis;
  this.setState({
    chartOptions : chartOptions,
  })
}

handleGenerateNewColors(){
  let {answerOptions, answerFilters} = this.state;
  console.log('ANSWER OPTIONS' , answerOptions)
  let newAnswerOptions = Object.keys(answerOptions).reduce((acc, answerOption)=>{
    let newAnswerOption = this.changeColors(answerOptions[answerOption], randomColor());
    acc[answerOption] = newAnswerOption;
    return acc;
  }, {})

  let newAnswerFilters = Object.keys(newAnswerOptions).reduce((acc, newAnswerOption)=>{
    if (answerFilters[newAnswerOption]){
      acc[newAnswerOption] = newAnswerOptions[newAnswerOption]
      return acc;
    } else {
      return acc;
    }
  },{})

  console.log('RESULT OF COLOR CHANGE', newAnswerOptions)
  this.setState({
    answerOptions: newAnswerOptions,
    answerFilters: newAnswerFilters,
  })
}

changeColors(answerOption, newColor){
  // console.log('new color', newColor)
  let newObject = {};
  for (var key in answerOption){
    if (typeof answerOption[key] == 'object'){
        newObject[key] = this.changeColors(answerOption[key], newColor);
    }
    if (Object.keys(this.state.demographicLabels).includes(key)){
      newObject[key] = answerOption[key].map(dataPoint=>{
        dataPoint.color = newColor;
        return dataPoint
      })
    }
    if (key == 'color'){
      newObject[key] = newColor
    }
    if(key != 'color' && key != 'demographic'){
      newObject[key] = answerOption[key];
    }
  }
  return newObject;
}
handleExpandQuestion(event){
  this.setState(state => ({ questionExpanded: !state.questionExpanded }));
};

    render(){
      let {classes} = this.props;
      console.log('MC STATE', this.state)
        return(
            <div id="mc-results">
              <div>
                  <AnswerCardCase 
                  {...this.props}>
                  <div style={{float:'right', width:'200px'}}>
                  <div style={{
                        position: 'fixed',
                        zIndex: 20,
                        textAlign: 'center',
                  }}>
                  <ChartDesign
                    chartOptions={this.state.chartOptions}
                    chartTypes={this.state.chartTypes}
                    renderChartDesignOptions={this.renderChartDesignOptions()}
                  />
                  <GenerateColorChange
                  handleGenerateNewColors={this.handleGenerateNewColors}
                  />
                  <QuestionExpandWithStyle
                    handleExpandQuestion={this.handleExpandQuestion}
                    questionExpanded={this.state.questionExpanded}
                  />
              </div>
              </div>
                <QuestionCardContentWithStyle
                  authorUsername={this.props.pollData.author_username}
                  question={this.props.pollData.question}
                  questionExpanded={this.state.questionExpanded}
                />
                
                <RenderSwipeGraphs
                chartTitles={this.state.chartTitles}
                chartOptions={this.getChartOptions()}
                chartData={this.renderChartData()}
                pollData={this.props.pollData}
                demographicLabels={this.state.demographicLabels}
                categories={this.state.categories}
                chartOptions={this.state.chartOptions}
                answerFilters={this.state.answerFilters}
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