import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Switch } from '@headlessui/react';

function ItemDetails({ components, contents }) {
	const { Header, SingleRowGallery, Context, Timer } = components;
	const { getItem, postBid, getBidList, enableAutoBid } = contents;
	const [enabled, setEnabled] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [contentUpdated, setContentUpdated] = useState(Context);
	const [state, dispatch] = useContext(Context);
	const { id } = useParams();

	const handleBidSubmission = async (itemId) => {
		const response = await postBid(itemId, {
			isAutoBid: enabled
		});

		if (!response.error) {
			setContentUpdated(true);
		}
	};

	const handleSwitchSubmission = async (itemId) => {
		const response = await enableAutoBid(itemId, {
			isAutoBid: !enabled
		});

		setEnabled(!enabled);

		if (!response.error) {
			setContentUpdated(true);
		}
	};

	useEffect(() => {
		async function init() {
			const response = await getItem(id);
			if (response.error) {
				if (response.status === 401) {
					dispatch({ type: 'SET_AUTH', payload: { isAuth: false } });
				} else {
					dispatch({ type: 'SET_ERROR', payload: response.data });
				}
			} else {
				dispatch({
					type: 'SET_ITEM',
					payload: response
				});
				dispatch({ type: 'SET_AUTH', payload: { isAuth: true } });
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

			let foundItem;
			let sum = 0;
			if (list && list.length) {
				list.map((item) => item.itemId === response._id);

				for (const item of list) {
					if (item.itemId === response._id) {
						foundItem = item;
					}
					sum += item.autoBidRunningPrice;
				}

				if (foundItem) {
					setEnabled(foundItem.isAutoBid);
				}

				if (sum >= 11) {
					setDisabled(true);
				}
			}
		}

		init();
	}, [id, contentUpdated]);

	if (state.error) {
		return (
			<div>
				<p>Something went wrong</p>
			</div>
		);
	}

	if (!Object.keys(state.item).length) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div>
			<Header title={state.item.name} />
			<div className="px-5 pt-5">
				<div className="flex gap-4">
					<div className="w-3/5">
						<img
							className="h-64 w-full rounded-xl shadow-md object-cover"
							src={`/${state.item.imagePath.large}`}
							alt="Man looking at item at a store"
						/>
						<div className="bg-white rounded-xl shadow-md overflow-hidden mt-4">
							<div className="p-5">
								<h4 className="pb-1 block text-sm leading-tight font-semibold text-gray-700">
									Description
								</h4>
								<p>{state.item.description}</p>
								<div className="grid grid-rows-2 grid-flow-col gap-4 mt-5">
									<div>
										<h4 className="pb-1 block text-sm leading-tight font-semibold text-gray-700">
											Type
										</h4>
										<p>{state.item.type}</p>
									</div>
									<div>
										<h4 className="pb-1 block text-sm leading-tight font-semibold text-gray-700">
											Material
										</h4>
										<p>{state.item.material}</p>
									</div>
									<div>
										<h4 className="pb-1 block text-sm leading-tight font-semibold text-gray-700">
											Condition
										</h4>
										<p>{state.item.condition}</p>
									</div>
									<div>
										<h4 className="pb-1 block text-sm leading-tight font-semibold text-gray-700">
											Origin
										</h4>
										<p>{state.item.origin}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-2/5">
						<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
							<Header title="Auction" />
							<Timer endDate={state.item.endBid} />
							<br />
							<div className="flex items-center ml-10 mt-10 mb-5">
								<Switch
									disabled={disabled}
									checked={enabled && !disabled}
									onChange={() => handleSwitchSubmission(state.item._id)}
									className={`${
										enabled && !disabled ? 'bg-green-500' : 'bg-gray-200'
									}  flex items-center h-6 rounded-full w-12 mr-3`}
								>
									<span className="sr-only">Enable autobidding</span>
									<span
										className={`${
											enabled && !disabled ? 'translate-x-7' : 'translate-x-1'
										} inline-block w-4 h-4 transform bg-white rounded-full`}
									/>
								</Switch>
								<span>Enable autobidding</span>
							</div>
							<div className="rounded-md shadow-md text-center mx-10 mb-3 px-8 py-3 border border-transparent text-2xl font-medium text-slate-600 bg-slate-100">
								${state.item.runningPrice}
							</div>
							<div
								className={`w-fit rounded-md shadow-md text-center mx-10 mt-3 mb-10 px-8 py-3 border border-transparent text-md font-medium ${
									enabled || disabled
										? 'text-slate-600 bg-slate-100'
										: 'text-white bg-blue-600'
								}`}
							>
								<button
									type="button"
									disabled={enabled || disabled}
									onClick={() => handleBidSubmission(state.item._id)}
								>
									Bid Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="pr-10 py-5">
				<Header title="Recommended Items" />
				<div className="px-5 pt-5">
					<SingleRowGallery
						status="ongoing"
						contents={contents}
						components={components}
					/>
				</div>
			</div>
		</div>
	);
}

export default ItemDetails;
