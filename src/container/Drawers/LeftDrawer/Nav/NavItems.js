import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
// Use a single icon for all component items

const useStyles = makeStyles(theme => ({
	paper: {
		padding: '5px 0 5px 20px'
	},
	// Dark Mode Styling
	darkNavItemIcons: {
		color: '#e6e680'
	},
	darkNavItems: {
		'&:hover': {
			background: '#282b3a'
		}
	}
}));

export default function NavItems(props) {
	const classes = useStyles();
	const group = props.group;

	const element = props.items[1].map((el, i) => {
		return (
			<ListItem
				dense
				className={clsx(classes.paper, {[classes.darkNavItems]: props.mode})}
				button
				key={group + ' ' + i}
			>
				<ListItemIcon
					className={props.mode ? classes.darkNavItemIcons : ''}
				>
					{/* <Icon>{el.icon}</Icon> */}
				</ListItemIcon>
				<ListItemText primary={el.name} />
			</ListItem>
		);
	});

	return (
		<List component="nav" aria-label="main mailbox folders">
			{element}
		</List>
	);
}
