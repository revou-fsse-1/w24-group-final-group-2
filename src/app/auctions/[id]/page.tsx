'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BidCard, { IBid } from '@/components/Auctions/BidCard';
import { useState } from 'react';

async function fetcher(url: string) {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (error) {
		throw new Error('error fetching data');
	}
}

export default function AuctionPage() {
	const [bidAmountValue, setBidAmountValue] = useState(0);

	const { data: session } = useSession();

	const params = useParams();
	const { data, error, isLoading } = useSWR(
		`/api/assets/${params.id}`,
		fetcher,
		{ refreshInterval: 500 }
	);

	console.log('data:', data);

	async function doPost() {
		await axios.post(
			'/api/bids',
			{
				bidAmount: bidAmountValue,
				currentPrice: 0,
				assetId: params.id,
				userId: session?.user.id,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}

	if (isLoading) {
		return <div>loading...</div>;
	}

	if (error) {
		return <div>Fail to fetch data</div>;
	}
	const length = data.bidAssets.length - 1;
	const isSeller = data.sellerId === session?.user.id;
	async function handleSubmit() {
		// //check if there is any bid done
		// if (data.bidAssets.length > 0) {
		// 	//check if the last bidder is the user
		// 	if (data.bidAssets[length].userId !== session?.user.id) {
		// 		//check if value is bigger than the highest bid
		// 		if (data.bidAssets[length].bidAmount < bidAmountValue) {
		// 			//create it
		// 			doPost();
		// 		} else {
		// 			alert('bid must be higher than current Price');
		// 		}
		// 	} else {
		// 		alert('You are the highest biddder');
		// 	}
		// } else {
		// 	// check if the value is bigger than the opening price
		// 	if (data.openingPrice < bidAmountValue) {
		// 		doPost();
		// 	} else {
		// 		alert('bid must be higher than opening price');
		// 	}
		// }
		const lastBid = data.bidAssets[length];
		if (data.bidAssets.length > 0) {
			if (lastBid.userId !== session?.user.id) {
				if (lastBid.bidAmount > bidAmountValue) {
					alert('Bid must be higher than current price');
					return;
				}
			} else {
				alert('you re the highest bidder');
				return;
			}
		} else {
			if (data.openingPrice > bidAmountValue) {
				alert('bid must be higher than opening price');
				return;
			}
		}
		doPost();
	}

	return (
		<>
			<Header />
			<main>
				<div>
					<img src={`${data.imageUrl}`} alt="" />
					<p></p>
				</div>
				<div>
					<h1>{data.name}</h1>
					<h2>{data.openingPrice}</h2>
					<p>{data.description}</p>
				</div>
				<div>
					<div className={`${isSeller ? 'hidden' : ''}`}>
						<input
							type="input"
							placeholder="Please place your bid!"
							onChange={(e) => setBidAmountValue(Number(e.target.value))}
							value={Number(data.bidAssets[length].bidAmount) + 100000}
						/>
						<button className="btn-primary" onClick={handleSubmit}>
							Place Bid!
						</button>
					</div>
					<div className="mt-5">
						{!data.bidAssets ? (
							<p>Be The First to bid!</p>
						) : (
							data.bidAssets
								.map((bid: IBid) => {
									return (
										<>
											<BidCard
												key={bid.id}
												id={bid.id}
												bidAmount={bid.bidAmount}
												bidder={bid.bidder}
												createdAt={bid.createdAt}
											/>
										</>
									);
								})
								.reverse()
						)}

						{}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
