"use client";

import { indonesianCurrency } from "@/utils/Currency";
import Image from "next/image";

type TransactionCardProps = {
  imageUrl: string;
  assetName: string;
  bidAmount: number;
  totalPrice: number;
};

export default function TransactionCard({
  imageUrl,
  assetName,
  bidAmount,
  totalPrice,
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
            <div>
              <span className="text-2xl font-bold text-[#203C59] md:text-3xl">
                {assetName}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="font-bold">
                Final Bid Price: {indonesianCurrency.format(bidAmount)}
              </p>
              <span className="text-xl font-bold">
                Total Paid Price: {indonesianCurrency.format(totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
