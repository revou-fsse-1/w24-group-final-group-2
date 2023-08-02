"use client";
import { indonesianCurrency } from "@/utils/Currency";
import { useCountdown } from "@/utils/useCountDown";
import Link from "next/link";
import Image from "next/image";

interface IItemCard {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  highestBid: number;
  endDate: string;
}

export default function ItemCard({
  id,
  name,
  imageUrl,
  price,
  highestBid,
  endDate,
}: IItemCard) {
  const [days, hours, mins, secs] = useCountdown(endDate);

  return (
    <div className="flex flex-col gap-5 text-mkl-secondary">
      <Link href={`/auctions/${id}`}>
        <Image
          src={`${imageUrl}`}
          width={600}
          height={600}
          alt="dummy-image"
          className="aspect-square max-w-[325px] overflow-hidden"
        />
      </Link>

      <h3 className="h3 max-w-[325px] line-clamp-2">{name}</h3>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <p>Starting price:</p>
          <p>{indonesianCurrency.format(price)}</p>
        </div>

        <div className="flex flex-col text-lg">
          <p>Current bid:</p>
          <p className="font-bold">{indonesianCurrency.format(highestBid)}</p>
        </div>

        <div className="flex flex-col text-xl">
          <p>Time Left:</p>
          <span
            className="font-bold"
            suppressHydrationWarning
          >{`${days}d ${hours}h ${mins}m ${secs}s`}</span>
        </div>
      </div>

      <Link href={`/auctions/${id}`}>
        <button className=" mt-7 w-full max-w-[325px] btn-primary">
          View Auction
        </button>
      </Link>
    </div>
  );
}
