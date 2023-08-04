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
  highestBid: number;
  bidderEmail: string;
  myEmail: string;
  hasTransaction: boolean;
};

export default function MyBidCard({
  bidId,
  assetId,
  imageUrl,
  assetName,
  endTime,
  bidAmount,
  highestBid,
  bidderEmail,
  myEmail,
  hasTransaction,
}: MyBidCardProps) {
  const [days, hours, mins, secs] = useCountdown(endTime);
  const timeRemaining = days + hours + mins + secs;

  const displayBidStatus = () => {
    if (timeRemaining > 0) {
      return (
        <div className="w-2/3 min-w-fit px-3 py-2 bg-gray-200 rounded-lg border-l-8 border-black md:w-[340px]">
          <span>Bidding In Progress</span>
        </div>
      );
    }

    // Check if user won or lose the bid
    if (bidderEmail == myEmail) {
      return (
        <div className="w-2/3 min-w-fit px-3 py-2 bg-green-200 rounded-lg border-l-8 border-green-800 md:w-[340px]">
          <span>You won the bid!</span>
        </div>
      );
    } else {
      return (
        <div className="w-2/3 min-w-fit px-3 py-2 bg-red-200 rounded-lg border-l-8 border-red-800 md:w-[340px]">
          <span>You lost the bid...</span>
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

        <div className="flex flex-col gap-5 justify-between md:flex-row md:w-5/6">
          <div className="flex flex-col gap-5 justify-between md:w-4/6  md:gap-7">
            <Link
              href={`/auctions/${assetId}`}
              className="line-clamp-5 md:line-clamp-2"
            >
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
                Highest Bid: {indonesianCurrency.format(highestBid)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5 justify-center md:w-2/6 md:items-end">
            <Link href={`/auctions/${assetId}`}>
              <button className="w-fit px-5 py-3 rounded-md text-white bg-[#203C59]">
                View Asset
              </button>
            </Link>
            {timeRemaining < 0 && bidderEmail == myEmail && bidAmount == highestBid && !hasTransaction ? (
              <Link href={`/profile/transactions/checkout/${bidId}`}>
                <button className="w-fit px-5 py-3 rounded-md bg-[#EAC066]">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              ""
            )}
            {hasTransaction && (
              <div className="w-fit px-5 py-3 rounded-md bg-green-300">
                <span>Payment Successful</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
