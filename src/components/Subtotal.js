import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { Redirect, useHistory } from 'react-router-dom';
import Checkout from './Checkout';

function Subtotal() {
	const [{ cart, user, UserCart }] = useStateValue();
	const history = useHistory();

	const total = cart?.reduce((total, item) => item.price + total, 0);

	const userCarttotal = UserCart?.reduce(
		(total, item) => item.price + total,
		0
	);

	const checkcart = () => {
		if (!user) {
			history.push('/login');
		} else {
			if (UserCart == 0) {
				alert('You Have No Items In Your Cart!');
				history.push('/');
			} else {
				history.push('/checkout');
			}
		}
	};

	return (
		<div className='subtotal-cont'>
			<strong>
				Subtotal ({user ? UserCart?.length : cart?.length} items) : ₹
				{user ? userCarttotal : total}{' '}
			</strong>
			<button onClick={checkcart} className='checkout-btn'>
				Proceed to Checkout
			</button>
		</div>
	);
}

export default Subtotal;
