import React from 'react';
import ReactHighcharts from 'react-highcharts';

import { Link, withRouter } from 'react-router-dom'
import {  compose } from 'recompose'
import { withStyles } from '@material-ui/core/styles';


import {Paper,
classnames,
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
Button } from '@material-ui/core'

import BarChart from './bar-chart'

const styles = theme =>({
    container: theme.overrides.MuiPaper.root,
    cardHeader:theme.overrides.PollCard.cardHeader,
    deleteButton: theme.overrides.MuiIcon,
    titleFont:{
        title: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        }
    },
    cardContent:{
        root:{
          wordWrap: 'break-word'
        }
      }
})


const PublicPollTotals = ({...props}) =>{
    //classes, theme, props.pollActions, poll,
    const yValues = props.quickTotals.data.map(datapoint=>datapoint.y)
  const maxHeight = Math.round(Math.max(...yValues))
    let config = {
        tooltip: { enabled: false },
        noData:{
          attr:'No Data to display',
          position:{
            align:'center',
            verticalAlign:'middle',
          },
          style: {
            fontFamily:'Play',
            'fontSize': 20
          }
        },
        chart: {
          height:'75%',
          type: 'column',
          animation: {
            duration: 1000,
            // easing: this.easeOutBounce
          },
          marginTop:20,
          marginRight:20,
          // marginLeft:20,
        //   marginBottom: props.chartOptions.showLegend ? 100 : 40,
          marginBottom:40,
        },
        title: {
          text:null,
        },
        series: [{
          data: props.quickTotals.data,
          animation: {
            duration: 1000,
          },
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
                        fontSize: '1em'
                    }
                },
            },
        },
        xAxis: {
          labels:{
            style:{

            }
          },
          lineWidth: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          visibile: false,
          categories: Object.values(props.quickTotals.categories),
          min:0,
          max: Object.values(props.quickTotals.categories).length-1,
            labels: {
              align:'center',
              formatter: function () {
                return this.value
              },
              style: {
                fontFamily:'Play',
                fontFamily: 'Play',
                fontSize: '1em',
                color:'#000000'
              }
            },
          tickLength: 0
        },
        yAxis: {
          labels: {
            formatter: function() {
               return this.value+"%";
            }
          },
          min: 0,
          max: maxHeight,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          visible:false,
          title:{
            text: undefined
          }
        },
        legend:{
          enabled: false,
        },
      };
    return (
        <div style={{width:'50%', margin:'0 auto'}}>
            <CardContent>
                <ReactHighcharts 
                    config={config}
                    style={{
                    margin: '0 auto',
                    width: '50%',
                    }}
                ></ReactHighcharts>
            </CardContent>
          </div>
    )
}


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(PublicPollTotals);