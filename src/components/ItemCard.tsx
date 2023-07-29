const ItemCard = () => {
	return (
		<div>
			<img src="/assets/dummy-image.png" alt="dummy-image" />
			<h3 className="mt-8 text-mkl-secondary">Item Title</h3>
			<p className="mt-3 ">TIME LEFT: 2 Hours 24 minutes</p>
			<button className=" mt-7 w-full max-w-[325px] btn-primary">Bid</button>
		</div>
	);
};
export default ItemCard;
