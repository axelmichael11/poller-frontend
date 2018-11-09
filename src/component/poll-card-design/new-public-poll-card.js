import React from 'react';
import PropTypes from 'prop-types';
import Date from 'datejs'

import { Link, withRouter } from 'react-router-dom'
import {  compose } from 'recompose'
import subjects_list from '../../lib/poll-subjects'
import { withStyles } from '@material-ui/core/styles';
import CardCase from './new-card-case.js'

import {Paper,
classnames,
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
Button } from '@material-ui/core'

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import PublicPollTotals from '../charts/highcharts/public-totals';
import AnswerOptionsDisplay from './answer-options-display';

const styles = theme =>({
    container: theme.overrides.MuiPaper.root,
    cardHeader:theme.overrides.PollCard.cardHeader,
    deleteButton: theme.overrides.MuiIcon,
    titleFont:{
        title: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        }
    },
    cardContent:{
        root:{
          wordWrap: 'break-word'
        }
      }
})


class NewPublicPollCard extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
        this.renderAnwerOptions = this.renderAnwerOptions.bind(this)
    }
    renderAnwerOptions(){
        let {categories} = this.props
        (Object.keys(props.categories).map((category, key)=>{
            return  (<div key={key}>
                        <Typography component='p'>
                        {category}: {props.categories[category]}
                        </Typography>
                    </div>
                )
             })
        )
    }
    render(){
            return (
                <div>
                    <Paper square elevation={2} className={this.props.classes.container}>
                    <Card style={{padding:7}}>
                    <div style={{width:'5%', textAlign:'right', float:'right'}}>
                        {this.props.pollActions()}
                        </div>
                <CardContent>
                    <Typography variant="subheading" component="p" style={{width:'50%'}}>
                            {this.props.poll.author_username}:
                        </Typography>
                </CardContent>
                <Link to={{
                    pathname:`/poll/${this.props.poll.author_username}/${this.props.poll.created_at}`,
                    state: this.props.poll,
                }}
                style={{ textDecoration: 'none' }}>
                <CardContent>
                                <Typography variant="display3" style={{overflowWrap:'break-word'}}>
                                "{this.props.poll.question}"
                                </Typography>
                </CardContent>
                            <div>
                            {this.props.poll.quickTotals && <PublicPollTotals quickTotals={this.props.poll.quickTotals}/>} 
                            {!this.props.poll.quickTotals && <AnswerOptionsDisplay categories={this.props.poll.categories}/>}
                            </div>
                <CardContent>
                    <Typography variant="subheading" component="p">
                            {subjects_list[this.props.poll.subject]}
                        </Typography>
                    <Typography variant="subheading" component="p">
                            Poll Expiration: {this.props.poll.expiration} hours
                        </Typography>
                </CardContent>
                </Link>
                    </Card>
            </Paper>
        </div>
        )
    }
}


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(NewPublicPollCard);