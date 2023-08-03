'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ItemCard from '@/components/ItemCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface IAsset {
	id: string;
	name: string;
	imageUrl: string;
	openingPrice: number;
	highestBid: number;
	endTime: Date;
}

export default function AuctionList() {
	const [assets, setAssets] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [isInitLoad, setInitLoad] = useState(true);

	const search = useSearchParams().get('search');

	async function loadMoreAssets() {
		setLoading(true);
		console.log('loadMoreAssets');
		try {
			const res = await axios.get(
				`/api/assets?page=${page}&limit=10${search ? `&search=${search}` : ''}`
			);

			console.log(res.data.assets);
			const newAssets: IAsset[] = res.data.assets;
			setAssets((prevAssets: any) => [...prevAssets, ...newAssets]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error('Error fetching data', error);
		}
		setLoading(false);
	}

	async function reloadAssets() {
		setLoading(true);
		try {
			const res = await axios.get(
				`/api/assets?page=1&limit=10${search ? `&search=${search}` : ''}`
			);

			console.log(res.data.assets);

			const newAssets: IAsset[] = res.data.assets;
			setAssets((prevAssets: any) => [...prevAssets, ...newAssets]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error('Error fetching data', error);
		}
		setLoading(false);
	}

	useEffect(() => {
		loadMoreAssets();
	}, []);

	return (
		<>
			<Header />
			<main className="flex flex-col items-center justify-center w-full">
				<section className="container flex flex-col mx-5 md:mx-0">
					<div className="mt-10 ml-10 md:ml-0">
						<h2 className="h2 text-mkl-secondary">
							{search ? `Searching for: ${search}` : `Auction List`}
						</h2>
						<hr className="mt-2 border-2 w-44 bg-mkl-primary border-mkl-primary" />
						<hr className="mt-3 border-2 w-36 bg-mkl-primary border-mkl-primary" />
					</div>

					<div className="grid items-start justify-center w-full mt-9 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-10 gap-x-5 gap-y-7">
						{!loading
							? assets.map((asset: any) => (
									<ItemCard
										key={asset.id}
										id={asset.id}
										name={asset.name}
										imageUrl={asset.imageUrl}
										price={asset.openingPrice}
										highestBid={
											!asset.bidAssets[0] ? 0 : asset.bidAssets[0].bidAmount
										}
										endDate={String(asset.endTime)}
									/>
							  ))
							: ''}
					</div>

					<div className="flex justify-center my-10">
						{loading ? (
							<p>Loading ...</p>
						) : (
							<button
								onClick={() => loadMoreAssets()}
								disabled={loading}
								className="btn-secondary"
							>
								Load More
							</button>
						)}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
