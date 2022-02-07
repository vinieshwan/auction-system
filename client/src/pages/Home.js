function Home({ components, contents }) {
	const { Header, SingleRowGallery, TwoRowGallery } = components;

	return (
		<div>
			<Header title="Live" />
			<div className="px-5 pt-5">
				<TwoRowGallery contents={contents} components={components} />
			</div>
			<div className="pr-10 py-5">
				<Header title="Upcoming" />
				<div className="px-5 pt-5">
					<SingleRowGallery
						status="upcoming"
						contents={contents}
						components={components}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
