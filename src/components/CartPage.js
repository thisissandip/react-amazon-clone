import React from 'react';
import CartProduct from './CartProduct';
import Subtotal from './Subtotal';
import { useStateValue } from '../context/StateProvider';
import { CSSTransitionGroup } from 'react-transition-group';

const CartPage = () => {
	const [{ cart, user, UserCart }] = useStateValue();

	return (
		<>
			<div className='cart-page'>
				<div className='card-title-cont'>
					<div className='cart-title'>Hello, {user ? user : 'Guest'}</div>
					<div className='cart-title'>Your Cart</div>
				</div>
				<div className='all-cart-products-cont'>
					<CSSTransitionGroup
						transitionName='display'
						transitionEnterTimeout={500}
						transitionLeaveTimeout={200}>
						{!user
							? cart.map((item) => (
									<CartProduct
										key={item.id}
										id={item.id}
										img={item.imgname}
										title={item.name}
										price={item.price}
									/>
							  ))
							: UserCart.map((item) => (
									<CartProduct
										key={item.id}
										id={item.id}
										img={item.imgname}
										title={item.name}
										price={item.price}
									/>
							  ))}
					</CSSTransitionGroup>
				</div>

				<Subtotal />
			</div>
		</>
	);
};

export default CartPage;
