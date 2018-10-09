import React from 'react'


import Typography from '@material-ui/core/Typography';


class NoPolls extends React.Component {
  render(){
      return(
        <div>
            <Typography variant="headline" component="h3" style={{width:'100%' , margin:'auto', textAlign:'center' }}>You don't have any polls...</Typography>
        </div>
      )
  }
}

export default NoPolls