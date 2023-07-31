"use client";

import MyAssetCard from "@/components/profile/MyAssetCard";

const sampleData = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/300",
    assetName: "Asset Name 1",
    endTime: new Date("August 1, 2023 17:03:00").toISOString(),
    startingPrice: 1380000,
    currentPrice: 3600000,
  },
  {
    id: "2",
    imageUrl: "https://picsum.photos/400",
    assetName: "Asset Name 2",
    endTime: new Date("August 1, 2023 14:03:00").toISOString(),
    startingPrice: 1250000,
    currentPrice: 4220000,
  },
];

export default function MyAssets() {
  return (
    <div className="w-full max-w-7xl flex flex-col p-6">
      <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
        My Assets
      </h1>
      {sampleData.map((data) => (
        <MyAssetCard
          key={data.id}
          id={data.id}
          imageUrl={data.imageUrl}
          assetName={data.assetName}
          endTime={data.endTime}
          startingPrice={data.startingPrice}
          currentPrice={data.currentPrice}
        />
      ))}
    </div>
  );
}
