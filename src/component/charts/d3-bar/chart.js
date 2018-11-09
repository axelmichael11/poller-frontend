import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import * as D3 from 'd3'

import {RenderAxis} from './axis'
import Bars from './bars'

import ResponsiveChart from './responsive-chart'

export default class Chart extends Component {
    constructor() {
      super()
      this.xScale = scaleBand()
      this.yScale = scaleLinear()
    }
  
    render() {

      const margins = { top: 50, right: 20, bottom: 100, left: 60 }
      const svgDimensions = {
        width: Math.max(this.props.parentWidth, 300),
        height: 500
      }
      const maxValue = Math.max(...this.props.data.map(d => d.y))
      
      // scaleBand type
      const xScale = this.xScale
        .padding(0.5)
        .domain(this.props.data.map(d => d.x))
        .range([margins.left, svgDimensions.width - margins.right])
    
       // scaleLinear type
      const yScale = this.yScale
        .domain([0, maxValue])
        .range([svgDimensions.height - margins.bottom, margins.top])


        const ptags = D3.selectAll("p")
        console.log("P TAGS", ptags)
        
      return (
        <svg width={svgDimensions.width} height={svgDimensions.height}>
           <RenderAxis
            scales={{ xScale, yScale }}
            margins={margins}
            svgDimensions={svgDimensions}
            />
            <Bars
            scales={{ xScale, yScale }}
            margins={margins}
            data={this.props.data}
            maxValue={maxValue}
            svgDimensions={svgDimensions}
            />
        </svg>
      )
    }
  }