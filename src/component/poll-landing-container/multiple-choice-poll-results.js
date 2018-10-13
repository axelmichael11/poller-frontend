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
import CardCase from '../poll-card-design/card-case'
import TotalVotesGraph from '../charts/vote-totals/index'
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
  // typography: theme.typography.text,
  expand: {
    color:theme.palette.secondary.main,
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

class MCPollResults extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            pollData: this.props.pollData,
            // answerLabels: this.props.answerLabels,
            answerLabels: this.props.pollData.labels,
            answerFilters:[],
            graphData: [],
            tableCategory: 'totals'
        }
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.deleteFilter = this.deleteFilter.bind(this)
        this.addFilter = this.addFilter.bind(this)
        this.renderGraphData = this.renderGraphData.bind(this)
        this.renderTotalVotes = this.renderTotalVotes.bind(this)
    }


    deleteFilter(answerOption){
        let {answerFilters} = this.state;
        let newFilters = answerFilters.filter(filter=> filter!==answerOption)
        this.setState({
            answerFilters: newFilters
        })
      }

    handleFilterChange(answerOption){
        if (this.state.answerFilters.includes(answerOption)){
        this.deleteFilter(answerOption)
        this.renderGraphData()
      } else {
        this.addFilter(answerOption)
        this.renderGraphData()
      }
  }

  addFilter(answerOption){
    let {answerFilters} = this.state;
    let newFilters = [...answerFilters, answerOption];
    this.setState({
        answerFilters: newFilters
    })
  }


  renderGraphData() {
    //   if (this.state.tableCategory=='totals'){
          let {answerOptions} = this.props.pollData;
          let {answerFilters} = this.state
          console.log('GRAPH RENDER ', answerOptions, answerFilters )
      return Object.keys(answerOptions).reduce((acc, curr, i) =>{
        //   console.log('CURRENT',curr,answerOptions[curr],'', answerFilters.includes(answerOptions[curr].label))
        if (answerOptions[curr] && answerFilters.includes(answerOptions[curr].label)){
          let dataPoint = {
            x: answerOptions[curr].label, 
            y: answerOptions[curr].totalVotePercent
          }
          return [...acc, dataPoint];
        } else {
          return acc
        }
      }, [])
  }

  renderTotalVotes(){
      return (
        <TotalVotesGraph
            totalVotes={this.state.pollData.totalVotes}
            graphData={this.renderGraphData()}
            poll={this.props.poll}
        />
      )
  }


    render(){
        console.log("MC DATA", this.state, this.state.pollData)
        return(
            <div>
                <CardCase 
                {...this.props}
                style={{
                    height:'100%'
                }}>

                <AnswerFilter
                    handleFilterChange={this.handleFilterChange}
                    answerLabels={this.state.answerLabels}
                    answerFilters={this.state.answerFilters}
                    deleteFilter={this.deleteFilter}
                    renderGraphData={this.renderGraphData}
                />
                {this.renderTotalVotes()}
                </CardCase>
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