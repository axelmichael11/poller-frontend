import React from 'react'
import ReactHighcharts from 'react-highcharts';
import CHARTCONFIG from './chart-type-config'

const BarChart = ({...props})=>{
  console.log('PROPS ON BARCHART', props)
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
          type: props.chartOptions.chartType.name,
          animation: {
            duration: 1000,
            // easing: this.easeOutBounce
          },
          marginTop:20,
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
          lineWidth: 0,
          gridLineWidth: 0,
          minorGridLineWidth: 0,
          lineColor: 'transparent',
          visibile: props.chartOptions.showXAxis,
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
          labels: {
            formatter: function() {
               return this.value+"%";
            }
          },
          min: 0,
          max: 100,
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
