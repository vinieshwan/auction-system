import { useEffect, useState } from 'react';

import { intervalToDuration } from 'date-fns';

function Timer({ endDate }) {
	const [remainingDate, setRemainingDate] = useState({
		months: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setRemainingDate(
				intervalToDuration({
					start: new Date(),
					end: new Date(endDate)
				})
			);
		}, 1000);

		return () => clearTimeout(timer);
	}, [remainingDate]);

	return (
		<div>
			<p className="mt-10 text-xs text-slate-500 text-center">
				Ends in <br />
				<span className="text-sm font-semibold">
					{remainingDate.months} month(s), {remainingDate.days} day(s)
				</span>
			</p>
			<header className="px-5 py-5 text-6xl text-center font-extrabold tracking-tight text-gray-700">
				{remainingDate.hours}:{remainingDate.minutes}:{remainingDate.seconds}
				<span className="font-semibold text-sm text-slate-500"> hours</span>
			</header>
		</div>
	);
}
export default Timer;
