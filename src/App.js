import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from '../src/container/NavBar/NavBar';
import ConsoleLayout from './routes/ConsoleLayout/ConsoleLayout';
import ConsoleMarketplace from './routes/ConsoleMarketplace/ConsoleMarketplace';

function App() {
	const [isDrawerOpen, openDrawer] = useState(false);
	const [darkMode, setIsDarkMode] = useState(false);

	const handleDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	const handleDrawerState = () => {
		openDrawer((prev) => !prev);
	};

	return (
		<BrowserRouter>
			<Navbar
				leftDrawerOpen={isDrawerOpen}
				darkMode={darkMode}
				toggleDarkMode={handleDarkMode}
				setDrawerState={handleDrawerState}
			/>
			<Switch>
				<Route exact path="/">
					<ConsoleLayout
						style={{ overflow: 'hidden !important' }}
						darkMode={darkMode}
						isDrawerOpen={isDrawerOpen}
						handleDrawerState={handleDrawerState}
					/>
				</Route>
				<Route exact path="/market">
					<ConsoleMarketplace
						darkMode={darkMode}
						isDrawerOpen={isDrawerOpen}
						handleDrawerState={handleDrawerState}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
