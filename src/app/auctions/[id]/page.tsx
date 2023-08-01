'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import axios from 'axios';

async function fetcher(url: string) {
	try {
		const res = await axios.get(url);
		return res.data;
	} catch (error) {
		throw new Error('error fetching data');
	}
}

export default function AuctionPage() {
	const params = useParams();
	const { data, error, isLoading } = useSWR(
		`/api/assets/${params.id}`,
		fetcher
	);
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
					<p>open Price - Highest Bids</p>
					{/* map this data */}
					<div>
						<p>username</p>
						<p>created at</p>
						<p>
							<b>Bid Price</b>
						</p>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
