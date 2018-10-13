import React from 'react';
import PropTypes from 'prop-types';
import Date from 'datejs'

import { Link, withRouter } from 'react-router-dom'
import {  compose } from 'recompose'
import subjects_list from '../../lib/poll-subjects'
import { withStyles } from '@material-ui/core/styles';
import CardCase from './card-case'

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
    cardContent:{
        root:{
          wordWrap: 'break-word'
        }
      }
})


const PublicPollCard = ({...props }) =>{
    return (
    <div className={props.classes.container}>
        <CardCase {...props}>
                <Link to={{
                pathname:`/poll/${props.poll.author_username}/${props.poll.created_at}`,
                state: props.poll,
                }}
                style={{ textDecoration: 'none' }}>
                    <CardContent className={props.classes.cardContent}>
                        <Typography variant="display3" style={{overflowWrap:'break-word'}}>
                        "{props.poll.question}"
                        </Typography>
                    </CardContent>
                </Link>
        </CardCase>
    </div>
    )
}


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(PublicPollCard);