import { useState, useContext, useEffect } from 'react';
import { Navigate, Outlet, useRoutes, useLocation } from 'react-router-dom';

function Main({ components, contents }) {
	const { LeftSideBar, RightSideBar, Content, Login, Context } = components;
	const { getLogin } = contents;
	const [openLeft, setOpenLeft] = useState(true);
	const [openRight, setOpenRight] = useState(false);
	const [state, dispatch] = useContext(Context);
	const location = useLocation();

	useEffect(() => {
		async function init() {
			const response = await getLogin();
			if (response.error) {
				if (response.status === 401) {
					dispatch({ type: 'SET_AUTH', payload: { isAuth: false } });
				} else {
					dispatch({ type: 'SET_ERROR', payload: response.data });
				}
			} else {
				dispatch({ type: 'SET_USER', payload: response });
				dispatch({ type: 'SET_AUTH', payload: { isAuth: true } });
			}
		}

		init();
	}, []);

	const routes = [
		{
			path: '/login',
			element:
				state.isAuth === true ? (
					<Navigate to="/" />
				) : state.isAuth === false ? (
					<Login components={components} contents={contents} />
				) : (
					''
				)
		}
	];

	const elements = useRoutes(routes);

	if (state.isAuth === null) {
		return <div></div>;
	}

	return (
		<div className="flex w-full">
			{location.pathname !== '/login' && state.isAuth === false ? (
				<Navigate to="/login" />
			) : location.pathname !== '/login' && state.isAuth === true ? (
				<div className="flex w-full">
					<LeftSideBar
						isOpen={openLeft}
						setOpen={setOpenLeft}
						components={components}
					/>
					<Content
						isOpen={{ openLeft, openRight }}
						setOpen={{ setOpenLeft, setOpenRight }}
						contents={contents}
						components={components}
					/>
					<RightSideBar
						isOpen={openRight}
						setOpen={setOpenRight}
						components={components}
					/>
				</div>
			) : (
				''
			)}
			{elements}
			<Outlet />
		</div>
	);
}

export default Main;
