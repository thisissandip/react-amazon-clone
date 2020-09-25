export let myinitialstate = {
	cart: [],
	user: null,
};

export const myreducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_BASKET': {
			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		}
		case 'REMOVE_FROM_CART': {
			let existingcart = [...state.cart];
			let newcart = existingcart.filter(
				(item) => item.id !== action.payload.id
			);

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

		case 'CLEAR_CART': {
			return {
				...state,
				cart: [],
			};
		}

		default:
			return state;
	}
};
