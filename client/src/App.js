import { createContext, useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LeftSideBar, RightSideBar, Content, Login } from './layout';
import { Header, SingleRowGallery, TwoRowGallery, Timer } from './components';
import { Home, ItemDetails, Empty } from './pages';
import Reducer from './Reducer';
import Main from './Main';
import {
	getItemList,
	getItem,
	postBid,
	getBidList,
	login,
	getLogin,
	enableAutoBid
} from './apis';

const initialState = {
	ongoingItems: [],
	upcomingItems: [],
	item: [],
	isAuth: null,
	user: null,
	error: null
};

const Context = createContext(initialState);

const components = {
	LeftSideBar,
	RightSideBar,
	Content,
	Header,
	SingleRowGallery,
	TwoRowGallery,
	Home,
	ItemDetails,
	Context,
	Timer,
	Login,
	Empty
};
const contents = {
	getItemList,
	getItem,
	postBid,
	getBidList,
	login,
	getLogin,
	enableAutoBid
};

function App() {
	const [state, dispatch] = useReducer(Reducer, initialState);

	return (
		<div className="h-screen container m-0 max-w-7xl border-solid bg-slate-50">
			<div className="flex h-screen">
				<BrowserRouter>
					<Context.Provider value={[state, dispatch]}>
						<Main components={components} contents={contents} />
					</Context.Provider>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
