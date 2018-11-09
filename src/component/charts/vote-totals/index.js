import React from 'react'

import {  compose, branch, renderComponent } from 'recompose'

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';


import {VictoryBar, VictoryContainer, VictoryChart, VictoryAxis, VictoryLabel} from 'victory'
import Typography from '@material-ui/core/Typography';

import subjects_list from '../../../lib/poll-subjects'

const styles = theme =>({
  container: theme.overrides.MuiPaper.root,
  cardHeader:theme.overrides.PollCard.cardHeader,
})


class TotalVotesGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        type: this.props.type,
        totalsData: this.props.totalsData,
        domainPaddingXLimit: this.props.graphData.length,
        // data
    }
  }

  render(){
      let {classes, poll} = this.props
      console.log(' TOTALS GRAPH STATE', this.state, this.props)
      return(
        <div>
          {/* <VictoryChart
            responsive={true}
            domain={{ x: [1, 3], y: [0, 100] }}
            domainPadding={{x:150}}
            animate={{duration:500}}
            >
          <VictoryAxis
            tickValues={this.props.answerFilters.reduce((acc,curr, i )=>{
              return [...acc, i];
            }, [])}
        /> */}
          
          <VictoryBar 
            barWidth={30}
                categories={{
                  x: this.props.answerFilters
                }}
                labels={this.props.answerFilters.length > 0 ? (d) => `${d.y}%`: null}
                colorScale={['greyscale']}
                labels={
                  this.props.graphData ? (d) => `${d.y}%`: null
                }
                // labels={(d)=> d.y}
                data={this.props.graphData}
                // animate={{
                //   onExit: {
                //     duration: 200,
                //     before: () => ({
                //       _y: 0,
                //       fill: "red",
                //     })
                //   }
                // }}
                // barRatio={0.5}
            />
            {/* </VictoryChart> */}
            <CardContent>
              <Typography variant="subheading">
                Votes: {this.props.totalVotes}
              </Typography>
            </CardContent>
          </div>
      )
  }
}


export default compose(
  withStyles(styles, {withTheme:true}),
)(TotalVotesGraph);