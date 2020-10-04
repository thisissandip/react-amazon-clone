import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './StyleNavbar.css';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { MdPlayArrow } from 'react-icons/md';
import { useStateValue } from '../context/StateProvider';
import { auth, db } from '../fire';
import { useWindowWidth } from '@react-hook/window-size';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
	const [state, dispatch] = useStateValue();
	const [shsidebar, setshsidebar] = useState(true);
	const history = useHistory();
	const [search, setSearch] = useState('');
	const onlyWidth = useWindowWidth();

	const signout = () => {
		if (state.user) {
			dispatch({
				type: 'CLEAR_CART',
			});
			auth.signOut();
			history.push('/');
		}
	};

	useEffect(() => {
		db.collection('users')
			.where('Email', '==', `${state.user}`)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					dispatch({
						type: 'SET_USER_DETAILS',
						payload: {
							docID: doc.id,
							Name: doc.data().Username,
							UserCart: doc.data().Cart,
							UserOrders: doc.data().Order,
						},
					});
					console.log(doc.id, '==', doc.data());
				});
			});
	}, [state.user]);

	const showsidebar = () => {
		const sidebar = document.querySelector('.sidebar-cont');
		sidebar.style.left = '0';
		setshsidebar(false);
	};

	const removesidebar = () => {
		const sidebar = document.querySelector('.sidebar-cont');
		sidebar.style.left = '-100rem';
		setshsidebar(true);
	};

	return (
		<>
			<div className='sidebar-cont'>
				<ul className='sidebar-links'>
					<Link to={!state.user ? '/login' : '/orders'} className='link-tag'>
						<li onClick={removesidebar} className='right-text'>
							<div className='nav-mobile-text'>Your Orders </div>
						</li>
					</Link>
					<a
						href='https://www.primevideo.com/'
						target='_blank'
						className='link-tag'>
						<li className='right-text'>
							<div className='nav-mobile-text'>Try, Prime</div>
						</li>
					</a>
					<div>
						<Link to={!state.user && '/signup'} className='link-tag'>
							<button
								onClick={() => {
									signout();
									removesidebar();
								}}
								className='sign-out-btn nav-mobile-text'>
								{state.user ? 'Sign Out' : 'New Here? Sign Up'}
							</button>
						</Link>
					</div>
				</ul>
			</div>

			{onlyWidth > 1100 ? (
				<nav>
					<ul className='nav-items left-links'>
						<div className='hamburger'>
							<FiMenu className='menu-icon' />
						</div>
						<Link to='/' className='link-tag'>
							<li className='nav-link'>
								{
									<img
										className='logo'
										src={require('../imgs/logo.png')}
										alt='logo'
									/>
								}
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
							<li className='right-text sign-out-opt nav-name-field '>
								<div className='nav-upper-text'>
									Hi, {!state.user && 'Guest'}
								</div>
								<div className='nav-lower-text '>
									<strong>
										{state.user
											? state.Name.charAt(0)
													.toUpperCase()
													.concat(state.Name.slice(1))
											: 'Sign In'}
									</strong>
								</div>
								<div className='sign-arrow'>
									<MdPlayArrow />
								</div>
								<div className='sign-out-cont'>
									<button onClick={signout} className='sign-out-btn'>
										{state.user ? 'Sign Out' : 'New Here? Sign Up'}
									</button>
								</div>
							</li>
						</Link>
						<a
							href='https://www.primevideo.com/'
							target='_blank'
							className='link-tag'>
							<li className='right-text'>
								<div className='nav-upper-text'>Try,</div>
								<div className='nav-lower-text'>
									<strong>Prime</strong>
								</div>
							</li>
						</a>
						<Link to={!state.user ? '/login' : '/orders'} className='link-tag'>
							<li className='right-text'>
								<div className='nav-upper-text'>Your </div>
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
									{state.user ? state.UserCart.length : state.cart?.length}
								</div>
							</li>
						</Link>
					</ul>
				</nav>
			) : (
				<nav>
					<ul className='nav-items top-links'>
						<div className='mobile-left-links'>
							<div
								onClick={() => {
									if (shsidebar) {
										showsidebar();
									} else {
										removesidebar();
									}
								}}
								className='hamburger'>
								<FiMenu className='menu-icon' />
							</div>
							<Link to='/' className='link-tag'>
								<li onClick={removesidebar} className='nav-link'>
									{
										<img
											className='logo'
											src={require('../imgs/logo.png')}
											alt='logo'
										/>
									}
								</li>
							</Link>
							<div className='mobile-menu'></div>
						</div>

						<div className='mobile-right-links'>
							<Link to={!state.user && '/login'} className='link-tag'>
								<li className='right-text sign-out-opt nav-name-field '>
									<div className='nav-lower-text '>
										<strong>
											{state.user
												? `Hi, ${state.Name.charAt(0)
														.toUpperCase()
														.concat(state.Name.slice(1))}`
												: 'Sign In'}
										</strong>
									</div>
								</li>
							</Link>
							<Link to='/cart' className='link-tag'>
								<li onClick={removesidebar} className='cart-cont'>
									<div className='nav-upper-text'>
										<AiOutlineShoppingCart className='cart-logo' />
									</div>
									<div className='nav-lower-text cart-num'>
										{state.user ? state.UserCart.length : state.cart?.length}
									</div>
								</li>
							</Link>
						</div>
					</ul>

					<ul className='nav-items bottom-links'>
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
				</nav>
			)}
		</>
	);
};

export default Navbar;
