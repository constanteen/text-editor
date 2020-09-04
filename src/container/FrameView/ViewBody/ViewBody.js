import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';

import { LEFT_DRAWER_WIDTH } from '../../Utility/constants';
import OptionsRow from '../../UI/OptionsTable/OptionsTable';
import { colorWhite } from '../../UI/StyleValues/StyleValues';
import iframeBackground from '../../../assets/images/backg.png';
// import iframeBackground from '../../../assets/images/greybackg.jpg';

const useStyles = makeStyles((theme) => ({
	frameCover: {
		display: 'flex',
		flexFlow: 'column',
		overflow: 'hidden',
		marginTop: '4rem',
		marginRight: '1.2rem',
		background: colorWhite,
		transition: theme.transitions.create(['margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		})
	},
	frameCoverShift: {
		marginLeft: LEFT_DRAWER_WIDTH,
	},
	frameCoverExpand: {
		marginLeft: '4.3rem',
	},
	frameDim: {
		display: 'block',
		bottom: '0',
		margin: '0px auto',
		width: '100%',
		border: 'none',
		backgroundImage: `url(${iframeBackground})`,
		background: 'transparent',
		height: '580px',
		[theme.breakpoints.up('lg')]: {
			height: '580px'
		},
		[theme.breakpoints.up('xl')]: {
			height: '1485px'
		},
	},
}));

export default function Variants(props) {
	const classes = useStyles();

	return (
		<div className={clsx(classes.frameCover, {
			[classes.frameCoverShift]: props.leftDrawerOpen,
			[classes.frameCoverExpand]: !props.leftDrawerOpen
		})}>
			<OptionsRow darkMode={props.darkMode} />
			<Divider />
			<iframe title="viewer" className={classes.frameDim} src=""></iframe>
		</div>
	);
}
