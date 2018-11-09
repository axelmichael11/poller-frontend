import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'



export default class Bars extends Component {
    constructor(props) {
      super(props)
    }
  
    render() {
      const { scales, margins, data, svgDimensions } = this.props
      console.log('PROPS ON BARS', scales, margins, data, svgDimensions)
      const { xScale, yScale } = scales
  
      const bars = (
        data.map((datum,i) =>
          <rect
            key={datum.x}
            x={xScale(datum.x)}
            y={yScale(datum.y)}
            height={svgDimensions.height - margins.bottom - scales.yScale(datum.y)}
            width={xScale.bandwidth()}
          />,
        )
      )
  
      return (
        <g>{bars}</g>
      )
    }
  }