import React from 'react'

import {  compose, branch, renderComponent } from 'recompose'

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

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
    }
  }

 

  render(){
      let {classes, poll} = this.props
      console.log(' TOTALS GRAPH STATE', this.state, this.props)
      return(
        <div>
          <VictoryChart
            responsive={true}
            domainPadding={{ x: 100 }}
            animate={{duration:500}}
            >
            {/* <VictoryLabel
            // text={this.state.labels}
            style={{
              labels: {fontSize: 50},
            }}
            /> */}
          { this.props.graphData.length ?
          <VictoryAxis/>:
          <VictoryAxis
            tickValues={['No Data Selected']}
            />}
          
          <VictoryBar 
          barWidth={40}
          name="Bar-1"
                style={{
                  strokeWidth: 5,
                  margin: "20%", 
                  maxWidth: "100%",
                  labels: {
                    fontSize: 20,
                    margin:10,
                    wordBreak: 'break-all',
                    // fill: (d) => d.x === "Yes" ? '#4CAF50' : '#D32F2F'
                  },
                }}
                // categories={{
                //   x: this.state.categories
                // }}
                colorScale={['greyscale']}
                labels={
                  this.props.graphData ? (d) => `${d.y}%`: (d)=>'No Data Selected'
                }
                data={this.props.graphData}
                animate={{
                  onExit: {
                    duration: 200,
                    before: () => ({
                      _y: 0,
                      fill: "red",
                    })
                  }
                }}
                // barRatio={0.5}
            />
            </VictoryChart>
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