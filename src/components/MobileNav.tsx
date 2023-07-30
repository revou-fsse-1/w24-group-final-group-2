'use client';
import Link from 'next/link';
import IconAuction from './icons/IconAuction';
import IconAvatar from './icons/IconAvatar';
import IconHome from './icons/IconHome';
import IconRegister from './icons/IconRegister';
import IconSearch from './icons/IconSearch';
import { useState } from 'react';

export default function MobileNav() {
	const [toggleSearch, setToggleSearch] = useState(false);

	return (
		<nav className="w-full flex flex-col items-center fixed bottom-0 left-0 bg-[#CFD4CB] md:hidden">
			{!toggleSearch ? (
				''
			) : (
				<div className="relative flex w-full p-6">
					<div className="absolute right-7 top-7 p-[7px] rounded-full hover:bg-gray-200">
						<IconSearch size={25} />
					</div>
					<input
						type="text"
						placeholder="Search for..."
						// onChange={(e) => setSearchInput(e.target.value)}
						// onKeyDown={(e) => searchAuctionList(e)}
						className="w-full py-3 pl-5 pr-12 rounded-full"
					/>
				</div>
			)}

			<div className="flex items-center w-full overflow-x-scroll">
				<Link
					href={'/'}
					className="w-1/5 min-w-fit flex flex-col items-center justify-center gap-2 pl-6 py-3 text-xs hover:bg-[#B2BAAB]"
				>
					<IconHome size={35} />
					<span>Home</span>
				</Link>
				<div
					onClick={() => setToggleSearch((prev) => !prev)}
					className="w-1/5 min-w-fit flex flex-col items-center justify-center gap-2 p-3 text-xs cursor-pointer hover:bg-[#B2BAAB]"
				>
					<IconSearch size={35} />
					<span>Search</span>
				</div>
				<Link
					href={'/auctionList'}
					className="w-1/5 min-w-fit flex flex-col items-center justify-center gap-2 p-3 text-xs hover:bg-[#B2BAAB]"
				>
					<IconAuction size={35} />
					<span>Auctions</span>
				</Link>
				<Link
					href={'/profile/registerAsset'}
					className="w-1/5 min-w-fit flex flex-col items-center justify-center gap-2 p-3 text-xs hover:bg-[#B2BAAB]"
				>
					<IconRegister size={35} />
					<span>Register</span>
				</Link>
				<Link
					href={'/profile'}
					className="w-1/5 min-w-fit flex flex-col items-center justify-center gap-2 pr-6 py-3 text-xs hover:bg-[#B2BAAB]"
				>
					<IconAvatar size={35} />
					<span>Profile</span>
				</Link>
			</div>
		</nav>
	);
}
