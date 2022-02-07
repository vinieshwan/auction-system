import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon, XCircleIcon } from '@heroicons/react/solid';
import { useForm } from 'react-hook-form';

function Login({ components, contents }) {
	const { Context } = components;
	const { login } = contents;
	const navigate = useNavigate();
	const [isError, setIsError] = useState(false);
	const [state, dispatch] = useContext(Context);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm();

	const onSubmit = async (data) => {
		const response = await login(data.email, data.password);
		if (response.error) {
			reset();
			setIsError(true);
			if (response.status === 401) {
				dispatch({ type: 'SET_AUTH', payload: { isAuth: false } });
			} else {
				dispatch({ type: 'SET_ERROR', payload: response.data });
			}
		} else {
			dispatch({ type: 'SET_AUTH', payload: { isAuth: true } });
			navigate('/');
		}
	};

	return (
		<div className="min-h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<header className="px-5 py-5 text-3xl text-center font-extrabold tracking-tight text-gray-700">
						Auction
					</header>

					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in
					</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Email address"
								{...register('email', {
									required: 'required',
									pattern: {
										value: /\S+@\S+\.\S+/,
										message: 'Invalid email address format'
									}
								})}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								{...register('password', {
									required: 'required',
									minLength: {
										value: 5,
										message: 'Password min length is 5'
									}
								})}
							/>
						</div>
					</div>
					{errors.email || errors.password || isError ? (
						<div className="bg-red-400 rounded-md text-white border-1 border-red-500 px-8 py-2">
							{errors.email ? (
								<span className="flex items-center">
									<XCircleIcon className="h-3 w-3 text-white mr-1" />
									{errors.email.message}
								</span>
							) : (
								''
							)}
							{errors.password ? (
								<span className="flex items-center">
									<XCircleIcon className="h-3 w-3 text-white mr-1" />
									{errors.password.message}
								</span>
							) : (
								''
							)}
							{isError ? (
								<span className="flex items-center">
									<XCircleIcon className="h-3 w-3 text-white mr-1" />
									User does not exist
								</span>
							) : (
								''
							)}
						</div>
					) : (
						''
					)}
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-900"
							>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								Forgot your password?
							</a>
						</div>
					</div>
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<span className="absolute left-0 inset-y-0 flex items-center pl-3">
								<LockClosedIcon
									className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
									aria-hidden="true"
								/>
							</span>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
