import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { RIGHT_DRAWER_WIDTH } from '../../../Utility/constants';
import InnerSidebar from '../InnerSidebar/InnerSidebar';

import {
	dmBackground,
	dmIconColor,
	colorBlack,
	lightGreyOne,
	dmBackgroundTwo,
} from '../../../UI/StyleValues/StyleValues';

const drawerWidth = RIGHT_DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
	rightDrawerRoot: {
		display: 'flex'
	},
	drawer: {
		zIndex: 100,
		flexShrink: 0,
	},
	rightDrawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create(['width', 'height'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		overflowX: 'hidden',
		zIndex: theme.zIndex.drawer + 2,
	},
	rightDrawerClose: {
		transition: theme.transitions.create(['width', 'height'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflow: 'hidden',
		width: theme.spacing(2) + 5,
	},
	rightDrawerTab: {
		// height: '100%'
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	toolBarIcon: {
		color: 'transparent',
	},
	insideSidebar: {
		display: 'flex',
		height: '100%',
	},
	insideSidebarOpen: {
		overflow: 'auto',
	},
	insideSidebarClosed: {
		overflow: 'hidden',
	},
	lightDrawerBar: {
		cursor: 'pointer',
		width: '100%',
		paddingLeft: '1.5rem',
		borderRight: '1px solid #ececec',
		transition: 'all .3s',
	},
	lightDrawerIcon: {
		color: colorBlack,
		'&:hover': {
			background: lightGreyOne,
		},
	},
	iconSpan: {
		position: 'absolute',
		top: '50%',
		left: '0',
	},
	// Dark Mode Styling
	darkBackground: {
		background: dmBackground,
	},
	darkDrawerIcon: {
		color: dmIconColor,
	},
	darkDrawerBar: {
		borderRight: '1px solid #2b2b2b',
		'&:hover': {
			background: dmBackgroundTwo,
		},
	},
}));

export default function RightSidebar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const darkMode = props.darkMode;

	const toggleDrawerState = () => {
		setOpen((prev) => !prev);
	};

	return (
		<div className={classes.rightDrawerRoot}>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.rightDrawerOpen]: open,
					[classes.rightDrawerClose]: !open,
					[classes.darkBackground]: darkMode,
				})}
				classes={{
					paper: clsx(classes.drawer, {
						[classes.rightDrawerOpen]: open,
						[classes.rightDrawerClose]: !open,
						[classes.darkBackground]: darkMode,
					}),
				}}
				anchor="right"
			>
				<div className={classes.toolbar} onClick={props.setClose}>
					<IconButton className={classes.toolBarIcon}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</div>
				<div
					className={clsx(classes.insideSidebar, {
						[classes.insideSidebarOpen]: open,
						[classes.insideSidebarClosed]: !open,
					})}
				>
					<div
						onClick={toggleDrawerState}
						className={clsx(classes.lightDrawerBar, {
							[classes.darkDrawerBar]: darkMode,
							[classes.darkDrawerIcon]: darkMode,
							[classes.lightDrawerIcon]: !darkMode,
						})}
					>
						<div className={classes.iconSpan}>
							{open ? <NavigateNextIcon /> : <NavigateBeforeIcon />}
						</div>
					</div>
					<div className={classes.rightDrawerTab}>
						<InnerSidebar darkMode={props.darkMode} />
					</div>
				</div>
			</Drawer>
		</div>
	);
}
