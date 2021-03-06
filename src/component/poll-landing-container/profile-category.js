import React from 'react'
import { connect } from 'react-redux'
import {recompose, compose} from 'recompose'


import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import {CardContent,
Toolbar,
Typography,
List,
ListItem,
Button,
ListItemText} from '@material-ui/core'

import country_list from '../../lib/countries.js'
import profession_list from '../../lib/professions.js'
import ethnicity_list from '../../lib/ethnicities.js'
import politics_list from '../../lib/politics.js'


const styles = theme => ({
  container: theme.overrides.MuiPaper,
  listContainer: theme.overrides.MuiListItem.container,
  listItem:theme.overrides.MuiListItem,
  cardHeader:theme.overrides.PollCard.cardHeader,
  cardContent:theme.overrides.PollCard.cardContent,
})


const ProfileCategory = ({...props})=> {
  let {classes} = props
  let {age, profession, religion, ethnicity, gender, country, politics} = props.userProfile

  let handleBool = function(category){
    if (category===true)
      return 'Religious';
    if (category=== false)
      return 'Not Religious';
    if (category===null )
      return 'Unknown';
  }

  let profileInformation = {
    'Age':age,
    'Profession':profession_list[profession], 
    'Religion': handleBool(religion), 
    'Ethnicity':ethnicity_list[ethnicity], 
    'Gender': gender, 
    'Country':country_list[country],
    'Politics': politics_list[politics]
  }

     return (
       <div>
        {Object.keys(profileInformation).map((category,i)=>
          <div key={i}> 
            <CardContent className={classes.cardContent}>
             <Toolbar className={classes.cardContent}>
              <Typography variant="subheading" style={{width:'50%'}}>
                {category}
              </Typography>
            <div className={classes.listContainer}>
              <List>
                <ListItem
                  button
                  className={classes.listItem}
                >
                  <ListItemText
                    primary={profileInformation[category] ? profileInformation[category]: "Unknown"}
                  />
                </ListItem>
              </List>
            </div>
          </Toolbar>
        </CardContent>
      </div>)}
    </div>
    )
}

export const mapStateToProps = state => ({
    userProfile: state.userProfile,
  })
  
export const mapDispatchToProps = dispatch => ({
})







export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(ProfileCategory);