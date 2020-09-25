import React from 'react';
import Product from './Product';
import './DisplayRowStyle.css';
import uuid from 'react-uuid';

const DisplayProductsRow = () => {
	return (
		<>
			<div className='display-all-products'>
				<div className='product-row'>
					<Product
						id={uuid()}
						name='Shoe Dog: A Memoir by the Creator of NIKE Paperback'
						price={399}
						stars={4}
						imgname='https://images-na.ssl-images-amazon.com/images/I/41JxTleg+gL._SX326_BO1,204,203,200_.jpg'
					/>
					<Product
						id={uuid()}
						name='Apple Watch Series 3 - Space Grey '
						price={20999}
						stars={5}
						imgname='https://images.mobilefun.co.uk/graphics/450pixelp/80778.jpg'
					/>
					<Product
						id={uuid()}
						name='
						LG 80 cms (32 Inches) HD Ready LED Smart TV'
						price={15799}
						stars={3}
						imgname='https://images-na.ssl-images-amazon.com/images/I/81Yy5UF05tL._SL1500_.jpg'
					/>
				</div>

				<div className='product-row'>
					<Product
						id={uuid()}
						name='
						Germanys Blaupunkt BTW01 True Wireless Earbuds'
						price={2799}
						stars={4}
						imgname='https://images-na.ssl-images-amazon.com/images/I/61nF2arf7tL._SL1500_.jpg'
					/>
					<Product
						id={uuid()}
						name='Apple MacBook Pro- Space Grey'
						price={135999}
						stars={5}
						imgname='https://images-na.ssl-images-amazon.com/images/I/81bF-d1dNoL._SL1500_.jpg'
					/>
					<Product
						id={uuid()}
						name='Leatherette Sofa Brown Color'
						price={35099}
						stars={5}
						imgname='https://images-na.ssl-images-amazon.com/images/I/61U7uZR-IXL._SL1000_.jpg'
					/>
				</div>
			</div>
		</>
	);
};

export default DisplayProductsRow;
