"use client";

import MyBidCard from "@/components/profile/MyBidCard";

const sampleData = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/300",
    assetName: "Asset Name 1",
    endTime: new Date("August 1, 2023 12:03:00").toISOString(),
    bidAmount: 6800000,
    currentPrice: 6800000,
  },
];

export default function MyBids() {
  return (
    <div className="w-full max-w-7xl flex flex-col p-6">
      <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
        My Bids
      </h1>
      {sampleData.map((data) => (
        <MyBidCard
          key={data.id}
          id={data.id}
          imageUrl={data.imageUrl}
          assetName={data.assetName}
          endTime={data.endTime}
          bidAmount={data.bidAmount}
          currentPrice={data.currentPrice}
        />
      ))}
    </div>
  );
}
