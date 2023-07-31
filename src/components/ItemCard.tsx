'use client';
import { redirect } from 'next/navigation';
import { useState, useEffect } from 'react';
interface IItemCard {
	id: string;
	name: string;
	imageUrl: string;
	endDate: Date;
}
export default function ItemCard({ id, name, imageUrl, endDate }: IItemCard) {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	});

	function calculateTimeLeft() {
		const now = new Date();
		const target = new Date(endDate);
		const diff = target.getTime() - now.getTime();

		return {
			days: Math.floor(diff / (1000 * 60 * 60 * 24)),
			hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((diff % (1000 * 60)) / 1000),
		};
	}

	const replacement = new Date();
	console.log(imageUrl, 'test');

	return (
		<div className="transition-all duration-500 hover:scale-110">
			<a href={`/auctions/${id}`}>
				<img
					src={`${imageUrl}`}
					alt="dummy-image"
					className=" aspect-square max-w-[325px] aspect-square overflow-hidden"
				/>
			</a>
			<h3 className="mt-8 max-w-[325px] text-mkl-secondary">{name}</h3>
			<p className="mt-3 max-w-[325px] text-mkl-secondary">
				<b>Time Left:</b>
				{`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
			</p>
			<a href={`/auctions/${id}`}>
				<button className=" mt-7 w-full max-w-[325px] btn-primary">
					View Auction
				</button>
			</a>
		</div>
	);
}
