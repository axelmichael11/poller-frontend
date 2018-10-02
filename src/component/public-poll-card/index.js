import React from 'react';
import PropTypes from 'prop-types';


import { Link, withRouter } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose } from 'recompose'
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
Toolbar} from '@material-ui/core'

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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