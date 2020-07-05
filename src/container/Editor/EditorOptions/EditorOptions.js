import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
// import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {
	editorHeadingBg,
	settingsIcon,
	settingsIconBg,
	settingsIconHover,
	editorHeaderText,
	dmBackgroundTwo,
} from '../../UI/StyleValues/StyleValues';

const useStyles = makeStyles((theme) => ({
	editorOptionsRoot: {
		overflow: 'hidden',
		height: '1.88rem',
	},
	lightEditorOptionsBar: {
		backgroundColor: editorHeadingBg,
	},
	editorSettingsIcon: {
		marginLeft: '0.2rem',
		color: settingsIcon,
	},
	iconButton: {
		padding: '0.01rem 0.1rem',
		margin: '0 0.4rem',
		height: '1.6rem',
		borderRadius: '5px',
		transition: '.1s all',
		cursor: 'pointer',
		transform: 'scale(0.8)',
	},
	lightIconButton: {
		backgroundColor: settingsIconBg,
		boxShadow: '1px 2px 3px #5d5c5c',
		'&:hover': {
			backgroundColor: settingsIconHover,
			boxShadow: '1px 2px 3px #333232',
		},
		'&:active': {
			boxShadow: '1px 1px 3px #333232',
		},
	},
	iconNText: {
		display: 'block',
		alignItems: 'center',
	},
	optionsTitle: {
		color: editorHeaderText,
		margin: '0 auto',
		fontSize: '0.95rem',
		textAlign: 'center',
		padding: '5px 0px 5px 0',
		userSelect: 'none'
	},
	lightOptionsTitle: {
		color: editorHeaderText,
	},
	// Dark Mode Configuration
	darkEditorOptionsBar: {
		backgroundColor: dmBackgroundTwo,
	},
	darkOptionsTitle: {
		color: '#adadad',
	},
	darkIconButton: {
		backgroundColor: settingsIconBg,
		boxShadow: '1px 2px 3px #5d5c5c',
		'&:hover': {
			backgroundColor: settingsIconHover,
			boxShadow: '1px 2px 3px #333232',
		},
		'&:active': {
			boxShadow: '1px 1px 3px #333232',
		},
	},
}));

export default function EditorOptions(props) {
	const classes = useStyles();
	const darkMode = false; // props.darkMode

	const clickOptionsDropdown = (e) => {
		e.stopPropagation();
	};

	return (
		<div
			className={clsx(classes.editorOptionsRoot, {
				[classes.lightEditorOptionsBar]: !darkMode,
				[classes.darkEditorOptionsBar]: darkMode,
			})}
		>
			<div className={classes.iconNText}>
				<div
					className={clsx(classes.optionsTitle, {
						[classes.lightOptionsTitle]: !darkMode,
						[classes.darkOptionsTitle]: darkMode,
					})}
				>
					<h3>{props.mode}</h3>
				</div>
				{props.mode === 'Handlebars' ? (
					<div
						className={clsx(classes.iconButton, {
							[classes.lightIconButton]: !darkMode,
							[classes.darkIconButton]: darkMode,
						})}
						onClick={clickOptionsDropdown}
					>
						<i className={clsx(classes.iconInside)}>
							<ArrowDropDownIcon />
						</i>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
}
