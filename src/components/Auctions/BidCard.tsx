import { indonesianCurrency } from '@/utils/Currency';

interface IBidder {
	name: string;
}
export interface IBid {
	id: string;
	bidAmount: number;
	// bidderName: string;
	createdAt: Date;
	bidder: IBidder;
}

export default function BidCard({ bidAmount, bidder, createdAt }: IBid) {
	function getDate(date: Date) {
		const newDate = new Date(date);
		return newDate.toLocaleString('en-GB', {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});
	}

	function getTime(time: Date) {
		const newTime = new Date(time);
		return newTime.toLocaleString('en-GB', {
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			timeZoneName: 'short',
		});
	}
	const date = getDate(createdAt);
	const time = getTime(createdAt);
	return (
		<div className="flex flex-row items-center justify-between w-full px-5 py-2 bg-mkl-accent text-mkl-secondary rounded-xl">
			<p className="text-lg">{bidder.name}</p>
			<div>
				<small>
					{date}
					<br />
				</small>
				<b>{time}</b>
			</div>

			<p>{indonesianCurrency.format(bidAmount)}</p>
		</div>
	);
}
