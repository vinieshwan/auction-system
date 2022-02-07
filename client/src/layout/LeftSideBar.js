import { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import {
	HomeIcon,
	BellIcon,
	SaveIcon,
	CurrencyDollarIcon,
	SupportIcon,
	CogIcon
} from '@heroicons/react/outline';

function LeftSideBar({ isOpen, components }) {
	const { Context } = components;
	const [state, dispatch] = useContext(Context);

	console.log(state);

	if (!state.user) {
		return <div></div>;
	}
	return (
		<div
			className={`flex-none w-2/12 bg-white border border-solid border-r-neutral-100 ${
				isOpen ? 'drawer-left-open' : 'drawer-left-closed'
			}`}
		>
			<header className="px-5 py-5 text-3xl text-center font-extrabold tracking-tight text-gray-700">
				Auction
			</header>
			<div className="flex-grow border-t border-neutral-100 mx-5"></div>
			<div className="p-5">
				<div className="rounded-md py-1">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`w-full flex items-center justify-left px-5 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-700 hover:text-white ${
								isActive ? 'text-white bg-blue-600' : 'text-slate-500 bg-white'
							}`
						}
					>
						<HomeIcon className="h-6 w-6 pr-2" />
						HOME
					</NavLink>
				</div>
				<div className="rounded-md py-1">
					<NavLink
						to="/pages/bid-items"
						className={({ isActive }) =>
							`w-full flex items-center justify-left px-5 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-700 hover:text-white ${
								isActive ? 'text-white bg-blue-600' : 'text-slate-500 bg-white'
							}`
						}
					>
						<CurrencyDollarIcon className="h-6 w-6 pr-2" />
						BID ITEMS
					</NavLink>
				</div>
				<div className="rounded-md py-1">
					<NavLink
						to="/pages/saved-items"
						className={({ isActive }) =>
							`w-full flex items-center justify-left px-5 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-700 hover:text-white ${
								isActive ? 'text-white bg-blue-600' : 'text-slate-500 bg-white'
							}`
						}
					>
						<SaveIcon className="h-6 w-6 pr-2" />
						SAVED ITEMS
					</NavLink>
				</div>
				<div className="rounded-md py-1">
					<NavLink
						to="/pages/notifications"
						className={({ isActive }) =>
							`w-full flex items-center justify-left px-5 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-700 hover:text-white ${
								isActive ? 'text-white bg-blue-600' : 'text-slate-500 bg-white'
							}`
						}
					>
						<BellIcon className="h-6 w-6 pr-2" />
						NOTIFICATIONS
					</NavLink>
				</div>
				<div className="rounded-md py-1">
					<NavLink
						to="/pages/settings"
						className={({ isActive }) =>
							`w-full flex items-center justify-left px-5 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-700 hover:text-white ${
								isActive ? 'text-white bg-blue-600' : 'text-slate-500 bg-white'
							}`
						}
					>
						<CogIcon className="h-6 w-6 pr-2" />
						SETTINGS
					</NavLink>
				</div>
				<div className="rounded-md py-1">
					<NavLink
						to="/pages/help"
						className={({ isActive }) =>
							`w-full flex items-center justify-left px-5 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-700 hover:text-white ${
								isActive ? 'text-white bg-blue-600' : 'text-slate-500 bg-white'
							}`
						}
					>
						<SupportIcon className="h-6 w-6 pr-2" />
						HELP
					</NavLink>
				</div>
			</div>

			<footer className="px-5 fixed bottom-0 w-2/12">
				<div className="flex-grow border-t border-neutral-100"></div>
				<div className="py-5 flex items-center">
					<div className="pr-3">
						<img
							className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
							src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
							alt=""
						/>
					</div>
					<div>
						<h4 className="block mt-1 text-sm leading-tight font-semibold text-gray-700">
							{state.user.name}
						</h4>
						<h6 className="text-xs text-slate-500">
							{`${state.user.role[0].toUpperCase()}${state.user.role.slice(1)}`}{' '}
							User
						</h6>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default LeftSideBar;
