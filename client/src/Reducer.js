const Reducer = (state, action) => {
	switch (action.type) {
		case 'SET_ONGOING_ITEMS':
			return {
				...state,
				ongoingItems: action.payload
			};
		case 'SET_UPCOMING_ITEMS':
			return {
				...state,
				upcomingItems: action.payload
			};
		case 'SET_ITEM':
			return {
				...state,
				item: action.payload
			};
		case 'SET_AUTH':
			return {
				...state,
				isAuth: action.payload.isAuth
			};
		case 'SET_USER':
			return {
				...state,
				user: action.payload
			};
		case 'SET_USER_BIDS':
			return {
				...state,
				userBids: action.payload
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

export default Reducer;
