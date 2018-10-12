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
        data: this.getData(),
    }
  }

  getData() {
    console.log('POLL DATA', this.props, this.state)
    return [
        { x: 'Yes', y: this.props.totalVotesData.yesVotes },
        { x: 'No', y: this.props.totalVotesData.noVotes },
      ];
  }

  render(){
      let {classes, poll} = this.props
      return(
        <div>
        <Paper square elevation={2} className={classes.container} style={{marginBottom:0}}>
            <Card style={{marginBottom:0, padding: 7}}>
            <CardHeader
                action={null}
                className={classes.cardHeader}
                title={poll.author_username}
                classes={{
                    title: classes.cardHeader
                }}
            />
            <CardContent>
                <Typography variant="display3" style={{overflowWrap:'break-word'}}>
                   "{poll.question}"
                </Typography>
            </CardContent>
                  <VictoryChart
                    domainPadding={{ x: 100 }}
                  >
                  <VictoryAxis/>
                  <VictoryBar name="Bar-1"
                        style={{
                          data: {
                            fill: (d) => d.x === "Yes" ? '#4CAF50' : '#D32F2F',
                            fillOpacity: 0.7,
                          },
                          labels: {
                            fontSize: 20,
                            fill: (d) => d.x === "Yes" ? '#4CAF50' : '#D32F2F'
                          },
                          margin: "20%", 
                          maxWidth: "100%"
                        }}
                        categories={{
                          x: ["Yes", "No"]
                        }}
                        labels={(d) => `${d.y}%`}
                        data={this.state.data}
                        animate={{
                          duration: 2000,
                          onLoad: { duration: 1000 }
                        }}
                        barRatio={1}
                    />
                    </VictoryChart>
                    <CardContent>
    
                    <Typography variant="subheading">
                      Votes: {this.props.totalVotesData.totalVotes}
                    </Typography>

                    <Typography variant="subheading">
                       {subjects_list[poll.subject]}
                    </Typography>

                    <Typography variant="subheading">
                       Poll Expiration: {poll.expiration} hours
                    </Typography>
                    
                    </CardContent>
                </Card>
            </Paper> 
          </div>
      )
  }
}


export default compose(
  withStyles(styles, {withTheme:true}),
)(TotalVotesGraph);