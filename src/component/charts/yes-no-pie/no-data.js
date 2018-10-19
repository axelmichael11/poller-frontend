import React from 'react'

  import Typography from '@material-ui/core/Typography';


class NoData extends React.Component {
  
  render(){
      return(
        <div className="no-data">
            <Typography variant="subheading" component="h3" style={{width:'100%' , margin:'auto', }} >No has one voted this way...</Typography>
        </div>
      )
  }
}

export default NoData