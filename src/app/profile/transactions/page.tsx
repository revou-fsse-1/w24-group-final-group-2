"use client";

import TransactionCard from "@/components/profile/TransactionCard";

const sampleData = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/300",
    assetName: "Asset Name 1",
    currentPrice: 6800000, // final bid price di auction
  },
];

export default function Transactions() {
  return (
    <div className="w-full max-w-7xl flex flex-col p-6">
      <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
        Transactions
      </h1>
      {sampleData.map((data) => (
        <TransactionCard
          key={data.id}
          imageUrl={data.imageUrl}
          assetName={data.assetName}
          currentPrice={data.currentPrice}
        />
      ))}
    </div>
  );
}
