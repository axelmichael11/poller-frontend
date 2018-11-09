import React from 'react'


import Typography from '@material-ui/core/Typography';


class NoProfile extends React.Component {
    
  render(){
    console.log("HITTING NO PROFILE");
      return(
        <div>
            <Typography variant="headline" component="h3" style={{width:'100%' , margin:'auto', textAlign:'center' }}>You don't have a profile!</Typography>
        </div>
      )
  }
}

export default NoProfile