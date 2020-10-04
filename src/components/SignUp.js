import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { auth, db } from '../fire';

function SignUp() {
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((user) => {
				db.collection('users').add({
					Username: username,
					Email: email,
					Cart: [],
					Order: [],
				});
			})
			.catch((error) => alert(error.message));
		auth.signOut();
		setTimeout(() => {
			auth
				.signInWithEmailAndPassword(email, password)
				.then((user) => {
					history.push('/');
				})
				.catch((error) => alert(error.message));
		}, 1000);
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
					<label className='login-label-top'>SignUp</label>
					<label className='login-label'>
						<strong>Username</strong>
					</label>
					<input
						type='text'
						value={username}
						className='login-input'
						onChange={(e) => setUsername(e.target.value)}
					/>
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

					<button
						type='submit'
						onClick={(e) => {
							signUp(e);
						}}
						className='signup-btn'>
						Sign Up!
					</button>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
