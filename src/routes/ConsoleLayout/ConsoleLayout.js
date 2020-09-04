import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import ViewBody from '../../container/FrameView/ViewBody/ViewBody';
import LeftSidebar from '../../container/Drawers/LeftDrawer/Sidebar/Sidebar';
import RightSidebar from '../../container/Drawers/RightDrawer/Sidebar/Sidebar';
import BottomDrawer from '../../container/Drawers/BottomDrawer/BottomDrawer';
import Backdrop from '../../container/UI/Backdrop/Backdrop';
import classes from './ConsoleLayout.module.css';
import DestinationButton from '../../container/Utility/ConsoleMarket/ConsoleMarket';

export default class Layout extends Component {
	state = {
		bottomDrawerOpen: true,
		showBackdrop: false,
	};

	destination = (<DestinationButton />);

	handleBackdropState = (val) => {
		this.setState((state) => {
			return {
				...state,
				showBackdrop: val,
			};
		});
	};

	render() {
		return (
			<div className={classes.Container}>
				<CssBaseline />
				<Backdrop showBackdrop={this.state.showBackdrop} invisible={true} />
				<div className={classes.Content}>
					<LeftSidebar
						leftDrawerOpen={this.props.isDrawerOpen}
						setDrawerState={this.props.handleDrawerState}
						darkMode={this.props.darkMode}
						destinationRoute={this.destination}
						destination={'marketplace'}
					/>
					<ViewBody darkMode={this.props.darkMode} leftDrawerOpen={this.props.isDrawerOpen} />
					<RightSidebar darkMode={this.props.darkMode} />
				</div>
				<BottomDrawer
					backdropHandler={this.handleBackdropState}
					showBackdrop={this.state.showBackdrop}
					leftDrawerOpen={this.props.isDrawerOpen}
					darkMode={this.props.darkMode}
				/>
			</div>
		);
	}
}
