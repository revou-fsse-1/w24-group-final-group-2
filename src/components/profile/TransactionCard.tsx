"use client";

import React from "react";
import { indonesianCurrency } from "@/utils/Currency";
import Image from "next/image";

type TransactionCardProps = {
  imageUrl: string;
  assetName: string;
  currentPrice: number;
};

export default function TransactionCard({
  imageUrl,
  assetName,
  currentPrice,
}: TransactionCardProps) {
  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex flex-col gap-3 py-6 border-b-2 border-[#222E3F] border-opacity-40 md:flex-row md:items-center md:gap-7">
        <div className="w-1/6 min-w-fit">
          <div className="w-48 h-48 flex items-center justify-center border">
            <Image
              src={imageUrl}
              width={300}
              height={300}
              alt={assetName + " image"}
            />
          </div>
        </div>

        <div className="w-5/6 flex flex-col gap-5 justify-between md:flex-row">
          <div className="flex flex-col gap-5 justify-between md:gap-7">
            <span className="text-2xl font-bold text-[#203C59] md:text-3xl">
              {assetName}
            </span>

            <span className="text-xl font-bold">
              Final Bid Price: {indonesianCurrency.format(currentPrice)}
            </span>
          </div>

          <div>
            <button className="w-fit px-5 py-3 rounded-md bg-[#EAC066]">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
