import React from 'react'


export const RenderAxis = ({ scales, margins, svgDimensions }) => {
  const { height, width } = svgDimensions

  const xProps = {
    orient: 'Bottom',
    scale: scales.xScale,
    translate: `translate(0, ${height - margins.bottom})`,
    tickSize: height - margins.top - margins.bottom,
  }

  const yProps = {
    orient: 'Left',
    scale: scales.yScale,
    translate: `translate(${margins.left}, 0)`,
    tickSize: width - margins.left - margins.right,
  }

  return (
    <g>
      <Axis {...xProps} />
      <Axis {...yProps} />
    </g>
  )
}




import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis()
  }

  componentDidUpdate() {
    this.renderAxis()
  }

  renderAxis() {
    const axisType = `axis${this.props.orient}`
    const axis = d3Axis[axisType]()
      .scale(this.props.scale)
      .tickSize(-this.props.tickSize)
      .tickPadding([12])
      .ticks([4])

    d3Select(this.axisElement).call(axis)
  }

  render() {
      console.log('axis element', this.axisElement, 'scale',this.props.scale(), this.props.scales, 'ticksss', this.props.tickSize)
    return (
      <g
        className={`Axis Axis-${this.props.orient}`}
        ref={(el) => { this.axisElement = el; }}
        transform={this.props.translate}
        fill={'#ffffff'}
      />
    )
  }
}

