import React from 'react'
import * as d3 from 'd3'
import { withStyles } from '@material-ui/core/styles';



import { scaleBand, scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
 
import {easePolyInOut} from 'd3-ease'
import {axisbottom} from 'd3-axis'

// import {container} from 'd3-container'

class BarChart extends React.Component {
   constructor(props){
      super(props)
      this.state = {
        margin : {
          top: this.props.size[1]*(this.props.size[1]/20),
          right: this.props.size[0]*(this.props.size[0]/20),
          bottom: this.props.size[0]*(this.props.size[0]/20), 
          left: this.props.size[0]*(this.props.size[0]/20),
        },
      }

      this.xScale = scaleBand()
      this.yScale = scaleLinear()
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
    }
    createBarChart() {
        const node = this.node
        const dataMax = 100
        
        const y = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]])

        const x = scaleLinear()
        .domain([0, this.props.answerFilters.length])
        .range([0, this.props.size[0]]);
        
        // scaleLinear()
        // .domain([0, this.props.data.length])
        // .range([0, this.props.size[0]])


    console.log('NODE', node)
    let margin = {top: 80, right: 20, bottom: 80, left: 50};
    let width = 400 - margin.left - margin.right;
    let height = 270 - margin.top - margin.bottom;

    // console.log('MARGIN', margin, 'WIDTH',width,'HIEGHT',height)
    var barWidth = width / this.props.data.length;

    // var xAxis = d3.svg.axis()
    //         .orient("bottom")
    //         .scale(x)
    //         .tickFormat(date_format);


   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()
   
   select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#000')
      .attr('height', d => {
        console.log('HEIGHT ATTRI', d, y(d.y))
        return easePolyInOut(y(d.y))
      })
    .attr('width', d => {
      console.log('WIDTH ATTRI', d, x(this.props.data.length))
      return 75;
    })
      .attr('x', (d,i) => {
          let tick = i+1;
          let amount = this.props.size[0] / this.props.data.length;
          console.log('X', d, this.props.size[0], 'x', x(tick), this.props.size[0] - x(tick))
          return this.props.size[0] - x(tick)
        })
      .attr('y', d => {
          console.log('Y', d, this.props.size[1], y(d.y),this.props.size[1] - y(d.y))
          return this.props.size[1] - y(d.y)
        })
      

      // console.log('axis bottom', d3.axisBottom)
      // var xAxis = d3.axisBottom().scale(x);

      // select(node)
      // .selectAll('rect')
      // .append('g')
      // .attr("class", "x axis")
      // .attr("transform", "translate(0," + this.props.size[1]+")")
      // .call(xAxis);


    

   }
render() {
    console.log('GRAPH STATE', this.props.data)
      return <svg 
      ref={node => this.node = node}
      width={500} height={500}
      
      id="chart"
      viewBox="0 0 960 500"
      preserveAspectRatio="xMidYMid meet">
      >
      </svg>
   }
}
export default BarChart