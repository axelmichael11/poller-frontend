import React from 'react'
import {  compose, branch, renderComponent} from 'recompose'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import UpArrow from '@material-ui/icons/arrowupward'
import Scroll from 'react-scroll'


const Link       = Scroll.Link;
const scrollSpy  = Scroll.scrollSpy;




const styles = theme =>({
  container: {
    margin: 'auto',
    maxWidth: '750px'
  },
  innerContainer:{
    margin:'auto',

  },
  button: theme.overrides.MuiButton.root,
})

 const QuickScroll = ({...props}) => {
      return(
      <div className={props.classes.container}>
      <div className={props.classes.innerContainer}>
      <Link activeClass="active" to="app" spy={true} smooth={true} offset={-5} duration={700}>
        <Button
          size="small" 
          color="primary" 
          aria-label="Add"
          className={props.classes.button}
          id="quick-scroll">
          <UpArrow/>
        </Button>
      </Link>
        </div>
        </div>
      )
}


const withQuickScroll =(conditionFn) => (Component) => 
  class WithQuickScroll extends React.Component {
  render() {
    console.log('QUICK SCROLL UP', conditionFn(this.props))
    return (
      <div>
        <Component {...this.props} />
        <div>
        {conditionFn(this.props) && <QuickScroll/>}
        </div>
      </div>
    )
  }
}


const quickScrollCondition = props =>
 props.pageYOffset > props.innerHeight


export default  compose(
  withStyles(styles, {withTheme:true})
)(QuickScroll)