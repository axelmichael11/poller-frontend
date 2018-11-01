import React from 'react'
import ReactHighcharts from 'react-highcharts';


const BarChart = ({...props})=>{
  console.log('PROPS ON BARCHART', props)
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
                'fontSize': 25
              }
            },
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
      return (<ReactHighcharts 
        config={config}
        style={{
          margin: '0 auto',
          width: '80%',
        }}
      ></ReactHighcharts>)
  }
  

  export default BarChart;
