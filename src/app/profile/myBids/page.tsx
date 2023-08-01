"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import MyBidCard from "@/components/profile/MyBidCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

export default function MyBids() {
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
  const { data, isLoading } = useSWR("/api/users/bids/", fetchData);

  const displayMyBids = () => {
    return data.map((bids: any) => (
      <MyBidCard
        key={bids.id}
        id={bids.asset.id}
        imageUrl={bids.asset.imageUrl}
        assetName={bids.asset.name}
        endTime={bids.asset.endTime}
        bidAmount={bids.bidAmount}
        currentPrice={bids.currentPrice}
      />
    ));
  };

  return (
    <div className="w-full max-w-7xl flex flex-col p-6">
      <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
        My Bids
      </h1>
      {!data ? (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        displayMyBids()
      )}
    </div>
  );
}
