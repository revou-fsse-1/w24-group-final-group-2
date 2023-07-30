"use client";

import React from "react";
import { indonesianCurrency } from "@/utils/Currency";
import Image from "next/image";

type MyAssetCardProps = {
  imageUrl: string;
  assetName: string;
  endTime: string;
  startingPrice: number;
  currentPrice: number;
};

export default function MyAssetCard({
  imageUrl,
  assetName,
  endTime,
  startingPrice,
  currentPrice,
}: MyAssetCardProps) {
  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex flex-col gap-3 py-6 border-b-2 border-[#222E3F] border-opacity-40 md:flex-row md:items-center md:gap-7">
        <div className="w-48 h-48 flex items-center justify-center border">
          <Image
            src={imageUrl}
            width={300}
            height={300}
            alt={assetName + " image"}
          />
        </div>

        <div className="flex flex-col gap-5 justify-between md:gap-7">
          <span className="text-2xl font-bold text-[#203C59] md:text-3xl">
            {assetName}
          </span>
          <div className="flex flex-col gap-1">
            <p>End Date: {endTime}</p>
            <p className="font-bold">
              Starting Price: {indonesianCurrency.format(startingPrice)}
            </p>
          </div>
          <span className="text-xl font-bold">
            Current Bid: {indonesianCurrency.format(currentPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
