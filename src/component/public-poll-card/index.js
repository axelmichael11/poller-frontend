import React from 'react';
import PropTypes from 'prop-types';


import { Link, withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose } from 'recompose'

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const styles = theme =>({
    container: theme.overrides.MuiPaper.root,
    cardHeader:theme.overrides.PollCard.cardHeader
})

const PublicPollCard = ({question, subject, author_username, created_at, classes, theme, }) =>
<div className={classes.container}>
 <Paper square elevation={2} className={classes.container}>
    <Link to={{
        pathname:`/poll/${author_username}/${created_at}`,
        state: {question, subject, author_username, created_at }
        }}
        style={{ textDecoration: 'none' }}
        >
            <Card>
            <CardHeader
            // action={
            //   <IconButton>
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            className={classes.cardHeader}
          />
            <CardContent>
                <Typography variant="headline" component="h1">
                   "{question}"
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="subheading" component="p">
                    {subject}
                </Typography>
                <Typography variant="subheading" component="p">
                    {'Posted By: '+author_username}
                </Typography>
            </CardContent>
            </Card>
    </Link>
    </Paper>
</div>

PublicPollCard.propTypes = {
    classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
    author_username: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  };


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(PublicPollCard);