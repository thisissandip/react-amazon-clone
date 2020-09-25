import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StyleNavbar.css';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { useStateValue } from '../context/StateProvider';
import { auth, db } from '../fire';

const Navbar = () => {
	const [state, dispatch] = useStateValue();

	const [search, setSearch] = useState('');

	const signout = () => {
		if (state.user) {
			dispatch({
				type: 'CLEAR_CART',
			});
			auth.signOut();
		}
	};

	return (
		<>
			<nav>
				<ul className='nav-items left-links'>
					<Link to='/' className='link-tag'>
						<li className='nav-link'>
							<img
								className='logo'
								src={require('../imgs/logo.png')}
								alt='logo'
							/>
						</li>
					</Link>
					<li className='search-bar-container'>
						<input
							name='search'
							className='search-bar'
							type='text'
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className='search-btn-container'>
							<AiOutlineSearch className='search-btn' />
						</div>
					</li>
				</ul>

				<ul className='nav-items right-links'>
					<Link to={!state.user && '/login'} className='link-tag'>
						<li className='right-text' onClick={signout}>
							<div className='nav-upper-text'>Hello,</div>
							<div className='nav-lower-text'>
								<strong>{state.user ? 'Sign Out' : 'Sign In'}</strong>
							</div>
						</li>
					</Link>
					<Link to='/' className='link-tag'>
						<li className='right-text'>
							<div className='nav-upper-text'>Try,</div>
							<div className='nav-lower-text'>
								<strong>Prime</strong>
							</div>
						</li>
					</Link>
					<Link to='/' className='link-tag'>
						<li className='right-text'>
							<div className='nav-upper-text'>Returns& </div>
							<div className='nav-lower-text'>
								<strong>Orders</strong>
							</div>
						</li>
					</Link>
					<Link to='/cart' className='link-tag'>
						<li className='cart-cont'>
							<div className='nav-upper-text'>
								<AiOutlineShoppingCart className='cart-logo' />
							</div>
							<div className='nav-lower-text cart-num'>
								{state.cart?.length}
							</div>
						</li>
					</Link>
				</ul>
			</nav>
		</>
	);
};

export default Navbar;
