import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';
import {compose} from 'recompose'


import SwipeableViews from 'react-swipeable-views';



import {MobileStepper,
Typography,
Button,
Paper,
StepLabel} from '@material-ui/core'


import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


import BarChart from '../charts/highcharts/bar-chart'





const styles = theme => ({
    container: theme.overrides.MuiPaper,
    containerDiv: theme.overrides.MuiPaper.root,
    
    headingText:{
        backgroundColor:theme.palette.primaryColor,
        color: theme.palette.primary.secondaryColor,
        fontFamily: theme.typography.fontFamily,
        textAlign:'center',
        margin:25,
    },
    footingText:{
        color: theme.palette.primary.contrastText,
        fontFamily: theme.typography.fontFamily,
        fontSize:15
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit * 2,
        marginBottom: 10,
        backgroundColor: theme.palette.primary.main,
    },
    button:{
        display:'inline-block',
        width:'10%',
        height: '40%',
    },
    graph:{
        width: '75%',
        display:'inline-block',
    }
});

class RenderSwipeGraphs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pollData: this.props.pollData,
            graphIndex:0,
            noDataSelected : {
                categories:['No Data Selected'],
                data: [{
                  name: 'Unknown Data',
                    y: 0,
                    color: '#FFFFFF',
                }]
              },
              pageWidth: window.innerWidth || document.body.clientWidth,
              smallScreenStyle:{
                  fontFamily: '5px'
              },
              mediumScreenStyle:{
                fontFamily: '8px'
            },
            largeScreenStyle:{
                fontFamily: '12px'
            },
            // answerFilters: this.props.answerFilters,
        }
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleStepChange = this.handleStepChange.bind(this)
        this.renderChartStyle = this.renderChartStyle.bind(this)
        this.updateWidthPosition = this.updateWidthPosition.bind(this)
        //renderData methods
      }

      componentDidMount(){
        window.addEventListener('resize', ()=>this.updateWidthPosition(), true);
      }

      handleNext (){
        this.setState(prevState => ({
          graphIndex: prevState.graphIndex + 1,
        }));
      };
    
      handleBack (){
        this.setState(prevState => ({
          graphIndex: prevState.graphIndex - 1,
        }));
      };
    
      handleStepChange (graphIndex) {
        this.setState({ graphIndex });
      };

      updateWidthPosition(){
        this.setState({
            pageWidth: window.innerWidth || document.body.clientWidth,
          });
      }
      renderChartStyle(){
          return {
              fontSize:'1em'
          }
      }


  render() {
    const { classes, theme } = this.props;
    const maxSteps = this.props.chartData.length;
    const {graphIndex} = this.state;

    return (
      <div className={classes.containerDiv}>
       
        <div 
        style={{
            display : 'flex',
            alignItems :' center',
          }}>
        <Button size="small"  
            className={classes.button} 
            onClick={this.handleBack} 
            disabled={graphIndex === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </Button>
        <div className={classes.graph}>
            <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.graphIndex}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents
            >
            {this.props.chartData.map((graph, key) => {
                if (Object.keys(this.props.answerFilters).length){
                    return (
                    <div key={key}>
                        <Typography 
                        variant="display2" style={{margin:'1em 0'}}>{graph.title} Vote Results</Typography>
                        <BarChart 
                            data={graph.data} 
                            categories={graph.categories}
                            chartOptions={this.props.chartOptions}
                        />
                    </div>
                    )
                } else {
                    return (
                    <div key={key}>
                        <Typography 
                        variant="display2" style={{margin:'1em 0'}}>{graph.title} Vote Results</Typography>
                        <Typography 
                        variant="display2" style={{fontSize:'3em', margin:'50% auto'}}>No Answers Selected</Typography>
                    </div>
                    )
                }
            })}
            </SwipeableViews>
            </div>
            <Button 
            size="small" 
            className={classes.button} 
            onClick={this.handleNext} 
            disabled={graphIndex === maxSteps - 1}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
      </div>
      <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={graphIndex}
          style={{backgroundColor:'white'}}
          nextButton={<div></div>}
          backButton={<div></div>}
        />
    </div>
    );
  }
}

RenderSwipeGraphs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

  
  export default compose(
    withRouter,
    withStyles(styles, { withTheme: true }),
  )(RenderSwipeGraphs)