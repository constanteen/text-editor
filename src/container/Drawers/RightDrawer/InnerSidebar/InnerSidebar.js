import React from 'react';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import amber from '@material-ui/core/colors/amber';

import PanelOne from './PanelOne';
import PanelTwo from './PanelTwo';

import { dmBackground, colorWhite } from '../../../UI/StyleValues/StyleValues';

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`
	};
}

const innerTheme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: amber
	}
});

const useStyles = makeStyles(theme => ({
	innerRightRoot: {
		width: 330,
		height: '100%',
	},
	lightBackground: {
		background: theme.palette.background.paper,
	},
	tabClass: {
		height: '100%',
		overflow: 'auto'
	},
	// Dark Mode Styling
	darkBackground: {
		background: dmBackground,
		color: colorWhite,
	},
	darkTabBackground: {
		background: dmBackground,
		color: colorWhite
	}
}));

export default function RightDrawerTabs(props) {
	const classes = useStyles();
	const theme = useTheme();
	const darkMode = props.darkMode;
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = index => {
		setValue(index);
	};

	return (
		<div
			className={clsx(classes.innerRightRoot, {
				[classes.lightBackground]: !darkMode,
				[classes.darkBackground]: darkMode
			})}
		>
			<AppBar position="static" color="default">
				<ThemeProvider theme={innerTheme}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor={darkMode ? 'secondary' : 'primary'}
						textColor="primary"
						variant="fullWidth"
						aria-label="full width tabs example"
					>
						<Tab
							label="Item One"
							{...a11yProps(0)}
							className={
								darkMode ? classes.darkTabBackground : ''
							}
						/>
						<Tab
							label="Item Two"
							{...a11yProps(1)}
							className={
								darkMode ? classes.darkTabBackground : ''
							}
						/>
					</Tabs>
				</ThemeProvider>
			</AppBar>
			<SwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<PanelOne index={1} dir={theme.direction} className={classes.tabClass} />
				<PanelTwo index={2} dir={theme.direction} className={classes.tabClass} />
			</SwipeableViews>
		</div>
	);
}
