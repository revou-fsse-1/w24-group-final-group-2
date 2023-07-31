'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import ItemCard from '@/components/ItemCard';
import Header from '@/components/Header';

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
				`https://pokeapi.co/api/v2/ability/?limit=20&offset=${page * 20}`
			);

			// const res = await axios.get(
			// 	`/api/assets?page=${page}&limit=20${search ? `&search=${search}` : ''}`
			// );

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
			<main>
				<h2>{search ? `Search result of ${search}` : `Auction List`}</h2>
				<div className="mb-20 bg-slate-400">
					{assets.map((asset) => (
						<>
							<ItemCard
								key={asset.id}
								id={asset.id.toString()}
								name={asset.name}
								endDate={''}
							/>
						</>
					))}

					<div id="end-of-list" style={{ height: '2opx' }} />
					{loading ? (
						<p>Loading ...</p>
					) : (
						<button onClick={handleLoadMore} disabled={loading}>
							Load More
						</button>
					)}
				</div>
			</main>
		</>
	);
}
