import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import CreateIcon from '@material-ui/icons/Create';

const options = [
	'Create Component',
	'Search Marketplace',
	'Preview'
];

export default function SplitButton() {
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    console.log(setSelectedIndex);

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`);
	};

	const handleToggle = () => {
		setOpen(prevOpen => !prevOpen);
	};

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	return (
		<Grid container direction="row" >
			<Grid item xs={12}>
				<ButtonGroup
					variant="contained"
					color="primary"
					ref={anchorRef}
					aria-label="split button"
				>
					<Button onClick={handleClick} startIcon={<CreateIcon />}>
						{options[selectedIndex]}
					</Button>
					<Button
						color="primary"
						size="small"
						aria-controls={open ? 'split-button-menu' : undefined}
						aria-expanded={open ? 'true' : undefined}
						aria-label="select merge strategy"
						aria-haspopup="menu"
						onClick={handleToggle}
					>
						<ArrowDropUpIcon />
					</Button>
				</ButtonGroup>
				<Popper
					open={open}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom'
										? 'center top'
										: 'center bottom'
							}}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList id="split-button-menu">
										{options.map((option, index) => (
											<MenuItem
												key={option}
												disabled={index === 2}
												selected={
													index === selectedIndex
												}
												onClick
											>
												{option}
											</MenuItem>
										))}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</Grid>
		</Grid>
	);
}
