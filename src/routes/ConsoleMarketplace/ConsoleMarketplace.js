import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import LeftDrawer from '../../container/Drawers/LeftDrawer/Sidebar/Sidebar';
import DestinationButton from '../../container/Utility/ConsoleMarket/ConsoleMarket';
import Searchbar from '../../container/UI/Searchbar/Searchbar';

import OneComp from '../../container/MarketComponents/Components/ComponentCard';

const useStyles = makeStyles((theme) => ({
	marketRoot: {
		display: 'flex',
		background: '#efefef',
		height: '100%',
		width: '100%',
	},
	content: {
		display: 'flex',
		flexFlow: 'column',
		justifyContent: 'space-around',
		position: 'relative',
		width: '100%',
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	toolbar: {
		display: 'block',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		marginBottom: '3rem',
	},
	searchArea: {
		display: 'flex',
		width: '100%',
		marginBottom: '30px',
	},
	componentlist: {
		padding: '0 0.5rem',
	}
}));

export default function Marketplace(props) {
	const classes = useStyles();

	const destination = <DestinationButton destination={'console'} />;

	return (
		<div className={classes.marketRoot}>
			<CssBaseline />
			<LeftDrawer
				leftDrawerOpen={props.isDrawerOpen}
				setDrawerState={props.handleDrawerState}
				darkMode={props.darkMode}
				destinationRoute={destination}
			/>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<div className={classes.searchArea}>
					<Searchbar />
				</div>
				<div className={classes.componentlist}>
					<Grid container spacing={3}>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((el, i) => (<OneComp key={i} />))}
					</Grid>
				</div>
			</main>
		</div>
	);
}
