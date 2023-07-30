"use client";

import MyAssetCard from "@/components/profile/MyAssetCard";

const sampleData = [
  {
    id: "1",
    imageUrl: "https://picsum.photos/300",
    assetName: "Asset Name 1",
    endTime: new Date().toLocaleString(),
    startingPrice: 1380000,
    currentPrice: 3500000,
  },
  {
    id: "2",
    imageUrl: "https://picsum.photos/300",
    assetName: "Asset Name 2",
    endTime: new Date().toLocaleString(),
    startingPrice: 1380000,
    currentPrice: 3500000,
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
