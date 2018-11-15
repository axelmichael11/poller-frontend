import React from 'react'
import ReactHighcharts from 'react-highcharts';
import { connect, Provider } from 'react-redux'
import {compose} from 'recompose'
import CHARTCONFIG from './chart-type-config'

const DynamicHighChart = ({...props})=>{
  console.log('DynamicHighChart DATA', props)
  const yValues = props.data.map(datapoint=>datapoint.y)
  const maxHeight = Math.round(Math.max(...yValues))
  const pageWidth = props.pageType=='desktop' ? '50%':'85%'; 
    let config = {
        tooltip: CHARTCONFIG.tooltip,
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
          height:pageWidth,
          type: props.chartOptions.chartType.name,
          animation: {
            duration: 1000,
            // easing: this.easeOutBounce
          },
          marginTop:20,
          marginRight:35,
          // marginLeft:20,
          marginBottom: props.chartOptions.showLegend ? 100 : 40,
        },
        title: {
          text:null,
        },
        series: [{
          data: props.data,
          animation: {
            duration: 1000,
            // easing: this.easeOutBounce
          },
          // datalabels: CHARTCONFIG.dataLabels[props.chartOptions.chartType.name]
        }],
        credits: {
          enabled: false
        },
        plotOptions: CHARTCONFIG.plotOptions,
        xAxis: {
          labels:{
            rotation:0,
            style:{

            }
          },
          lineWidth: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          visibile: false,
          categories: props.categories,
          min:0,
          max: props.categories.length-1,
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
          visible:props.chartOptions.showYAxis,
          title:{
            text: undefined
          }
        },
        legend:{
          enabled: props.chartOptions.showLegend,
          align: 'center',
          verticalAlign: 'bottom',
          x: 0,
          y: 0,
          borderRadius: 5,
          borderWidth: 1,
          backgroundColor:'black',
          color:'#ffffff',
          style:{
              fontFamily:'Play',
              backgroundColor:'rgb(10,2,8,0.6)',
          },
         labelFormatter:function(){
           console.log('THIS', this)
           return this.name
         }
        },
      };
      // return <ResponsiveDynamicHighChart data={this.renderGraphData()}/>
      return (<ReactHighcharts 
        config={config}
        style={{
          margin: '0 auto',
          width:pageWidth,
        }}
      ></ReactHighcharts>)
  }
const mapStateToProps = state => ({
    pageType:state.pageType,
  })
  
const mapDispatchToProps = dispatch => ({
})
  

  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  )(DynamicHighChart);
