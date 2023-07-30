import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ItemCard from '@/components/ItemCard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// authOptions must be exported from the [...nextauth]/route
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// back end import related
import { prisma } from '@/libs/db';
import IconDoubleRight from '@/components/icons/IconDoubleRight';

// server side data fetching
async function getAllAssets(take: number) {
	const assets = await prisma.asset.findMany({ take: take });
	return { assets };
}

export default async function Home() {
	// for authentication
	const session = await getServerSession(authOptions);

	// data fetching
	const { assets } = await getAllAssets(3);

	// if not login
	if (!session) {
		redirect('/login');
	}

	return (
		<>
			<Header />
			<main className="flex flex-col justify-center w-full">
				<section className="flex items-center justify-center w-full h-screen home-background bg-no-repeat bg-cover -mt-[100px]">
					<div className="container">
						<div className="w-1/2 ">
							<h1 className="text-mkl-primary">WELCOME TO MARKILANG</h1>
							<h2 className="mt-2 font-normal text-mkl-neutral">
								Your Gateway to the World of Collectibles!
							</h2>
							<p className="mt-8 text-mkl-neutral">
								Get ready for an exhilarating experience in the realm of
								collectibles! At Markilang, we take pride in curating unique
								auctions that bring together collectors and enthusiasts from all
								walks of life. Whether you're on the hunt for vintage rarities
								or quirky memorabilia, our platform is the perfect destination
								for discovering hidden treasures without breaking the bank.
							</p>
							<div className="mt-8">
								<button className="btn-primary">Start Auction</button>
								<button className="ml-10 btn-secondary">Explore Auction</button>
							</div>
						</div>
					</div>
				</section>
				<section className="flex justify-center w-full">
					<div className="container flex flex-col my-28">
						<div>
							<h2 className="text-mkl-secondary">Auction Available</h2>
							<hr className="mt-2 border-2 w-44 bg-mkl-primary border-mkl-primary" />
							<hr className="mt-3 border-2 w-36 bg-mkl-primary border-mkl-primary" />
						</div>
						<div className="">
							<div className="inline-flex items-center justify-end w-full mb-5">
								<p>VIEW ALL</p>
								<span className="-ml-1">
									<IconDoubleRight size={60} />
								</span>
							</div>
							<div className="flex justify-between">
								{assets.map((asset) => {
									return (
										<ItemCard
											key={asset.id}
											name={asset.name}
											endDate={asset.endTime}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</main>
		</>
	);
}
