import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function TwoRowGallery({ components, contents }) {
	const { Context } = components;
	const { getItemList } = contents;
	const [state, dispatch] = useContext(Context);

	useEffect(() => {
		async function init() {
			const response = await getItemList('ongoing');

			if (response.error) {
				if (response.status === 401) {
					dispatch({ type: 'SET_AUTH', payload: { isAuth: false } });
				} else {
					dispatch({ type: 'SET_ERROR', payload: response.data });
				}
			} else {
				dispatch({ type: 'SET_ONGOING_ITEMS', payload: response });
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

	if (!state.ongoingItems.length) {
		return (
			<div>
				<p>No items yet</p>
			</div>
		);
	}

	return (
		<div className="grid grid-rows-2 grid-cols-5 overflow-hidden gap-3">
			{state.ongoingItems.map((item) => (
				<div
					key={item.handler}
					className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
				>
					<div className="">
						<div className="md:shrink-0">
							<img
								className="h-48 w-full object-cover md:h-full md:w-48"
								src={`/${item.imagePath.medium}`}
							/>
						</div>
						<div className="p-2 flex items-center">
							<div className="w-3/5">
								<Link
									to={`/item-details/${item.handler}`}
									className="block mt-1 text-sm leading-tight font-medium text-gray-700 hover:underline"
								>
									{item.name}
								</Link>
								<p className="mt-2 text-xs text-slate-500">
									{`Ends ${formatDistanceToNow(new Date(item.endBid), {
										addSuffix: true
									})}`}
								</p>
							</div>
							<div className="w-2/5 grid grid-rows-1 justify-items-end">
								<p className="block text-lg leading-tight font-medium text-black">
									${item.runningPrice}
								</p>
								<Link
									className="rounded-md shadow-md mt-1 text-center px-1 py-1 border border-transparent text-xs font-normal text-white bg-blue-600"
									to={`/item-details/${item.handler}`}
								>
									Bid Now
								</Link>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default TwoRowGallery;
