import React, { useContext } from 'react';
import AuthContext from './components/store/auth-context';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
	const authContext = useContext(AuthContext);

	return (
		<React.Fragment>
			<MainHeader />
			<main>
				{!authContext.isLoggedIn && <Login />}
				{authContext.isLoggedIn && <Home />}
			</main>
		</React.Fragment>
	);
}

export default App;
