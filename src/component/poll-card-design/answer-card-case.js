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
    clearSpace: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: '5em',
    },
    cardContent:{
        root:{
          wordWrap: 'break-word'
        }
      }
})


const AnswerCardCase = ({...props}) =>{
    return (
    <div className={props.classes.container}>
    <Paper square elevation={2} className={props.classes.container}>
                <Card style={{padding:7}}>
                <CardHeader
                    action={props.pollActions}
                    className={props.classes.cardHeader}
                    title={props.poll.author_username}
                    classes={{
                        title: props.classes.cardHeader
                    }}
                    style={{
                        // paddingTop: '5em'
                    }}
                />
                {props.children}
                </Card>
        </Paper>
    </div>
    )
}


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(AnswerCardCase);