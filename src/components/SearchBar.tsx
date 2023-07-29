const SearchBar = () => {
	return (
		<div className="relative">
			<input
				placeholder="search item"
				className="h-10 pl-5 pr-10 border-2 rounded-full border-mkl-secondary/30"
			/>
			<img
				src="/assets/icon/search-icon.svg"
				alt="search icon"
				className="absolute top-[8px] right-2"
			/>
		</div>
	);
};
export default SearchBar;
