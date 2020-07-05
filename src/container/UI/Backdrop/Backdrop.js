import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

export default function SimpleBackdrop(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(props.showBackdrop);
	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		setOpen(props.showBackdrop)
	}, [props.showBackdrop]);

	return (
		<div>
			<Backdrop
				className={classes.backdrop}
				open={open}
				onClick={handleClose}
				invisible={props.invisible}
			>
				{/* <CircularProgress color="inherit" /> */}
			</Backdrop>
		</div>
	);
}