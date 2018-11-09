import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale'

import {RenderAxis} from './axis'
import Bars from './bars'

export default class PracticeChart extends Component {
    constructor() {
      super()
      this.xScale = scaleBand()
      this.yScale = scaleLinear()
    }
  
    render() {
      const margins = { top: 50, right: 20, bottom: 100, left: 60 }
      const svgDimensions = { width: this.props.size[0], height:this.props.size[1]}
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