import ReactHighcharts from 'react-highcharts';


const TotalsGraph = ({...props})=>{
    console.log('classes on votebutton', props)
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
          style: props.style,
          type: 'column',
          animation: {
            duration: 1000,
            easing: this.easeOutBounce
          },
          marginTop: 30,
          marginBottom: 30,
        },
        title: {
          text:null,
        },
        series: [{
          data: props.renderDemographicData(),
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
      return (<ReactHighcharts config={config}></ReactHighcharts>)
  }
  

  export default TotalsGraph;
