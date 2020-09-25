import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { Link } from 'react-router-dom';

function Subtotal() {
	const [{ cart, user }] = useStateValue();

	const total = cart?.reduce((total, item) => item.price + total, 0);

	return (
		<div className='subtotal-cont'>
			<div>
				Subtotal ({cart?.length} items) : {total}{' '}
			</div>
			<Link
				to={!user ? '/login' : '/checkout'}
				className='link-tag checkout-btn-link'>
				<button className='checkout-btn'>Proceed to Checkout</button>
			</Link>
		</div>
	);
}

export default Subtotal;
