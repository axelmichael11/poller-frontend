//packages
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';


import randomColor from 'randomcolor'; // import the script

//Methods


//These will be used, to store id of the user in the database...



//Style

import { withStyles } from '@material-ui/core/styles';



import { 
  Popover,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuList,
    MenuItem,
    Toolbar,
    Button } from '@material-ui/core'
    
    
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';




const styles = theme =>({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  container:{
    display:'inline-block'
  },
    selectedItem:{
      backgroundColor: 'rgb(10,2,8,0.6)',
      color: theme.palette.secondary.main
  },
  unselectedItem:{
      backgroundColor: 'rgb(255,255,255, 0.6)',
      color: theme.palette.primary.main
  },

})

class ChartDesign extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      chartTypes: this.props.chartTypes,
      chartOptions: this.props.chartOptions,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
  }
  getchartOptions(){

  }

  handleClick(event){
    console.log('ANCHOR EL', event.currentTarget)
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose(){
    this.setState({ anchorEl: null });
  };
  
  render() {
    let {classes, theme} = this.props
    let {anchorEl} = this.state;
    let {chartTypes , chartOptions} = this.props;

    return (
      <div className={classes.container}>
          <Button 
            // buttonRef={node => {
            //   anchorEl = node;
            // }}
            aria-haspopup="true"
            aria-owns={Boolean(anchorEl) ? 'simple-popper' : undefined}
            size="small"
            variant="contained" 
            color="primary" 
            onClick={this.handleClick}>
          <AddIcon />
        </Button>
        <Popover
          id="simple-popper"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style:{
              // maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
              backgroundColor: "rgb(0, 0, 0)",
    //     /* RGBa with 0.6 opacity */
              backgroundColor: "rgba(0, 0, 0, 0.3)"
            }
          }}
        >
        <MenuList
        >
        {this.props.renderChartDesignOptions}
        </MenuList>
        </Popover>
      </div>
    )
  }
}

// <Menu
// id="long-menu"
// anchorEl={anchorEl}
// open={Boolean(anchorEl)}
// onClose={this.handleClose}
// PaperProps={{
//   root:{
//   },
//   style:{
//     maxHeight: ITEM_HEIGHT * 4.5,
//     width: 200,
//     backgroundColor: "rgb(0, 0, 0)",
    /* RGBa with 0.6 opacity */
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
  // }
// // }}
// paper={{
//   top:'6em',

// }}
// classes={{top:'6em'}}
// // className={theme.menu}
// >
// {this.props.renderChartDesignOptions}
// </Menu> */}



export const mapStateToProps = state => ({
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
  })

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(ChartDesign);