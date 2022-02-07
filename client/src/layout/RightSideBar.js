import { ChartSquareBarIcon } from '@heroicons/react/outline';

function RightSideBar({ components, isOpen }) {
	const { Header } = components;

	return (
		<div
			className={`flex-none w-1/4 bg-white border shadow-2xl border-solid border-l-neutral-100 ${
				isOpen ? 'drawer-right-open' : 'drawer-right-closed'
			}`}
		>
			<Header title="Top Bidder" />
			<div className="p-5">
				<div className="flex items-center pb-5">
					<div className="pr-3">
						<img
							className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div className="grow">
						<h4 className="block mt-1 text-sm leading-tight font-semibold text-gray-700">
							John Doe
						</h4>
						<h6 className="text-xs text-slate-500">3 hours ago</h6>
					</div>
					<div>
						<h4 className="block mt-1 text-md leading-tight font-semibold text-gray-700">
							$300.<span className="text-xs">00</span>
						</h4>
					</div>
				</div>
				<div className="flex-grow border-t border-neutral-100 mx-10 pb-5"></div>
				<div className="flex items-center pb-5">
					<div className="pr-3">
						<img
							className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div className="grow">
						<h4 className="block mt-1 text-sm leading-tight font-semibold text-gray-700">
							John Doe
						</h4>
						<h6 className="text-xs text-slate-500">3 hours ago</h6>
					</div>
					<div>
						<h4 className="block mt-1 text-md leading-tight font-semibold text-gray-700">
							$300.<span className="text-xs">00</span>
						</h4>
					</div>
				</div>
				<div className="flex-grow border-t border-neutral-100 mx-10 pb-5"></div>
				<div className="flex items-center pb-5">
					<div className="pr-3">
						<img
							className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div className="grow">
						<h4 className="block mt-1 text-sm leading-tight font-semibold text-gray-700">
							John Doe
						</h4>
						<h6 className="text-xs text-slate-500">3 hours ago</h6>
					</div>
					<div>
						<h4 className="block mt-1 text-md leading-tight font-semibold text-gray-700">
							$300.<span className="text-xs">00</span>
						</h4>
					</div>
				</div>
				<div className="flex-grow border-t border-neutral-100 mx-10 pb-5"></div>
				<div className="flex items-center pb-5">
					<div className="pr-3">
						<img
							className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div className="grow">
						<h4 className="block mt-1 text-sm leading-tight font-semibold text-gray-700">
							John Doe
						</h4>
						<h6 className="text-xs text-slate-500">3 hours ago</h6>
					</div>
					<div>
						<h4 className="block mt-1 text-md leading-tight font-semibold text-gray-700">
							$300.<span className="text-xs">00</span>
						</h4>
					</div>
				</div>
			</div>
			<Header title="Recent Activity" />
			<div className="p-5 flex items-align">
				<div>
					<div className="p-3 rounded-full bg-slate-50 border border-solid border-slate-100 text-blue-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white">
						<ChartSquareBarIcon className="h-6 w-6" aria-hidden="true" />
					</div>
				</div>
				<div className="px-3">
					<h4 className="block pb-1 text-sm leading-tight font-semibold text-gray-700">
						New Bid Appeared
					</h4>
					<h6 className="text-xs text-slate-500">
						John Doe has placed higher bid on item 1
					</h6>
				</div>
			</div>
			<div className="p-5 flex items-align">
				<div>
					<div className="p-3 rounded-full bg-slate-50 border border-solid border-slate-100 text-blue-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-white">
						<ChartSquareBarIcon className="h-6 w-6" aria-hidden="true" />
					</div>
				</div>
				<div className="px-3">
					<h4 className="block pb-1 text-sm leading-tight font-semibold text-gray-700">
						New Bid Appeared
					</h4>
					<h6 className="text-xs text-slate-500">
						John Doe has placed higher bid on item 1
					</h6>
				</div>
			</div>
		</div>
	);
}

export default RightSideBar;
