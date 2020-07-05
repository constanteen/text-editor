import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';

import ListSubheader from '@material-ui/core/ListSubheader';

import ComponentListItems from '../Nav/ComponentList';

import { LEFT_DRAWER_WIDTH } from '../../../Utility/constants';
import {
	dmBackground,
	dmIconColorTwo,
	dmBackgroundTwo,
	colorWhite,
} from '../../../UI/StyleValues/StyleValues';

const drawerWidth = LEFT_DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
	leftDrawerRoot: {
		display: 'flex',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	leftDrawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	leftDrawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(9),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	drawerOpenTwo: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		zIndex: theme.zIndex.drawer + 2,
		overflowX: 'hidden',
	},
	drawerCloseTwo: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(9) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		'&:hover': {
			color: colorWhite,
		},
	},
	listItems: {
		height: '100%',
		overflowX: 'hidden',
	},
	marketListItem: {
		marginTop: '5px',
		padding: '1px 0',
	},
	subheader: {
		backgroundColor: colorWhite,
	},
	// Dark Mode Styling
	darkBackground: {
		background: dmBackground,
		transition: 'all 0.5s',
	},
	darkIconColor: {
		'& *': {
			color: dmIconColorTwo,
		},
	},
	lightIcons: {
		'& *': {
			color: colorWhite,
		},
	},
	darksubheader: {
		backgroundColor: dmBackground,
	},
	darkMarketListItem: {
		'&:hover': {
			backgroundColor: dmBackgroundTwo,
			color: colorWhite,
			transition: 'all 0.5s',
		}
	}
}));

export default function Sidebar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const open = props.leftDrawerOpen;
	const mode = props.darkMode;
	const [isShown, setIsShown] = React.useState(open); // sets and triggers hover effect

	React.useEffect(() => {
		setIsShown(open);
	}, [open]);

	// There are two situations where the sidebar is shown.
	// When the menu button is clicked, and the drawer is opened, there's a close toolbar.
	// The toolbar is saved in the variable below
	const closeIcon = (
		<div className={classes.toolbar}>
			<IconButton
				onClick={() => {
					props.setDrawerState();
					setIsShown(false);
				}}
			>
				{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
			</IconButton>
		</div>
	);

	return (
		<div className={classes.leftDrawerRoot}>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.leftDrawerOpen]: open,
					[classes.leftDrawerClose]: !open,
					[classes.drawerOpenTwo]: isShown,
					[classes.drawerCloseTwo]: !isShown,
					[classes.darkBackground]: mode,
					[classes.lightIcons]: mode && !open,
					[classes.lightIcons]: mode && !isShown,
					[classes.darkIconColor]: mode && open,
					[classes.darkIconColor]: mode && isShown,
				})}
				classes={{
					paper: clsx(classes.drawer, {
						[classes.leftDrawerOpen]: open,
						[classes.leftDrawerClose]: !open,
						[classes.drawerOpenTwo]: isShown,
						[classes.drawerCloseTwo]: !isShown,
						[classes.darkBackground]: mode,
						[classes.lightIcons]: mode && !open,
						[classes.lightIcons]: mode && !isShown,
						[classes.darkIconColor]: mode && open,
						[classes.darkIconColor]: mode && isShown,
					}),
				}}
				onMouseEnter={() => setIsShown(true)}
				onMouseLeave={() => {
					open ? setIsShown(true) : setIsShown(false);
				}}
			>
				{open ? closeIcon : <div className={classes.toolbar}></div>
				// if open is true, we can have the close icon at the top of the drawer and when close is clicked,
				// everything closes immediately.
				}
				<Divider />
				<div className={classes.listItems}>
					<List
						className={clsx(classes.marketListItem, {
							[classes.darkMarketListItem]: mode,
						})}
					>
						{props.destinationRoute}
					</List>
					<Divider />
					<List
						component="nav"
						aria-labelledby="nested-list-subheader"
						className={clsx(classes.subheader, {
							[classes.darksubheader]: mode,
						})}
						subheader={
							<ListSubheader component="div" id="nested-list-subheader">
								Components
							</ListSubheader>
						}
					>
						<ComponentListItems mode={props.darkMode} />
					</List>
				</div>
				<Divider />
			</Drawer>
		</div>
	);
}
