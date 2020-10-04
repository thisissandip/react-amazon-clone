import React, { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { auth, db } from '../fire';

function CartProduct({ id, img, title, price }) {
	const [state, dispatch] = useStateValue();

	useEffect(() => {
		if (state.docID) {
			db.collection('users').doc(state.docID).update({
				Cart: state.UserCart,
			});
		}
	}, [state.UserCart]);

	const removefromcart = () => {
		if (state.user) {
			dispatch({
				type: 'USER_REMOVE_FROM_CART',
				payload: {
					id: id,
					name: title,
					img: img,
					price: price,
				},
			});
		} else {
			dispatch({
				type: 'REMOVE_FROM_CART',
				payload: {
					id: id,
					name: title,
					img: img,
					price: price,
				},
			});
		}
	};
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
					<button
						className='del-prod-btn'
						onClick={() => {
							removefromcart();
						}}>
						Remove From Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartProduct;
