import SearchBar from './SearchBar';
import LogoBlue from './logo/LogoBlue';

const NavBar = () => {
	return (
		<>
			<header className="sticky top-0 z-50 flex justify-center w-full bg-mkl-neutral/40 backdrop-blur-xl">
				<nav className="container flex flex-row h-[100px] items-center justify-between">
					<img src="/assets/logo/logo-horizontal.svg" alt="markilang logo" />
					<SearchBar />
					<ul className="inline-flex gap-9 text-mkl-secondary">
						<li>About</li>
						<li>Auctions</li>
						<li className="inline-flex">
							<img
								src="/assets/icon/user-icon.svg"
								alt="user icon"
								className="mx-1"
							/>
							Login
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};
export default NavBar;
