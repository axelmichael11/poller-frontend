
import React from 'react'

import Typography from '@material-ui/core/Typography';




class HoverLabel extends React.Component {
    render() {
      const {x, y, orientation, title, vote} = this.props;
      if (x =="Unknown"){
          return <Typography variant="title" component="h3">{`${y} of voters who voted ${vote} have an Unknown ${this.props.title}`}</Typography>
      } else {
        return <Typography variant="title" component="h3">{`${y} of voters who voted ${vote} are ${x}`}</Typography>
      }
    }
}

export default HoverLabel