import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import UpdateIcon from '@material-ui/icons/Update';
import GetAppIcon from '@material-ui/icons/GetApp';

import img from '../../../assets/images/k-logo.png';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
	},
	media: {
		height: 60,
		backgroundSize: 'auto',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	actionOptions: {
		display: 'flex',
		alignItems: 'center',
	},
	actionOptionsText: {
		paddingLeft: '.5rem',
	},
	actionOptionsIcon: {
		color: '#5a5a5a',
	},
}));

export default function MediaCard() {
	const classes = useStyles();

	return (
		<Grid item xs={6} sm={4}>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={img}
						title="conponent logo"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							Kylantis
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							With Kylantis component you can do a lot of awesome, crazy,
							important things without thinking too much about what to do.
						</Typography>
					</CardContent>
				</CardActionArea>
				<Divider />
				<CardActions>
					<Grid container spacing={1}>
						<Grid item xs className={classes.actionOptions}>
							<UpdateIcon className={classes.actionOptionsIcon} />
							<Typography
								variant="caption"
								className={classes.actionOptionsText}
								color="textSecondary"
								component="p"
							>
								Updated an hour ago
							</Typography>
						</Grid>
						<Grid item xs className={classes.actionOptions}>
							<GetAppIcon className={classes.actionOptionsIcon} />
							<Typography
								variant="caption"
								className={classes.actionOptionsText}
								color="textSecondary"
								component="p"
							>
								5,000 downloads
							</Typography>
						</Grid>
					</Grid>
				</CardActions>
			</Card>
		</Grid>
	);
}
