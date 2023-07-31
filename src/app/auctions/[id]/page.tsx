import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AuctionPage() {
	return (
		<>
			<Header />
			<main>
				<div>
					<img />
				</div>
				<div>
					<h1>Product Name</h1>
					<p>Description</p>
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
