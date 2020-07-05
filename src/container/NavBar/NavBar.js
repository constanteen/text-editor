import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InvertColors from '@material-ui/icons/InvertColors';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { LEFT_DRAWER_WIDTH } from '../Utility/constants';

import {
	dmBackgroundTwo,
	dmIconColorTwo,
	colorWhiteTwo,
	navBarBlueish,
} from '../UI/StyleValues/StyleValues';

const drawerWidth = LEFT_DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
	navBarRoot: {
		display: 'flex',
	},
	grow: {
		flexGrow: 1,
	},
	topAppBar: {
		zIndex: theme.zIndex.drawer + 3,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		background: navBarBlueish,
	},
	topAppBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	iconsOnRight: {
		padding: 5,
		'& > *': {
			marginLeft: theme.spacing(3),
		},
	},
	// Dark Mode Styling
	darkBackground: {
		background: dmBackgroundTwo,
		transition: 'all 0.5s',
	},
	darkMenuButton: {
		color: dmIconColorTwo,
		'&:hover': {
			color: colorWhiteTwo,
		},
	},
}));

export default function Navbar(props) {
	const classes = useStyles();
	const drawerOpen = props.leftDrawerOpen;
	const darkMode = props.darkMode;
	return (
		<AppBar
			position="fixed"
			className={clsx(classes.topAppBar, {
				[classes.topAppBarShift]: drawerOpen,
				[classes.darkBackground]: darkMode,
			})}
		>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={props.setDrawerState}
					edge="start"
					className={clsx(classes.menuButton, {
						[classes.navBarHide]: drawerOpen,
						[classes.darkMenuButton]: darkMode,
					})}
				>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" noWrap>
					Kylantis Console
				</Typography>
				<div className={classes.grow} />
				<div className={classes.iconsOnRight}>
					<Tooltip title="Create Component">
						<IconButton
							edge="end"
							aria-label="toggle dark mode"
							aria-haspopup="true"
							color="inherit"
						>
							<CreateIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Import Component">
						<IconButton
							edge="end"
							aria-label="import component"
							aria-haspopup="true"
							color="inherit"
						>
							<ImportExportIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Light/Dark Mode">
						<IconButton
							edge="end"
							aria-label="toggle dark mode"
							aria-haspopup="true"
							onClick={props.toggleDarkMode}
							color="inherit"
						>
							<InvertColors />
						</IconButton>
					</Tooltip>
					<Tooltip title="Notifications">
						<IconButton
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge badgeContent={17} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title="User Account">
						<IconButton
							edge="end"
							aria-label="user account"
							aria-haspopup="true"
							color="inherit"
						>
							<AccountCircleIcon />
						</IconButton>
					</Tooltip>
				</div>
			</Toolbar>
		</AppBar>
	);
}
