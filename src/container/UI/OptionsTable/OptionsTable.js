import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm';
import Divider from '@material-ui/core/Divider';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import UndoIcon from '@material-ui/icons/Undo';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { dmBackground, dmOptionsTableColor, dmIconColorTwo, colorWhite } from '../../UI/StyleValues/StyleValues';

const useStyles = makeStyles(theme => ({
	optionsTableRoot: {
		display: 'flex',
        flexDirection: 'row',
        paddingLeft: 5,
		alignItems: 'center',
		'& > *': {
			marginLeft: 4
		},
		width: '100%',
    },
    lightMode: {
        backgroundColor: colorWhite,
    },
    // Dark Mode Styling
    rootDarkMode: {
        backgroundColor: dmBackground,
    },
    darkButtonEffect: {
		color: dmOptionsTableColor,
		borderColor: dmOptionsTableColor,
        '&:hover': {
			color: dmIconColorTwo,
			borderColor: dmIconColorTwo,
        }
    }
}));

export default function Options(props) {
	const classes = useStyles();

	return (
		<div className={props.darkMode ? [classes.optionsTableRoot, classes.rootDarkMode].join(' ') : [classes.optionsTableRoot, classes.lightMode].join(' ')}>
			<Button variant="outlined" color="primary" className={props.darkMode ? classes.darkButtonEffect : ''}>
				Structure
			</Button>
			<IconButton color="primary" aria-label="add an alarm" className={props.darkMode ? classes.darkButtonEffect : ''}>
				<AlarmIcon />
			</IconButton>
            <Divider orientation="vertical" flexItem />
			<Button variant="outlined" color="primary" startIcon={<CloudUploadIcon />} className={props.darkMode ? classes.darkButtonEffect : ''}>
				Properties
			</Button>
            <Divider orientation="vertical" flexItem />
			<IconButton color="primary" aria-label="add an alarm"  className={props.darkMode ? classes.darkButtonEffect : ''}>
				<FileCopyIcon />
			</IconButton>
            <IconButton color="primary" aria-label="add an alarm"  className={props.darkMode ? classes.darkButtonEffect : ''}>
				<AssignmentOutlinedIcon />
			</IconButton>
            <IconButton color="primary" aria-label="add an alarm"  className={props.darkMode ? classes.darkButtonEffect : ''}>
				<UndoIcon />
			</IconButton>
            <IconButton color="primary" aria-label="add an alarm" className={props.darkMode ? classes.darkButtonEffect : ''}>
				<DeleteIcon />
			</IconButton>
            <Divider orientation="vertical" flexItem />
            <Button variant="outlined" color="primary" startIcon={<RefreshIcon />} className={props.darkMode ? classes.darkButtonEffect : ''}>
				Refresh
			</Button>
            <Button variant="outlined" color="primary" startIcon={<VisibilityIcon />} className={props.darkMode ? classes.darkButtonEffect : ''}>
				Preview
			</Button>
            <Button variant="outlined" color="primary" startIcon={<SaveIcon />} className={props.darkMode ? classes.darkButtonEffect : ''}>
				Save Template
			</Button>
			<Button variant="outlined" color="primary" startIcon={<SaveIcon />} className={props.darkMode ? classes.darkButtonEffect : ''}>
				Edit Template
			</Button>
		</div>
	);
}
