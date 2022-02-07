import { Outlet, useRoutes } from 'react-router-dom';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

function Content({ components, contents, isOpen, setOpen }) {
	const { Home, ItemDetails, Empty } = components;

	const toggleRightDrawer = () => setOpen.setOpenRight(!isOpen.openRight);
	const toggleLeftDrawer = () => setOpen.setOpenLeft(!isOpen.openLeft);

	const routes = [
		{
			path: '/',
			element: <Home components={components} contents={contents} />
		},
		{
			path: '/item-details/:id',
			element: <ItemDetails components={components} contents={contents} />
		},
		{
			path: '/pages/*',
			element: <Empty components={components} contents={contents} />
		}
	];

	const elements = useRoutes(routes);

	return (
		<div className="w-full px-5 overflow-y-auto">
			<header className="px-5 pt-5 flex">
				<div className="flex grow items-center">
					<div className="pr-5">
						<button
							type="button"
							className="rounded-full bg-white shadow-md p-1 text-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
							onClick={toggleLeftDrawer}
						>
							<ChevronLeftIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
				</div>
				<div>
					<button
						type="button"
						className="rounded-full bg-white shadow-md p-1 text-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
						onClick={toggleRightDrawer}
					>
						<ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
			</header>
			{elements}
			<Outlet />
		</div>
	);
}

export default Content;
