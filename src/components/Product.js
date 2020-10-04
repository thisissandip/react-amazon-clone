import React, { useCallback, useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from '../fire';
import uuid from 'react-uuid';

const Product = ({ id, name, stars, price, imgname }) => {
	const [state, dispatch] = useStateValue();

	useEffect(() => {
		if (state.docID) {
			db.collection('users').doc(state.docID).update({
				Cart: state.UserCart,
			});
		}
	}, [state.UserCart]);

	const addtocart = () => {
		if (state.user) {
			dispatch({
				type: 'USER_ADD_TO_BASKET',
				payload: {
					randomid: uuid(),
					id: id,
					name: name,
					price: price,
					imgname: imgname,
				},
			});
		} else {
			dispatch({
				type: 'ADD_TO_BASKET',
				payload: {
					id: id,
					name: name,
					price: price,
					imgname: imgname,
				},
			});
		}

		toast(
			() => {
				return (
					<div className='noti-cont'>
						<img className='noti-img' src={imgname} />
						<div className='noti-msg'>
							<div className='noti-title'>{name}</div>
							<span>
								<strong> Added to your cart</strong>
							</span>
						</div>
					</div>
				);
			},
			{
				position: 'top-right',
				autoClose: 1000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				progress: undefined,
			}
		);
	};
	return (
		<>
			<div className='product-container'>
				<div className='details'>
					<div className='product-title'>{name}</div>
					<div className='product-price'>₹ {price}</div>
					<div className='stars'>
						{[...Array(stars)].map((e, i) => (
							<div key={i}>⭐</div>
						))}
					</div>
				</div>
				<img className='product-img' src={imgname}></img>
				<button className='add-btn' onClick={addtocart}>
					Add To Cart
				</button>
			</div>
		</>
	);
};

export default Product;
