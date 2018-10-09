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
    cardContent:{
        root:{
          wordWrap: 'break-word'
        }
      }
})


const UserPollCard = ({classes, theme, pollActions, poll }) =>{
    return (
    <div className={classes.container}>
    <Paper square elevation={2} className={classes.container}>
                <Card style={{padding:7}}>
                <CardHeader
                    action={pollActions}
                    className={classes.cardHeader}
                    title={poll.author_username}
                    classes={{
                        title: classes.cardHeader
                    }}
                />
                <Link to={{
                pathname:`/poll/${poll.author_username}/${poll.created_at}`,
                state: poll,
                }}
                style={{ textDecoration: 'none' }}
                >
                <CardContent className={classes.cardContent}>
                    <Typography variant="display3" style={{overflowWrap:'break-word'}}>
                    "{poll.question}"
                    </Typography>
                </CardContent>
                <CardContent>
                <Typography variant="subheading" component="p">
                        {subjects_list[poll.subject]}
                    </Typography>
                <Typography variant="subheading" component="p">
                        Poll Expiration: {poll.expiration} hours
                    </Typography>
                </CardContent>
                </Link>
                </Card>
        </Paper>
    </div>
    )
}


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(UserPollCard);