'use client';
import Link from 'next/link';
import IconAuction from './icons/IconAuction';
import IconAvatar from './icons/IconAvatar';
import IconHome from './icons/IconHome';
import IconRegister from './icons/IconRegister';
import IconSearch from './icons/IconSearch';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import IconDropdown from './icons/IconDropdown';

export default function MobileNav() {
	const { data: session, status } = useSession();
	const [toggleSearch, setToggleSearch] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [displayDropdownMenu, setDisplayDropdownMenu] = useState(false);
	const router = useRouter();

	const searchAuctionList = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const targetUrl = `/auctions?page=1&limit=10=&search=${searchInput}`;
		if (e.key == 'Enter') {
			// router.push(targetUrl);
			window.location.replace(targetUrl);
		}
	};

	const displaySearchBar = () =>
		!toggleSearch ? (
			''
		) : (
			<div className="relative flex w-full p-6">
				<div className="absolute right-7 top-7 p-[7px] rounded-full hover:bg-gray-200">
					<IconSearch size={25} />
				</div>
				<input
					type="text"
					placeholder="Search for..."
					onChange={(e) => setSearchInput(e.target.value)}
					onKeyDown={(e) => searchAuctionList(e)}
					className="w-full py-3 pl-5 pr-12 rounded-full"
				/>
			</div>
		);

	const handleLoginDisplay = () => {
		return status == 'loading' ? (
			<div className="w-1/5 min-w-fit flex items-center justify-center gap-2 p-3 text-xs hover:bg-[#B2BAAB]">
				<div className="flex flex-col items-center justify-center gap-2">
					<IconAvatar size={35} />
					<span>.....</span>
				</div>
			</div>
		) : status == 'unauthenticated' ? (
			<Link
				href={'/login'}
				className="w-1/5 min-w-fit flex items-center justify-center gap-2 p-3 text-xs hover:bg-[#B2BAAB]"
			>
				<div className="flex flex-col items-center justify-center gap-2">
					<IconAvatar size={35} />
					<span>Login</span>
				</div>
			</Link>
		) : (
			<div
				onClick={() => {
					setDisplayDropdownMenu((prev) => !prev);
					setToggleSearch(false);
				}}
				className="w-1/5 min-w-fit flex items-center justify-center gap-2 p-3 text-xs hover:bg-[#B2BAAB]"
			>
				<div className="flex flex-col items-center justify-center gap-2">
					<IconAvatar size={35} />
					<span>Account</span>
				</div>
				<div
					className={`${
						displayDropdownMenu ? 'rotate-0' : 'rotate-180'
					} flex items-center justify-center`}
				>
					<IconDropdown size={10} />
				</div>
			</div>
		);
	};

	return (
		<nav className="fixed bottom-0 left-0 flex flex-col items-center w-full md:hidden">
			<div className="w-full flex flex-col items-center relative bg-[#CFD4CB]">
				{displaySearchBar()}

				{!displayDropdownMenu ? (
					''
				) : (
					<div className="absolute w-48 bottom-[5.1rem] right-0 flex flex-col text-right text-[#203C59] font-bold border-b-2 border-[#203C59] bg-[#CFD4CB]">
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

				<div className="flex items-center w-full overflow-x-scroll">
					<Link
						href={'/'}
						className="w-1/5 min-w-fit flex flex-col items-center justify-center gap-2 p-3 text-xs hover:bg-[#B2BAAB]"
					>
						<IconHome size={35} />
						<span>Home</span>
					</Link>
					<div
						onClick={() => {
							setToggleSearch((prev) => !prev);
							setDisplayDropdownMenu(false);
						}}
						className="w-1/5 min-w-fit flex flex-col items-center justify-center gap-2 p-3 text-xs cursor-pointer hover:bg-[#B2BAAB]"
					>
						<IconSearch size={35} />
						<span>Search</span>
					</div>
					<Link
						href={'/auctions'}
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
					{handleLoginDisplay()}
				</div>
			</div>
		</nav>
	);
}
