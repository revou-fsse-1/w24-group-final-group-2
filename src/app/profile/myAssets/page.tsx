"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MyAssetCard from "@/components/profile/MyAssetCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

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
    </div>
  );
}
