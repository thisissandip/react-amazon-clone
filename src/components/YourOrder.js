import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { CSSTransitionGroup } from 'react-transition-group';
import { auth, db } from '../fire';

const YourOrder = () => {
	const [{ cart, user, UserCart }] = useStateValue();
	const [finalorders, setFinalOrders] = useState([]);

	useEffect(() => {
		db.collection('users')
			.where('Email', '==', `${user}`)
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					setFinalOrders(doc.data().Order);
				});
			});
	}, [user]);

	return (
		<>
			<div className='cart-page'>
				<div className='card-title-cont'>
					<div className='cart-title'>Your Orders</div>
				</div>
				<div className='all-cart-products-cont'>
					<CSSTransitionGroup
						transitionName='display'
						transitionEnterTimeout={0}
						transitionLeaveTimeout={200}>
						{finalorders?.map((item) => (
							<OrderProduct
								key={item.id}
								id={item.id}
								img={item.imgname}
								title={item.name}
								price={item.price}
							/>
						))}
					</CSSTransitionGroup>
				</div>
			</div>
		</>
	);
};

const OrderProduct = ({ id, img, title, price }) => {
	const [{ cart, user, UserCart }] = useStateValue();

	return (
		<div className='cart-prod-container'>
			<div className='cart-img-cont'>
				<img src={img} alt='product-img' className='cart-prod-img' />
			</div>
			<div className='cart-prod-details-cont'>
				<div className='card-prod-details'>
					<div className='cart-prod-title'>{title}</div>
					<div className='cart-prod-price'>₹{price}</div>
				</div>
				<div className='del-prod-cont'>
					<strong>OrderId: </strong>
					{id}
				</div>
			</div>
		</div>
	);
};

export default YourOrder;
