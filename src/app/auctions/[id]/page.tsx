'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import BidCard, { IBid } from '@/components/Auctions/BidCard';

async function fetcher(url: string) {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (error) {
		throw new Error('error fetching data');
	}
}

export default function AuctionPage() {
	const { data: session, status } = useSession();

	const params = useParams();
	const { data, error, isLoading } = useSWR(
		`/api/assets/${params.id}`,
		fetcher
	);

	if (isLoading) {
		return <div>loading...</div>;
	}

	const isSeller = data.sellerId === session?.user.id;
	function handleSubmit() {
		//check if value is bigger than the highest bid
		//create the create with axios
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
					<p></p>
					<p>{data.description}</p>
				</div>
				<div>
					<div className={`${isSeller ? 'hidden' : ''}`}>
						<input type="input" placeholder="Please place your bid!" />
						<button className="btn-primary" onClick={handleSubmit}>
							Place Bid!
						</button>
					</div>
					<div className="mt-5">
						{data.bidAssets.map((bid: IBid) => {
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
						})}
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
