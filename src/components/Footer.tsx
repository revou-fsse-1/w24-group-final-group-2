const Footer = () => {
	return (
		<footer className="flex justify-center w-full bg-mkl-secondary">
			<div className="container flex flex-row items-start my-8 ">
				<div className="flex justify-center basis-1/4">
					<img
						src="/assets/icon/logo-vertical-yellow.svg"
						alt="markilang alternative logo with yellow color"
					/>
				</div>
				<div className="flex justify-center pr-16 basis-1/2 text-mkl-neutral">
					<p className="w-10/12 ">
						<b>Markilang</b> - Your Collectibles Auction Hub. Discover unique
						treasures, from vintage toys to rare artifacts, all affordably
						priced. Join our passionate community of collectors, bid with
						confidence, and unearth your next cherished piece.
					</p>
				</div>
				<div className="flex flex-col justify-center basis-1/4">
					<h3 className="text-2xl font-bold text-left text-mkl-primary">
						Connect with us:
					</h3>
					<div className="flex gap-10 mt-5">
						<img
							src="/assets/icon/facebook.svg"
							alt="facebook logo linked to markilang facebook page"
						/>
						<img
							src="/assets/icon/twitter.svg"
							alt="facebook logo linked to markilang twitter page"
						/>
						<img
							src="/assets/icon/google.svg"
							alt="facebook logo linked to markilang google page"
						/>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
