function Empty({ components }) {
	const { Header } = components;

	return (
		<div className="w-full grid">
			<Header title="Empty Page" />
			<div className="w-full flex p-5">This page is empty</div>
		</div>
	);
}

export default Empty;
