
import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';



class Loader extends React.Component{
    constructor(props){
        super(props)
        this.state={
            elapsed:0,
            limit:15000,
            start: this.props.start
        }
        this.tick = this.tick.bind(this)
    }

    componentDidMount(){
        this.timer = setInterval(this.tick, 50);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    tick(){
        if (this.state.elapsed < this.state.limit){
            this.setState({elapsed: new Date() - this.state.start});
        } else {
            this.props.timeError()
        }
    }

    render(){

        return (
            <div style={{textAlign:'center'}}>
                <CircularProgress style={{ color: "#000", textAlign:'center', margin:'auto'}} thickness={7} size={75}/>
            </div>
        );
    }
};

Loader.propTypes = {
    timeError: PropTypes.func.isRequired,
}


export default Loader