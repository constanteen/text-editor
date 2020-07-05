import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

import { colorWhite, colorWhiteTwo, dmIconColor, dmBackground,dmBackgroundTwo } from '../../../UI/StyleValues/StyleValues';

const useStyles = makeStyles(theme => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	},
	panelIcon: {
		alignSelf: 'center'
	},
	// Dark Mode Styling
	darkPanelClass: {
		background: dmBackground,
		color: dmIconColor,
		transition: 'all 0.5s',
		'&:hover *': {
			color: colorWhite,
		}
	},
	darkPanelIcon: {
		color: colorWhiteTwo,
		transition: 'all 0.5s',
	},
	darkListHover: {
		'&:hover': {
			background: dmBackgroundTwo
		}
	}
}));

const COMPONENT_DATA = [
	{ Component: 'Forms', icon: 'text_fields' },
	{ Component: 'Panel', icon: 'panorama_wide_angle' },
	{ Component: 'Overlay', icon: 'picture_in_picture' },
	{ Component: 'Menu', icon: 'menu_open' },
	{ Component: 'Charts', icon: 'equalizer' },
	{ Component: 'Forms', icon: 'text_fields' },
	{ Component: 'Panel', icon: 'panorama_wide_angle' },
	{ Component: 'Overlay', icon: 'picture_in_picture' },
	{ Component: 'Menu', icon: 'menu_open' },
	{ Component: 'Charts', icon: 'equalizer' },
	{ Component: 'Forms', icon: 'text_fields' },
	{ Component: 'Panel', icon: 'panorama_wide_angle' },
	{ Component: 'Overlay', icon: 'picture_in_picture' },
	{ Component: 'Menu', icon: 'menu_open' },
	{ Component: 'Charts', icon: 'equalizer' }
];

export default function ListItems(props) {
	const classes = useStyles();
	const darkMode = props.mode;
	const expandableElements = COMPONENT_DATA.map((el, i) => {
		return (
			<ListItem button key={i} className={darkMode ? [classes.darkPanelClass, classes.darkListHover].join(' ') : ''}>
				<ListItemIcon className={darkMode ? classes.darkPanelIcon : ''}>
					<Icon>{el.icon}</Icon>
				</ListItemIcon>
				<ListItemText primary={el.Component} />
			</ListItem>
		);
	});
	return <div>{expandableElements}</div>;
}
