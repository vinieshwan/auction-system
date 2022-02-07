function Header({ title }) {
	return (
		<div>
			<div className="p-5">
				<h4 className="pl-2 block text-md leading-tight font-semibold text-gray-700">
					{title}
				</h4>
			</div>
			<div className="flex-grow border-t border-neutral-100 mx-5"></div>
		</div>
	);
}
export default Header;
