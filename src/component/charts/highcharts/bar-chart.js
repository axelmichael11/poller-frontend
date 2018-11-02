import React from 'react'
import ReactHighcharts from 'react-highcharts';
import CHARTCONFIG from './chart-type-config'

const BarChart = ({...props})=>{
  // console.log('PROPS ON BARCHART', props)
    let config = {
      
        tooltip: CHARTCONFIG.tooltip,
        noData:{
          attr:'No Data to display',
          style: {
            fontFamily:'Play',
            'fontSize': 20
          }
        },
        chart: {
          marginBottom: props.chartOptions.showLegend ? 100 : 20,
          type: props.chartOptions.chartType.name,
          animation: {
            duration: 1000,
            // easing: this.easeOutBounce
          },
          marginTop: 30,
          marginBottom: 30,
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
          lineWidth: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
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
                fontSize: '2em'
              }
            },
          tickLength: 0
        },
        yAxis: {
          min: 0,
          max: 105,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          visible:false,
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
            style:{
                fontFamily:'Play',
                backgroundColor:'rgb(10,2,8,0.6)',
                color:'#ffffff'
            },
        },
      };
      // return <ResponsiveBarChart data={this.renderGraphData()}/>
      return (<ReactHighcharts 
        config={config}
        style={{
          margin: '0 auto',
          width: '80%',
        }}
      ></ReactHighcharts>)
  }
  

  export default BarChart;
