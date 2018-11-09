import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


class Callback extends Component {
  componentDidMount(){
    this.props.handleCallBackAuthentication(this.props)
  }
  render() {
    return (
      <div style={{ color: "#000", textAlign:'center', margin:'auto'}}>
        <CircularProgress style={{ color: "#000", textAlign:'center', margin:'auto'}} thickness={7} size={75}/>
      </div>
    );
  }
}

export default Callback;