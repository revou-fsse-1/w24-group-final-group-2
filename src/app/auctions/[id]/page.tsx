'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BidCard, { IBid } from '@/components/Auctions/BidCard';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LoadingSpinner from '@/components/LoadingSpinner';

async function fetcher(url: string) {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (error) {
		throw new Error('error fetching data');
	}
}

export default function AuctionPage() {
	const [autoBidValue, setAutoBidValue] = useState<number>(0);
	const [isAutoBid, setAutoBid] = useState<boolean>(false);
	const { data: session } = useSession();
	const params = useParams();
	const { data, error, isLoading } = useSWR(
		`/api/assets/${params.id}`,
		fetcher,
		{ refreshInterval: 500 }
	);
	const assetData = data;

	const schema = yup.object({
		bidValue: yup.number(),
		autoBidValue: yup.number(),
	});
	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

	if (isLoading) {
		return (
			<div>
				<LoadingSpinner />
				Loading
			</div>
		);
	}

	const length =
		data.bidAssets.length === undefined ? 0 : data.bidAssets.length - 1;
	const isSeller = data.sellerId === session?.user.id;
	const lastBid = data.bidAssets[length];
	const defaultBidInputValue =
		lastBid === undefined ? assetData.openingPrice : lastBid.bidAmount;

	async function doPost(bidSubmittedValue: number) {
		await axios.post(
			'/api/bids',
			{
				bidAmount: bidSubmittedValue,
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

	async function onSubmit(data: any) {
		const bidAmountValue = data.bidValue;

		if (session) {
			if (lastBid.userId !== session?.user.id) {
				if (assetData.openingPrice < bidAmountValue) {
					if (lastBid.bidAmount < bidAmountValue) {
						console.log('done');
					} else {
						alert('bid must be higher than the current price');
						return;
					}
				} else {
					alert('bid must be higher than opening price');
					return;
				}
			} else {
				alert('you are the highest bidder');
				return;
			}
		} else {
			alert('please login');
			return;
		}
	}

	function handleAutoBid(event: React.ChangeEvent<HTMLInputElement>) {
		setAutoBid(event.target.checked);
		if (lastBid === undefined) {
			setAutoBidValue(assetData.openingPrice);
		} else {
			setAutoBidValue(lastBid.bidAmount);
		}
	}

	return (
		<>
			<Header />
			<main>
				<div>
					<img src={`${data.imageUrl}`} alt="" />
				</div>
				<div>
					<h1>{data.name}</h1>
					<h2>{data.openingPrice}</h2>
					<p>{data.description}</p>
				</div>
				<div>
					<div className={`${isSeller ? 'hidden' : ''}`}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								id="auto-bid-check"
								type="checkbox"
								checked={isAutoBid}
								onChange={handleAutoBid}
							/>

							<label htmlFor="auto-bid-check">Enable Auto Bid</label>
							{isAutoBid ? (
								<input
									{...register('autoBidValue')}
									type="input"
									value={autoBidValue + 100000}
								/>
							) : (
								<input
									{...register('bidValue')}
									type="input"
									placeholder="Please place your bid!"
									defaultValue={defaultBidInputValue + 100000}
								/>
							)}

							<button className="btn-primary" type="submit">
								Place Bid!
							</button>
						</form>
					</div>
					<div className="mt-5 nth-child(2):text-red">
						{!data.bidAssets ? (
							<p>Be The First to bid!</p>
						) : (
							data.bidAssets
								.slice(-5)
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
