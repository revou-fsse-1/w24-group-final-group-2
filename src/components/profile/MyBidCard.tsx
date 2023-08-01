"use client";

import { indonesianCurrency } from "@/utils/Currency";
import Image from "next/image";
import Link from "next/link";
import { useCountdown } from "@/utils/useCountDown";

type MyBidCardProps = {
  bidId: string;
  assetId: string;
  imageUrl: string;
  assetName: string;
  endTime: string;
  bidAmount: number;
  currentPrice: number;
};

export default function MyBidCard({
  bidId,
  assetId,
  imageUrl,
  assetName,
  endTime,
  bidAmount,
  currentPrice,
}: MyBidCardProps) {
  const [days, hours, mins, secs] = useCountdown(endTime);
  const timeRemaining = days + hours + mins + secs;

  const displayBidStatus = () => {
    if (timeRemaining > 0) {
      return (
        <div className="w-2/3 min-w-fit p-2 bg-gray-200 rounded-lg border-l-8 border-black md:w-[340px]">
          <span>Bidding In Progress</span>
        </div>
      );
    }

    // add checks if user won the bid or lose
    if (true) {
      return (
        <div className="w-2/3 min-w-fit p-2 bg-green-200 rounded-lg border-l-8 border-green-800 md:w-[340px]">
          <span>Bidding Successful</span>
        </div>
      );
    } else {
      return (
        <div className="w-2/3 min-w-fit p-2 bg-red-200 rounded-lg border-l-8 border-red-800 md:w-[340px]">
          <span>Bidding Failed</span>
        </div>
      );
    }
  };

  const displayTimeLeft = () => {
    return timeRemaining <= 0 ? (
      <p>Time Left: 0 Days 0 Hours 0 Minutes 0 Seconds</p>
    ) : (
      <p>
        Time Left:{" "}
        {`${days} Days ${hours} Hours ${mins} Minutes ${secs} Seconds`}
      </p>
    );
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex flex-col gap-3 py-6 border-b-2 border-[#222E3F] border-opacity-40 md:flex-row md:items-center md:gap-7">
        <div className="w-1/6 min-w-fit">
          <Link
            href={`/auctions/${assetId}`}
            className="w-48 h-48 flex items-center justify-center border"
          >
            <Image
              src={imageUrl}
              width={300}
              height={300}
              alt={assetName + " image"}
            />
          </Link>
        </div>

        <div className="w-5/6 flex flex-col gap-5 justify-between md:flex-row">
          <div className="flex flex-col gap-5 justify-between md:gap-7">
            <Link href={`/auctions/${assetId}`}>
              <span className="text-2xl font-bold text-[#203C59] md:text-3xl">
                {assetName}
              </span>
            </Link>
            <div className="flex flex-col gap-1">
              {displayTimeLeft()}
              {displayBidStatus()}
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold">
                Your Bid: {indonesianCurrency.format(bidAmount)}
              </p>
              <span className="text-xl font-bold">
                Current Bid: {indonesianCurrency.format(currentPrice)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Link href={`/auctions/${assetId}`}>
              <button className="w-fit px-5 py-3 rounded-md text-white bg-[#203C59]">
                View Asset
              </button>
            </Link>
            {timeRemaining > 0 ? (
              <Link href={`/profile/transactions/checkout/${bidId}`}>
                <button className="w-fit px-5 py-3 rounded-md bg-[#EAC066]">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
