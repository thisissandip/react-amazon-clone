import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import CartPage from './components/CartPage';
import Checkout from './components/Checkout';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './fire';
import { useStateValue } from './context/StateProvider';
import { ToastContainer } from 'react-toastify';
import SignUp from './components/SignUp';
import YourOrder from './components/YourOrder';
import { useWindowWidth } from '@react-hook/window-size';

function App() {
	const [{ user }, dispatch] = useStateValue();
	const onlyWidth = useWindowWidth();

	const authListner = () => {
		auth.onAuthStateChanged((currentuser) => {
			if (currentuser) {
				dispatch({
					type: 'SET_USER',
					payload: currentuser.email,
				});
			} else {
				dispatch({
					type: 'SET_USER',
					payload: null,
				});
			}
		});
	};

	useEffect(() => {
		authListner();
		console.log(user);
	}, [user]);

	return (
		<>
			{onlyWidth > 600 ? (
				<ToastContainer
					position='top-right'
					autoClose={3000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
				/>
			) : null}

			<Router>
				<Switch>
					<Route exact path='/'>
						<Navbar />
						<Home />
					</Route>
					<Route path='/cart'>
						<Navbar />
						<CartPage />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/signup'>
						<SignUp />
					</Route>
					<Route path='/checkout'>
						<Navbar />
						<Checkout />
					</Route>
					<Route path='/orders'>
						<Navbar />
						<YourOrder />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
