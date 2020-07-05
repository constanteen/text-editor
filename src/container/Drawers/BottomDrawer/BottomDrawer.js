import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LEFT_DRAWER_WIDTH } from '../../Utility/constants';

import { convertToPercent } from '../../Utility/functions/functions';
import EditorContainer from './EditorContainer/EditorContainer';

const drawerWidth = LEFT_DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
	bottomDrawerRoot: {
		display: 'flex',
	},
	bottomAppBar: {
		top: 'auto',
		bottom: 0,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: 'transparent',
		boxShadow: 'none',
	},
	bottomAppBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	view: {
		minHeight: '11vh',
		height: '330px',
	},
	floatingIcon: {
		display: 'flex',
		backgroundColor: 'transparent',
		opacity: 0,
		cursor: 'row-resize',
		transition: '.3s opacity ease',
		'&:hover': {
			opacity: 1,
		},
		'&:hover + div': {
			borderTop: '2px solid #4b5fce'
		}
	},
	fabIcon: {
		margin: '0 auto',
		transform: 'scale(0.7)',
		zIndex: 1,
	},
	closedFabIcon: {
		transform: 'scale(0.7)',
		position: 'absolute',
		[theme.breakpoints.up('lg')]: {
			bottom: '-3%',
			left: '51%'
		},
		[theme.breakpoints.down('lg')]: {
			bottom: 0,
			left: '48.3%',
		},
	},
	// Dark Mode Styling
	darkBackground: {
		background: 'transparent',
	},
}));

function BottomAppBar(props) {
	const classes = useStyles();
	const [isShowing, setIsShowing] = useState(true);
	const [presentHeight, setHeight] = useState('260px');

	const drawerOpen = props.leftDrawerOpen;
	const darkMode = props.darkMode;
	const WINDOW_HEIGHT = window.innerHeight;

	const drawerRef = useRef();

	const handleIsShowing = () => {
		setIsShowing(prev => !prev);
	};

	let initClientY;
	let initHeight;

	const handleMouseDown = () => {
		const e = window.event;
		const total = e.clientY - initClientY;
		const workingHeight = initHeight - total;
		const percentHeight = convertToPercent(workingHeight, WINDOW_HEIGHT);
		if (percentHeight >= 90) {
			drawerRef.current.style.height = '90%';
			setHeight('557px');
			return;
		};
		drawerRef.current.style.height = `${percentHeight}%`;
		setHeight(`${workingHeight - 70}px`);
	};

	const add = () => {
		const e = window.event;
		props.backdropHandler(true);
		e.preventDefault();
		e.stopPropagation();
		const el = drawerRef.current;
		initClientY = e.clientY;
		initHeight = el.getBoundingClientRect().height;
		window.addEventListener('mousemove', handleMouseDown);
		window.addEventListener('mouseup', remove);
	};

	const remove = () => {
		props.backdropHandler(false);
		window.removeEventListener('mousemove', handleMouseDown);
	};

	return (
		<div className={classes.bottomDrawerRoot}>
			{isShowing ? null : (
				<Fab
					color="primary"
					aria-label="toggle editors"
					className={classes.closedFabIcon}
					onClick={handleIsShowing}
					size="small"
				>
					{isShowing ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				</Fab>
			)}
			<Slide in={isShowing} direction="up" mountOnEnter>
				<AppBar
					position="fixed"
					className={clsx(classes.bottomAppBar, {
						[classes.bottomAppBarShift]: drawerOpen,
						[classes.view]: isShowing,
						[classes.darkBackground]: darkMode,
					})}
					ref={drawerRef}
				>
					<div
						className={classes.floatingIcon}
						onMouseDown={add}
					>
						<Fab
							color="primary"
							aria-label="toggle editors"
							className={classes.fabIcon}
							onClick={handleIsShowing}
							size="small"
						>
							{isShowing ? <ExpandMoreIcon /> : <ExpandLessIcon />}
						</Fab>
					</div>
					<EditorContainer height={presentHeight} />
				</AppBar>
			</Slide>
		</div>
	);
}

export default BottomAppBar;
