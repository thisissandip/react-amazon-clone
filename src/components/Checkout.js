import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';

function Checkout() {
	const [{ user, cart }] = useStateValue();
	if (user == null) {
		return <Redirect to='/login' />;
	}
	if (cart.length == 0) {
		alert('You have no items in your cart');
		return <Redirect to='/' />;
	}

	return <div>Checkout Page Is Under Contruction </div>;
}

export default Checkout;
