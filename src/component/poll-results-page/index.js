//packages
import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PieResults from '../charts/yes-no-pie/index'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';


import randomColor from 'randomcolor'; // import the script
import {
  fetchVoteHistory
} from '../../action/vote-actions'

import TotalVotesGraph from '../charts/vote-totals/index'
import profession_data from '../../lib/professions.js'
import ethnicity_data from '../../lib/ethnicities.js'
import country_data from '../../lib/countries.js'
//Methods

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...



//Style
import { withStyles } from '@material-ui/core/styles';


import {Paper,
Card,
CardHeader,
CardMedia,
CardContent,
CardActions,
Collapse,
Avatar,
IconButton,
Typography,
red,
AppBar,
Toolbar,
Button} from '@material-ui/core'


import Delete from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';




const styles = theme =>({
  container: theme.overrides.MuiPaper.root,
  cardHeader:theme.overrides.PollCard.cardHeader,
  // typography: theme.typography.text,
  expand: {
    color:theme.palette.secondary.main,
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    display: 'flex',
  },
})

class PollResultsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pollData: this.props.pollData,
      noProfessionData: this.generatePieData(this.props.pollData.no_data.profession_data, profession_data),
      yesProfessionData: this.generatePieData(this.props.pollData.yes_data.profession_data, profession_data),
      professionCategories: this.generateCategories(this.props.pollData.yes_data.profession_data, this.props.pollData.no_data.profession_data, profession_data),
      //ethnicity data
      noEthnicityData: this.generatePieData(this.props.pollData.no_data.ethnicity_data, ethnicity_data),
      yesEthnicityData: this.generatePieData(this.props.pollData.yes_data.ethnicity_data, ethnicity_data),
      ethnicityCategories: this.generateCategories(this.props.pollData.yes_data.ethnicity_data, this.props.pollData.no_data.ethnicity_data, ethnicity_data),
      //age data
      noAgeData: this.generatePieData(this.props.pollData.no_data.age_data),
      yesAgeData: this.generatePieData(this.props.pollData.yes_data.age_data ),
      ageCategories: this.generateCategories(this.props.pollData.yes_data.age_data, this.props.pollData.no_data.age_data),
      //gender data
      noGenderData: this.generatePieData(this.props.pollData.no_data.gender_data),
      yesGenderData: this.generatePieData(this.props.pollData.yes_data.gender_data ),
      genderCategories: this.generateCategories(this.props.pollData.yes_data.gender_data, this.props.pollData.no_data.gender_data),
      //country data
      noCountryData: this.generatePieData(this.props.pollData.no_data.country_data, country_data),
      yesCountryData: this.generatePieData(this.props.pollData.yes_data.country_data, country_data ),
      countryCategories: this.generateCategories(this.props.pollData.yes_data.country_data, this.props.pollData.no_data.country_data, country_data),
      //religion data
      noReligionData: this.generatePieData(this.props.pollData.no_data.religion_data),
      yesReligionData: this.generatePieData(this.props.pollData.yes_data.religion_data ),
      religionCategories: this.generateCategories(this.props.pollData.yes_data.religion_data, this.props.pollData.no_data.religion_data),
      
      // politics data
      noPoliticsData: this.generatePieData(this.props.pollData.no_data.politics_data),
      yesPoliticsData: this.generatePieData(this.props.pollData.yes_data.politics_data ),
      politicsCategories: this.generateCategories(this.props.pollData.yes_data.politics_data, this.props.pollData.no_data.politics_data),
      

      //expanded state
      dataExpandedAge:false,
      dataExpandedEthnicity: false,
      dataExpandedReligion: false,
      dataExpandedPolitics: false,
      dataExpandedCountry: false,
      dataExpandedGender: false,
      dataExpandedProfession:false,
    }
    this.handleDataExpand = this.handleDataExpand.bind(this)
  }

  generatePieData(data_object,  demographic_list){
    let data_values = [];
    if (demographic_list) {
      Object.keys(data_object).map((key, i)=>{
        if (demographic_list[key]){
          return data_values.push({x: demographic_list[key], y: data_object[key]})
        } else {
          return data_values.push({x: key, y: data_object[key]})
        }
     })
    } else {
      Object.keys(data_object).map((key, i)=>{
        return data_values.push({x: key, y: data_object[key]})
     })
    }
    return data_values
  }
  

  generateCategories(yes_data_object, no_data_object, demographic_list){
    let data = [...Object.keys(yes_data_object), ...Object.keys(no_data_object)];
    let categories = {};
    if (demographic_list) {
      data.map((data)=>{
        if (demographic_list[data]){
          categories[demographic_list[data]] = randomColor();
        } else {
          categories[data]=randomColor();
        }
      })
    } else {
      data.map((data)=>{
          categories[data]=randomColor();
      })
    }
    return categories
  }

  handleDataExpand(value){
      this.setState(oldState=>{
        return {
        [value]: !oldState[value]
      }
    })
  }
  
  render() {
    let {classes} = this.props
    console.log('DATA', this.state);
    return (
      <div>
        <Paper square elevation={2} className={classes.container}>
          <Card>
            <TotalVotesGraph 
              totalVotesData={this.state.pollData.totals_data} 
              poll={this.props.poll}
            />
          </Card>
        </Paper>
        <PieResults title={'Age'}
        totalsData={this.props.pollData.totals_data} 
        yesData={this.state.yesAgeData} 
        noData={this.state.noAgeData} 
        categories={Object.keys(this.state.ageCategories)}
        colorCategories= {this.state.ageCategories}
        labelSentence={"have an age between"}
        // classes={classes}
        dataExpanded={this.state.dataExpandedAge}
        handleDataExpand={this.handleDataExpand}
        expandedState="dataExpandedAge"
        />
        <PieResults title={'Gender'}
        totalsData={this.props.pollData.totals_data} 
        yesData={this.state.yesGenderData} 
        noData={this.state.noGenderData} 
        categories={Object.keys(this.state.genderCategories)}
        colorCategories= {this.state.genderCategories}
        labelSentence={" are of gender "}
        // classes={classes}
        dataExpanded={this.state.dataExpandedGender}
        handleDataExpand={this.handleDataExpand}
        expandedState="dataExpandedGender"
        />
        <PieResults title={'Country'}
        totalsData={this.props.pollData.totals_data} 
        yesData={this.state.yesCountryData} 
        noData={this.state.noCountryData} 
        categories={Object.keys(this.state.countryCategories)}
        colorCategories= {this.state.countryCategories}
        labelSentence={" are from "}
        // classes={classes}
        dataExpanded={this.state.dataExpandedCountry}
        handleDataExpand={this.handleDataExpand}
        expandedState="dataExpandedCountry"
        />
        <PieResults title={'Profession'}
        totalsData={this.props.pollData.totals_data} 
        yesData={this.state.yesProfessionData} 
        noData={this.state.noProfessionData} 
        categories={Object.keys(this.state.professionCategories)}
        colorCategories= {this.state.professionCategories}
        labelSentence={" have a profession of "}
        // classes={classes}
        dataExpanded={this.state.dataExpandedProfession}
        handleDataExpand={this.handleDataExpand}
        expandedState="dataExpandedProfession"
        />
        <PieResults title={'Ethnicity'}
        totalsData={this.props.pollData.totals_data} 
        yesData={this.state.yesEthnicityData} 
        noData={this.state.noEthnicityData} 
        categories={Object.keys(this.state.ethnicityCategories)}
        colorCategories= {this.state.ethnicityCategories}
        labelSentence={" are of "}
        // classes={classes}
        dataExpanded={this.state.dataExpandedEthnicity}
        handleDataExpand={this.handleDataExpand}
        expandedState="dataExpandedEthnicity"
        />
        <PieResults title={'Religion'}
        totalsData={this.props.pollData.totals_data} 
        yesData={this.state.yesReligionData} 
        noData={this.state.noReligionData} 
        categories={Object.keys(this.state.religionCategories)}
        colorCategories= {this.state.religionCategories}
        labelSentence={" are "}
        // classes={classes}
        dataExpanded={this.state.dataExpandedReligion}
        handleDataExpand={this.handleDataExpand}
        expandedState="dataExpandedReligion"
        />
        <PieResults title={'Politics'}
        totalsData={this.props.pollData.totals_data} 
        yesData={this.state.yesPoliticsData} 
        noData={this.state.noPoliticsData} 
        categories={Object.keys(this.state.politicsCategories)}
        colorCategories= {this.state.politicsCategories}
        labelSentence={" are "}
        // classes={classes}
        dataExpanded={this.state.dataExpandedPolitics}
        handleDataExpand={this.handleDataExpand}
        expandedState="dataExpandedPolitics"
        />
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
})

export const mapDispatchToProps = dispatch => ({
})



export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(PollResultsPage);