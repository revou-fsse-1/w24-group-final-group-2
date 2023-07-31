'use client';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
interface IItemCard {
	id: string;
	name: string;
	endDate: Date | null;
}
export default function ItemCard({ id, name, endDate }: IItemCard) {
	// const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	// useEffect(() => {
	// 	const timer = setInterval(() => {
	// 		setTimeLeft(calculateTimeLeft());
	// 	}, 1000);
	// 	return () => {
	// 		clearInterval(timer);
	// 	};
	// });

	// function calculateTimeLeft() {
	// 	const now = new Date();
	// 	// const diff = endDate.getTime() - now.getTime();

	// 	return {
	// 		days: Math.floor(diff / (1000 * 60 * 60 * 24)),
	// 		hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
	// 		minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
	// 		seconds: Math.floor((diff % (1000 * 60)) / 1000),
	// 	};
	// }

	const replacement = new Date();

	return (
		<div className="transition-all duration-500 hover:scale-110">
			<a href={`/auctions/${id}`}>
				<img
					src="/assets/dummy-image.png"
					alt="dummy-image"
					className=" aspect-square"
				/>
			</a>
			<h3 className="mt-8 text-mkl-secondary">{name}</h3>
			<p className="mt-3 max-w-[325px] text-mkl-secondary">
				<b>Expired: </b>
				{`${replacement}`}
				{/* {timeLeft.days>1?(<b>Expired:{`${endDate}`}</b>):(<b>Time Left:</b>{`${timeLeft.hours} hour(s),${timeLeft.minutes} minute(s),${timeLeft.seconds} second(s)`})} */}
			</p>
			<a href={`/auctions/${id}`}>
				<button className=" mt-7 w-full max-w-[325px] btn-primary">Bid</button>
			</a>
		</div>
	);
}
