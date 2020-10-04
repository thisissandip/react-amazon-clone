import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../fire';

function Subtotal() {
	const [{ docID, user, UserCart, UserOrders }, dispatch] = useStateValue();
	const history = useHistory();

	const userCarttotal = UserCart?.reduce(
		(total, item) => item.price + total,
		0
	);

	const estimatedtax = (18 / userCarttotal) * 100;
	const ordertotal = userCarttotal + estimatedtax;

	useEffect(() => {
		if (docID) {
			db.collection('users').doc(docID).update({
				Order: UserOrders,
			});
		}
	}, [UserOrders]);

	const addordertodb = () => {
		dispatch({ type: 'SET_ORDERS' });

		db.collection('users').doc(docID).update({
			Cart: [],
		});
		dispatch({ type: 'CLEAR_CART' });
		setTimeout(() => {
			history.push('/orders');
		}, 500);
	};

	return (
		<div className='place-cont'>
			<div className='place-o-show-details'>
				<div className='order-details'>
					<span>Items:</span>
					<span> {UserCart.length} </span>
				</div>
				<div className='order-details'>
					<span>Shipping Fee: </span>
					<span>₹ 0 </span>
				</div>
				<hr></hr>
				<div className='order-details'>
					<span>Total Before Tax: </span>
					<span>₹ {userCarttotal} </span>
				</div>
				<div className='order-details'>
					<span>Estimated Tax: </span>
					<span>₹ {estimatedtax.toFixed(2)} </span>
				</div>
				<hr></hr>
				<div className='order-details order-total'>
					<span>Order Total: </span>
					<span>₹ {ordertotal.toFixed(2)} </span>
				</div>
			</div>
			<button className='place-o-btn' onClick={addordertodb}>
				Place Your Order
			</button>
		</div>
	);
}

export default Subtotal;
