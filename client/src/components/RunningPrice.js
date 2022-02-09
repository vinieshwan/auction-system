import { useEffect, useContext, useState } from 'react';

function RunningPrice({ handler, components, contents, className }) {
	const { Context } = components;
	const { getItem, getBidList } = contents;
	const [isNotified, setNotified] = useState(false);
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		async function init() {
			const response = await getItem(handler, 'runningPrice');
			if (response.error) {
				if (response.status === 401) {
					dispatch({ type: 'SET_AUTH', payload: { isAuth: false } });
				} else {
					dispatch({ type: 'SET_ERROR', payload: response.data });
				}
			} else {
				dispatch({
					type: 'SET_PRICE',
					payload: {
						[handler]: response.runningPrice
					}
				});
			}

			const list = await getBidList();
			if (list.error) {
				if (response.status === 401) {
					dispatch({ type: 'SET_AUTH', payload: { isAuth: false } });
				} else {
					dispatch({ type: 'SET_ERROR', payload: list.data });
				}
			} else {
				dispatch({
					type: 'SET_USER_BIDS',
					payload: list
				});
			}

			if (isNotified) {
				return;
			}

			let sum = 0;

			if (list && list.length) {
				list.map((item) => item.itemId === response._id);

				for (const item of list) {
					sum += item.autoBidRunningPrice || 0;
				}

				if (sum >= state.user.maxBid) {
					alert('Sorry you reached the maximum set bid');

					setNotified(true);
				}
			}
		}

		const timer = setTimeout(async () => {
			init();
		}, 2000);

		return () => clearTimeout(timer);
	}, [state]);

	return <div className={className}>${state.itemPrice[handler] || 0}</div>;
}
export default RunningPrice;
