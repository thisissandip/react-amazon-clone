import React, { useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { auth, db } from '../fire';
import SignUp from './SignUp';
import { useStateValue } from '../context/StateProvider';

function Login() {
	const [{ user }, dispatch] = useStateValue();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

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
					<button type='submit' onClick={loginuser} className='login-btn'>
						Login
					</button>
					<label className='dummy-text'>
						By continuing, you agree to Amazon's Conditions of Use and Privacy
						Notice.{' '}
					</label>
					<Link to='/signup' className='link-tag'>
						<button className='signup-btn'>New Here? Sign Up!</button>
					</Link>
				</form>
			</div>
		</div>
	);
}

export default Login;
