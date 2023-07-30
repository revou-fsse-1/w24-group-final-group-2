'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import LogoBlue from './logo/LogoBlue';
import IconAvatar from './icons/IconAvatar';
import Link from 'next/link';
import IconSearch from './icons/IconSearch';
import MobileNav from './MobileNav';

interface IWindowSize {
	width: number;
	height: number;
}

export default function Header() {
	const { data: session, status } = useSession();
	const [searchInput, setSearchInput] = useState('');
	const [windowSize, setWindowSize] = useState<IWindowSize>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const searchAuctionList = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key == 'Enter') {
			console.log(searchInput);
		}
	};

	const handleLoginDisplay = () => {
		return status == 'loading' ? (
			<div>.....</div>
		) : status == 'unauthenticated' ? (
			<Link href={'/login'}>
				<button className="flex items-center gap-2 text-left">
					<div className="min-w-fit">
						<IconAvatar size={30} />
					</div>
					<span className="max-w-[110px] line-clamp-2 font-bold">Login</span>
				</button>
			</Link>
		) : (
			<button className="flex items-center gap-2 text-left min-w-fit">
				<div className="min-w-fit">
					<IconAvatar size={30} />
				</div>
				<span className="max-w-[110px] line-clamp-2 font-bold">
					{session?.user?.name}
				</span>
			</button>
		);
	};

	return (
		<div className="w-full flex flex-col items-center px-6 py-6 bg-[#CFD4CB]">
			<header className="flex items-center justify-between w-full gap-5 max-w-7xl">
				<Link href={'/'} className="flex items-center gap-3">
					<LogoBlue size={55} />
					<span className="text-xl font-bold text-[#203C59]">MARKILANG</span>
				</Link>

				<div className="hidden w-1/3 md:flex md:relative">
					<div className="absolute right-1 top-[3px] p-[7px] rounded-full hover:bg-gray-200">
						<IconSearch size={25} />
					</div>
					<input
						type="text"
						name="auctionItem"
						placeholder="Search for..."
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyDown={(e) => searchAuctionList(e)}
						className="w-full py-2 pl-5 pr-12 text-lg rounded-full"
					/>
				</div>

				<div className="hidden gap-4 text-[#203C59] md:flex lg:gap-8">
					<button>About</button>
					<button>Auctions</button>
					{handleLoginDisplay()}
				</div>
				{windowSize.width < 768 ? <MobileNav /> : null}
			</header>
		</div>
	);
}
