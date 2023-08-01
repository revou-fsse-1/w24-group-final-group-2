'use client';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import LogoBlue from './logo/LogoBlue';
import IconAvatar from './icons/IconAvatar';
import Link from 'next/link';
import IconSearch from './icons/IconSearch';
import MobileNav from './MobileNav';
import IconDropdown from './icons/IconDropdown';

interface IWindowSize {
	width: number;
	height: number;
}

export default function Header() {
	const { data: session, status } = useSession();
	const [searchInput, setSearchInput] = useState('');
	const [displayDropdownMenu, setDisplayDropdownMenu] = useState(false);
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
			<div className="flex items-center gap-3">
				<div className="min-w-fit">
					<IconAvatar size={30} />
				</div>
				<span className="flex items-center">.....</span>
			</div>
		) : status == 'unauthenticated' ? (
			<Link href={'/login'}>
				<button className="flex items-center gap-2 text-left">
					<div className="min-w-fit">
						<IconAvatar size={30} />
					</div>
					<span className="font-bold">Login</span>
				</button>
			</Link>
		) : (
			<button
				onClick={() => setDisplayDropdownMenu((prev) => !prev)}
				className="flex items-center gap-2 text-left min-w-fit"
			>
				<div className="flex items-center gap-3">
					<div className="min-w-fit">
						<IconAvatar size={30} />
					</div>
				</div>
				<div className={displayDropdownMenu ? 'rotate-180' : 'rotate-0'}>
					<IconDropdown size={10} />
				</div>
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

				<div className="hidden text-[#203C59] md:flex md:flex-col md:relative">
					<div className="flex gap-4 lg:gap-8">
						<Link href={'/auctions'}>
							<button>Auctions</button>
						</Link>
						{handleLoginDisplay()}
					</div>

					{!displayDropdownMenu ? (
						''
					) : (
						<div className="absolute w-56 top-16 right-0 flex flex-col text-lg text-right font-bold z-50 border-t-2 border-[#203C59] bg-[#CFD4CB]">
							<Link
								href={'/profile'}
								onClick={() => setDisplayDropdownMenu(false)}
								className="py-2 px-4 hover:bg-[#B2BAAB]"
							>
								<span>Profile</span>
							</Link>
							<Link
								href={'/profile/myBids'}
								onClick={() => setDisplayDropdownMenu(false)}
								className="py-2 px-4 hover:bg-[#B2BAAB]"
							>
								<span>My Bids</span>
							</Link>
							<Link
								href={'/profile/myAssets'}
								onClick={() => setDisplayDropdownMenu(false)}
								className="py-2 px-4 hover:bg-[#B2BAAB]"
							>
								<span>My Assets</span>
							</Link>
							<Link
								href={'/profile/transactions'}
								onClick={() => setDisplayDropdownMenu(false)}
								className="py-2 px-4 hover:bg-[#B2BAAB]"
							>
								<span>Transactions</span>
							</Link>
							<hr className="h-[2px] mx-4 my-2 border-0 bg-[#222E3F] bg-opacity-40" />
							<div className="px-4 pt-2 font-normal line-clamp-2">
								<span>{session?.user?.name}</span>
							</div>
							<div
								onClick={() => {
									signOut();
									setDisplayDropdownMenu(false);
								}}
								className="py-2 px-4 text-rose-600 cursor-pointer hover:bg-[#B2BAAB]"
							>
								<span>Sign Out</span>
							</div>
						</div>
					)}
				</div>
				{windowSize.width < 768 ? <MobileNav /> : null}
			</header>
		</div>
	);
}
