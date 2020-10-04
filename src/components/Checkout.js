import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import PlaceOrder from './PlaceOrder';

function Checkout() {
	const [{ user, cart, UserCart }] = useStateValue();
	const [addr, setAddr] = useState('');
	const [paym, setPaym] = useState('');
	if (user == null) {
		return <Redirect to='/login' />;
	}

	return (
		<div className='checkout-page'>
			<form className='checkout-page-content'>
				<div className='shipping-add-cont'>
					<label className='checkout-label'>Shipping Address</label>
					<textarea
						className='checkout-textarea'
						name='addr'
						value={addr}
						onChange={(e) => setAddr(e.target.value)}
					/>
				</div>
				<div className='shipping-add-cont'>
					<label className='checkout-label'>Payment Method</label>
					<div className='payment-opt-cont'>
						<div className='single-pay-opt'>
							<input
								type='radio'
								name='paym'
								value='Card'
								onChange={(e) => setPaym(e.target.value)}
								checked={paym === 'Card'}
							/>
							<label>Card Payment</label>
						</div>
						<div className='single-pay-opt'>
							<input
								type='radio'
								name='paym'
								value='Online'
								onChange={(e) => setPaym(e.target.value)}
								checked={paym === 'Online'}
							/>
							<label>Net Banking</label>
						</div>
						<div className='single-pay-opt'>
							<input
								type='radio'
								name='paym'
								value='amazon'
								onChange={(e) => setPaym(e.target.value)}
								checked={paym === 'amazon'}
							/>
							<label>Amazon Pay</label>
						</div>
						<div className='single-pay-opt'>
							<input
								type='radio'
								name='paym'
								value='COD'
								onChange={(e) => setPaym(e.target.value)}
								checked={paym === 'COD'}
							/>
							<label>Cash On Delivery</label>
						</div>
						{paym === 'Card' ? (
							<div className='optional-container'>
								<div className='card-cont'>Card</div>
							</div>
						) : paym === 'amazon' ? (
							<div className='optional-container'>Amazon</div>
						) : paym === 'COD' ? (
							<div className='optional-container'>COD</div>
						) : (
							paym == 'Online' && (
								<div className='optional-container'>Online</div>
							)
						)}
					</div>
				</div>
			</form>
			<PlaceOrder />
		</div>
	);
}

export default Checkout;
