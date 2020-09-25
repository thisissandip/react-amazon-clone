import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../fire';

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				db.collection('users').add({
					Email: email,
					Cart: [],
					Order: [],
				});
				history.push('/');
			})
			.catch((error) => alert(error.message));
	};

	const loginuser = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				history.push('/');
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className='login-page'>
			<div className='login-form-cont'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1280px-Amazon_logo.svg.png'
					alt='logo'
					className='login-logo'
				/>
				<form className='login-form'>
					<label className='login-label-top'>Login</label>
					<label className='login-label'>
						<strong>Email</strong>
					</label>
					<input
						type='email'
						value={email}
						className='login-input'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label className='login-label'>
						{' '}
						<strong>Password</strong>
					</label>
					<input
						type='password'
						value={password}
						className='login-input'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={loginuser} className='login-btn'>
						Login
					</button>
					<label className='dummy-text'>
						By continuing, you agree to Amazon's Conditions of Use and Privacy
						Notice.{' '}
					</label>
					<button onClick={signUp} className='signup-btn'>
						New Here? Sign Up!
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
