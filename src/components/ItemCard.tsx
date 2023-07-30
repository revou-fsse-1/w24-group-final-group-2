'use client';
import { useState, useEffect } from 'react';
interface IItemCard {
	name: string;
	endDate: Date | null;
}
export default function ItemCard({ name, endDate }: IItemCard) {
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
		<div>
			<img
				src="/assets/dummy-image.png"
				alt="dummy-image"
				className=" w-[325px] h-[325px]"
			/>
			<h3 className="mt-8 text-mkl-secondary">{name}</h3>
			<p className="mt-3 max-w-[325px] text-mkl-secondary">
				<b>Expired: </b>
				{`${replacement}`}
			</p>
			<button className=" mt-7 w-full max-w-[325px] btn-primary">Bid</button>
		</div>
	);
}
