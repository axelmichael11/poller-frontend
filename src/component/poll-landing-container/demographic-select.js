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
  Popper,
  Grow,
  Dialog,
  List,
  ListItem,
  ListItemText,
  Menu,
    MenuItem,
    Toolbar,
    Button } from '@material-ui/core'
    
    
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


const ITEM_HEIGHT = 48;


const styles = theme =>({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },

  selectedItem:{
    backgroundColor: 'rgb(10,2,8,0.6)',
    color: theme.palette.secondary.main
},
unselectedItem:{
    backgroundColor: 'rgb(255,255,255, 0.6)',
    color: theme.palette.primary.main
},
menu:{
  paper:{

    backgroundColor: "rgb(0, 0, 0)",
    /* RGBa with 0.6 opacity */
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  }
}
 
})

class DemographicSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      demographicAnchorEl: null,
      demographicLabels: this.props.demographicLabels,
      selectedDemographics: this.props.selectedDemographics,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
  }
  getSelectedDemographics(){

  }

  handleClick(event){
    this.setState({ demographicAnchorEl: event.currentTarget });
  };

  handleClose(){
    this.setState({ demographicAnchorEl: null });
  };
  
  render() {
    let {classes, theme} = this.props
    let {demographicAnchorEl} = this.state;
    let {demographicLabels , selectedDemographics} = this.props;
    console.log('DEMOGRAPHIC SELECT', this.state , this.props, 'PROFILE',this.props.userProfile ,
    'DEMOGRAPHIC LABELS',Object.values(demographicLabels),'SELECTED DEMOGRAPHIS ON MENU LISTTTT',Object.values(selectedDemographics), );

    return (
      <div>
          <Button 
            variant="fab" 
            color="primary" 
            aria-label="Add" 
            className={classes.fab}
            onClick={this.handleClick}>
          <AddIcon />
        </Button>
        {/* <Popper 
          anchorEl={demographicAnchorEl}
          open={Boolean(demographicAnchorEl)}
         transition 
         disablePortal>
            {() => {
              return (
              <Grow
                // {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: 'center top'}}
              > */}
          <Menu
            id="long-menu"
            anchorEl={demographicAnchorEl}
            open={Boolean(demographicAnchorEl)}
            onClose={this.handleClose}
            // onChange={this.props.handleDemographicChange}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200,
                backgroundColor: "rgb(0, 0, 0)",
                /* RGBa with 0.6 opacity */
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              },
            }}
            className={theme.menu}
          >
            {this.props.renderDemographicList}
          </Menu>
        {/* </Grow>
        )
        }}
        </Popper> */}
        
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    userProfile: state.userProfile,
  })
  
  export const mapDispatchToProps = dispatch => ({
  })

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(DemographicSelect);