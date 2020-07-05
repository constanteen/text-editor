import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StoreIcon from '@material-ui/icons/Store';
import WebIcon from '@material-ui/icons/Web';
import { Link } from 'react-router-dom';

export default function ConsoleMarket(props) {

	if (props.destination === 'console') {
		return (
			<ListItem button component={Link} to="/">
				<ListItemIcon>
					<WebIcon />
				</ListItemIcon>
				<ListItemText primary="Console" />
			</ListItem>
		);
	} else {
		return (
			<ListItem button component={Link} to="/market">
				<ListItemIcon>
					<StoreIcon />
				</ListItemIcon>
				<ListItemText primary="Marketplace" />
			</ListItem>
		);
	}
}
