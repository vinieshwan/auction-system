import { useContext, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

function SingleRowGallery({ components, contents, status }) {
	const { Context } = components;
	const { getItemList } = contents;
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		async function init() {
			const response = await getItemList(status);
			if (response.error) {
				if (response.status === 401) {
					dispatch({ type: 'SET_AUTH', payload: { isAuth: false } });
				} else {
					dispatch({ type: 'SET_ERROR', payload: response.data });
				}
			} else {
				dispatch({
					type: `SET_${status.toUpperCase()}_ITEMS`,
					payload: response
				});
				dispatch({ type: 'SET_AUTH', payload: { isAuth: true } });
			}
		}

		init();
	}, []);

	if (state.error) {
		return (
			<div>
				<p>Something went wrong</p>
			</div>
		);
	}

	if (!state[`${status}Items`].length) {
		return (
			<div>
				<p>No items yet</p>
			</div>
		);
	}

	return (
		<div className="grid grid-rows-1 grid-cols-8 gap-3">
			{state[`${status}Items`].map((item) => (
				<div
					key={item.handler}
					className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
				>
					<div className="md:shrink-0">
						<img
							className="h-48 w-full object-cover md:h-full md:w-48"
							src={`/${item.imagePath.thumbnail}`}
						/>
					</div>
					<div className="p-2">
						{status === 'ongoing' ? (
							<Link
								className="rounded-md shadow-md mt-1 text-center px-5 py-1 border border-transparent text-xs font-normal text-white bg-blue-600"
								to={`/item-details/${item.handler}`}
							>
								Bid Now
							</Link>
						) : (
							''
						)}

						<p className="mt-2 text-xs text-gray-700 font-thin">
							{formatDistanceToNow(new Date(item.startBid), {
								addSuffix: true
							})}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
export default SingleRowGallery;
