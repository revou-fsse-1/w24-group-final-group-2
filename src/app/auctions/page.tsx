'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ItemCard from '@/components/ItemCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface IAsset {
	id: number;
	name: string;
	endDate: Date;
}
export default function AuctionList() {
	const [assets, setAssets] = useState<IAsset[]>([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	const search = useSearchParams().get('search');

	async function loadMoreAssets() {
		setLoading(true);
		try {
			const res = await axios.get(
				`https://pokeapi.co/api/v2/ability/?limit=2&offset=${page * 2}`
			);

			// const res = await axios.get(
			// 	`/api/assets?page=${page}&limit=20${search ? `&search=${search}` : ''}`
			// );
			// const newAssets: IAsset[] = res.data.assets;

			const newAssets: IAsset[] = res.data.results;

			setAssets((prevAssets) => [...prevAssets, ...newAssets]);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error('Error fetching data', error);
		}
		setLoading(false);
	}

	useEffect(() => {
		loadMoreAssets();
	}, []);

	function handleLoadMore() {
		loadMoreAssets();
	}
	return (
		<>
			<Header />
			<main className="flex flex-col items-center justify-center w-full">
				<section className="container flex flex-col mx-5 md:mx-0">
					<div className="ml-10 md:ml-0">
						<h2 className="text-mkl-secondary">
							{search ? `Search result of ${search}` : `Auction List`}
						</h2>
						<hr className="mt-2 border-2 w-44 bg-mkl-primary border-mkl-primary" />
						<hr className="mt-3 border-2 w-36 bg-mkl-primary border-mkl-primary" />
					</div>
					<div className="grid justify-center w-full mt-9 md:grid-cols-3 gap-x-5 gap-y-7">
						{assets.map((asset) => (
							<>
								<ItemCard
									key={asset.id}
									id={`${asset.id}`}
									name={asset.name}
									endDate={''}
								/>
							</>
						))}
					</div>
					<div className="flex justify-center my-10">
						{loading ? (
							<p>Loading ...</p>
						) : (
							<button
								onClick={handleLoadMore}
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
			<span className="mb-20" />
		</>
	);
}