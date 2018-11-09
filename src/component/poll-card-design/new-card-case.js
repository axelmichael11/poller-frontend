import React from 'react';
import PropTypes from 'prop-types';
import Date from 'datejs'

import { Link, withRouter } from 'react-router-dom'
import {  compose } from 'recompose'
import subjects_list from '../../lib/poll-subjects'
import { withStyles } from '@material-ui/core/styles';


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
import {QuestionExpandWithStyle, QuestionCardContentWithStyle} from '../poll-landing-container/display-question'


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


const CardCase = ({...props}) =>{
    //classes, theme, props.pollActions, poll,
    return (
    <div className={props.classes.container}>
    <Paper square elevation={2} className={props.classes.container}>
                <Card style={{padding:7}}>
                <Typography variant="subheading" component="p">
                        {props.poll.author_username}:
                    </Typography>
                <QuestionCardContentWithStyle
                  authorUsername={props.poll.author_username}
                  question={props.poll.question}
                  questionExpanded={this.state.questionExpanded}
                />
                <CardContent>
                <Typography variant="subheading" component="p">
                        {subjects_list[props.poll.subject]}
                    </Typography>
                <Typography variant="subheading" component="p">
                        Poll Expiration: {props.poll.expiration} hours
                    </Typography>
                </CardContent>
                </Card>
        </Paper>
    </div>
    )
}


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(CardCase);