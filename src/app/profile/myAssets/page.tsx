"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MyAssetCard from "@/components/profile/MyAssetCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

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
  const { data: session, status } = useSession();

  if (status == "unauthenticated") {
    redirect("/login");
  }

  // Fetching data
  const fetchData = (url: string) =>
    axios
      .get(url)
      .then((data) => {
        return data.data;
      })
      .catch((error) => {
        throw new Error("Failed fetching data");
      });
  const { data, isLoading } = useSWR("/api/users/assets", fetchData);

  if (!isLoading) {
    console.log(data);
  }

  const displayMyAssets = () => {
    return data.map((asset: any) => (
      <MyAssetCard
        key={asset.id}
        id={asset.id}
        imageUrl={asset.imageUrl}
        assetName={asset.name}
        endTime={asset.endTime}
        startingPrice={asset.openingPrice}
        currentPrice={!asset.bidAssets[0] ? 0 : asset.bidAssets[0].currentPrice}
      />
    ));
  };

  return (
    <div className="w-full max-w-7xl flex flex-col p-6">
      <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
        My Assets
      </h1>
      {!data ? (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        displayMyAssets()
      )}
      {/* {sampleData.map((data) => (
        <MyAssetCard
          key={data.id}
          id={data.id}
          imageUrl={data.imageUrl}
          assetName={data.assetName}
          endTime={data.endTime}
          startingPrice={data.startingPrice}
          currentPrice={data.currentPrice}
        />
      ))} */}
    </div>
  );
}
