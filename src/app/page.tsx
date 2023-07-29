'use client';

import Footer from '@/components/Footer';
import ItemCard from '@/components/ItemCard';
import NavBar from '@/components/NavBar';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { data: session } = useSession();

	const validateUserLogin = () => {
		return session && session.user ? (
			<div className="flex flex-col gap-2 p-5 border-2">
				<p>{session.user.email}</p>
				<p>{session.user.image}</p>
				<p>{session.user.name}</p>

				<button onClick={() => signOut()}>Sign Out</button>
			</div>
		) : (
			''
		);
	};

	return (
		<>
			<NavBar />
			<main className="flex flex-col justify-center w-full">
				{validateUserLogin()}
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
								<img
									src="/assets/icon/double-right-icon.svg"
									alt=""
									className="-mt-[2px]"
								/>
							</div>
							<div className="flex justify-between">
								<ItemCard />
								<ItemCard />
								<ItemCard />
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</main>
		</>
	);
}
