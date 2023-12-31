"use client";

import React from "react";
import { indonesianCurrency } from "@/utils/Currency";
import Image from "next/image";
import { useCountdown } from "@/utils/useCountDown";
import Link from "next/link";
import axios from "axios";

type MyAssetCardProps = {
  id: string;
  imageUrl: string;
  assetName: string;
  endTime: string;
  startingPrice: number;
  highestBid: number;
  bidderName: string;
};

export default function MyAssetCard({
  id,
  imageUrl,
  assetName,
  endTime,
  startingPrice,
  highestBid,
  bidderName,
}: MyAssetCardProps) {
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

    return (
      <>
        <div className="w-2/3 min-w-fit p-2 bg-green-200 rounded-lg border-l-8 border-green-800 md:w-[340px]">
          <span>Bidding Complete</span>
        </div>
        {!bidderName ? (
          <div className="w-2/3 min-w-fit py-2 px-4 bg-red-200 rounded-lg md:w-[340px]">
            <span>Asset failed to be sold</span>
          </div>
        ) : (
          <div className="w-2/3 min-w-fit py-2 px-4 flex flex-col gap-4 bg-gray-200 rounded-lg md:flex-row md:w-[340px]">
            <span>Asset sold to:</span>
            <span className="font-bold">{bidderName}</span>
          </div>
        )}
      </>
    );
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

  // Handle delete
  const onDelete = async () => {
    try {
      const response = await axios.delete(`/api/users/assets/${id}`);

      window.location.reload();
    } catch (error) {
      throw new Error("Failed to delete asset");
    }
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex flex-col gap-3 py-6 border-b-2 border-[#222E3F] border-opacity-40 md:flex-row md:items-center md:gap-7">
        <div className="w-1/6 min-w-fit">
          <Link
            href={`/auctions/${id}`}
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
            <Link href={`/auctions/${id}`}>
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
                Starting Price: {indonesianCurrency.format(startingPrice)}
              </p>
              {highestBid == 0 ? (
                <span className="text-xl font-bold">Current Bid: Rp. ---</span>
              ) : (
                <span className="text-xl font-bold">
                  Highest Bid: {indonesianCurrency.format(highestBid)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Link href={`/auctions/${id}`}>
              <button className="w-fit px-5 py-3 rounded-md text-white bg-[#203C59]">
                View Asset
              </button>
            </Link>
            {timeRemaining <= 0 ? (
              <button
                onClick={() => onDelete()}
                className="w-fit px-5 py-3 rounded-md bg-[#FF5959]"
              >
                Delete Asset
              </button>
            ) : (
              <Link href={`/profile/myAssets/edit/${id}`}>
                <button className="w-fit px-5 py-3 rounded-md bg-[#EAC066]">
                  Edit Asset
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
