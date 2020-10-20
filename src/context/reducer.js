export let myinitialstate = {
	cart: [],
	user: null,
	Name: '',
	UserCart: [],
	docID: '',
	UserOrders: [],
};

export const myreducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_BASKET': {
			const prodexist = state.cart.filter((item) => item.id == action.payload.id);
			if (prodexist > 1) {
				alert('You already have this product!');
				return {
					cart: state.cart,
				};
			} else {
				return {
					...state,
					cart: [...state.cart, action.payload],
				};
			}
		}
		case 'USER_ADD_TO_BASKET': {
			return {
				...state,
				UserCart: [...state.UserCart, action.payload],
			};
		}
		case 'USER_REMOVE_FROM_CART': {
			let existingcart = [...state.UserCart];
			let newcart = existingcart.filter((item) => item.id !== action.payload.id);
			return {
				...state,
				UserCart: newcart,
			};
		}
		case 'REMOVE_FROM_CART': {
			let existingcart = [...state.cart];
			let newcart = existingcart.filter((item) => item.id !== action.payload.id);

			return {
				...state,
				cart: newcart,
			};
		}
		case 'SET_USER': {
			return {
				...state,
				user: action.payload,
			};
		}
		case 'SET_USER_DETAILS': {
			return {
				...state,
				Name: action.payload.Name,
				UserCart: action.payload.UserCart,
				docID: action.payload.docID,
				UserOrders: action.payload.UserOrders,
			};
		}
		case 'SET_ORDERS': {
			return {
				...state,
				UserOrders: [...state.UserOrders, ...state.UserCart],
			};
		}

		case 'CLEAR_CART': {
			return {
				...state,
				UserCart: [],
			};
		}

		default:
			return state;
	}
};
