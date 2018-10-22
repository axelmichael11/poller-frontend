import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PieResults from '../charts/yes-no-pie/index'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';
import ReactHighcharts from 'react-highcharts';
import Swipe from 'react-easy-swipe';

import randomColor from 'randomcolor'; // import the script
import {
  fetchVoteHistory
} from '../../action/vote-actions'

import AnswerFilter from './answer-filter'
import CardCase from '../poll-card-design/card-case'

// import TotalVotesGraph from '../charts/vote-totals/index'

import BarChart from '../charts/vote-totals/d3-bar-total'
import Chart from '../charts/d3-bar/chart'
import ResponsiveChart from '../charts/d3-bar/responsive-chart'

const ResponsiveBarChart = ResponsiveChart(Chart)

import profession_data from '../../lib/professions.js'
import ethnicity_data from '../../lib/ethnicities.js'
import country_data from '../../lib/countries.js'
//Methods

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...



//Style
import { withStyles } from '@material-ui/core/styles';


import {Paper,
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




const styles = theme =>({
  container: theme.overrides.MuiPaper.root,
  cardHeader:theme.overrides.PollCard.cardHeader,
  headline: {...theme.typography.title, fontSize: 30},
  highCharts: theme.uniqueStyles.highCharts,
  highCharts:{
    fontFamily: 'Play',
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
            graphData: [],
            tableCategory: 'totals'
        }
        
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.deleteFilter = this.deleteFilter.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.renderGraphData = this.renderGraphData.bind(this)
        this.renderTotalVotes = this.renderTotalVotes.bind(this)
        this.easeOutBounce = this.easeOutBounce.bind(this)
        this.onSwipeStart = this.onSwipeStart.bind(this)
        this.onSwipeMove = this.onSwipeMove.bind(this)
        this.onSwipeEnd = this.onSwipeEnd.bind(this)
    }

    

    
    handleFilterChange(answerOption){
      if (this.state.answerFilters[answerOption]){
        this.deleteFilter(answerOption)
        this.renderGraphData()
      } else {
        this.addFilter(answerOption)
        this.renderGraphData()
      }
    }
    
    deleteFilter(answerOption){
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

    addFilter(answerOption){
    let {answerFilters} = this.state;
    let {answerOptions} = this.state;
    
    let newFilter = {};
    newFilter[answerOption] = answerOptions[answerOption];
    let newFilters = Object.assign({}, answerFilters, newFilter)

    let categories = Object.keys(newFilters).reduce((acc,curr)=>{
      return [...acc, newFilters[curr].label]
    }, [])

    // let newFilters = Object.assign({}, ...answerFilters, answerOption);
    this.setState({
        answerFilters: newFilters,
        categories: categories,
    })
  }


  renderGraphData() {
      let {answerOptions} = this.state;
      let {answerFilters} = this.state
      
      let data = Object.keys(answerFilters).reduce((acc, curr, i) =>{
          let dataPoint = {
            name: answerFilters[curr].label,
            y: answerFilters[curr].totalVotePercent,
            color: answerFilters[curr].color,
          }
          return [...acc, dataPoint];
      }, [])

      return data;
  }

  easeOutBounce(pos){
    if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
    }
    if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
    }
    if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
    }
    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
};

  renderTotalVotes(){
      let config = {
      tooltip: { enabled: false },
      noData:{
        attr:'No Data to display',
        style: {
          fontFamily:'Play',
          'fontSize': 20
        }
      },
      chart: {
        type: 'column',
        animation: {
          duration: 1000,
          easing: this.easeOutBounce
        }
      },
      title: {
        text:null,
      },
      series: [{
        data: this.renderGraphData(),
        animation: {
          duration: 1000,
          easing: this.easeOutBounce
        }
      }],
      credits: {
        enabled: false
      },
      plotOptions: {
        column: {
           dataLabels: {
               format: '{y}%',
               enabled: true,
               overflow: 'allow',
               crop: false,
               style: {
                fontFamily:'Play',
                'fontSize': 20
              }
           },
        },
        
     },
      xAxis: {
        lineWidth: 0,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        categories: this.state.categories,
        min:0,
        max: this.state.categories.length-1,
          labels: {
            align:'center',
            formatter: function () {
              return this.value
            },
            style: {
              fontFamily:'Play',
              fontFamily: 'Play',
              'fontSize': 25
            }
          },
        // min:0,
        // max:this.state.answerFilters.length-1,
        // minorTickLength: 0,
        tickLength: 0
      },
      yAxis: {
        min: 0,
        max: 100,
        // lineWidth: 0,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        // minorTickLength: 0,
        // tickLength: 0,
        visible:false,
        title:{
          text: undefined
        }
      },
      legend:{
        enabled: false,
      },
    };
    // return <ResponsiveBarChart data={this.renderGraphData()}/>
    return <ReactHighcharts config={config}></ReactHighcharts>
    }

    onSwipeStart(event) {
      console.log('Start swiping...', event);
    }
  
    onSwipeMove(position, event) {
      console.log(`Moved ${position.x} pixels horizontally`, event);
      console.log(`Moved ${position.y} pixels vertically`, event);
    }
  
    onSwipeEnd(event) {
      console.log('End swiping...', event);
    }
  


    render(){
      // console.log('ANSWER FILTERS',this.state.answerFilters, 'GRAPH DATA', this.renderGraphData())
      const boxStyle = {
        position: 'absolute',
        bottom: 0,
      };
      let {classes} = this.props;

        return(
            <div id="mc-results">
            <div>
                <CardCase 
                {...this.props}>

                    {/* <div id="mc-results-clear"></div> */}
                    <Typography className={classes.headline}> Total Votes </Typography>
                <AnswerFilter
                    handleFilterChange={this.handleFilterChange}
                    answerFilters={this.state.answerFilters}
                    deleteFilter={this.deleteFilter}
                    renderGraphData={this.renderGraphData}
                    answerOptions={this.state.answerOptions}
                />
               <Swipe
                  onSwipeStart={this.onSwipeStart}
                  onSwipeMove={this.onSwipeMove}
                  onSwipeEnd={this.onSwipeEnd}>
                {this.renderTotalVotes()}
              </Swipe>
                </CardCase>
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