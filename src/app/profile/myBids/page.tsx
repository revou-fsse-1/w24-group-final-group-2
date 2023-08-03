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

  if (!isLoading) {
    console.log(data);
  }

  const displayMyBids = () => {
    if (data.length == 0) {
      return (
        <div className="w-full flex flex-col gap-7">
          <div className="flex flex-col items-center gap-5 p-6 bg-gray-100">
            <span className="text-2xl font-bold">
              {"You haven't made any bids"}
            </span>
            <span>Start bidding by searching through the auctions</span>
          </div>
        </div>
      );
    } else {
      return data.map((bids: any) => (
        <MyBidCard
          key={bids.id}
          bidId={bids.id}
          assetId={bids.asset.id}
          imageUrl={bids.asset.imageUrl}
          assetName={bids.asset.name}
          endTime={bids.asset.endTime}
          bidAmount={bids.bidAmount}
          highestBid={bids.asset.bidAssets[0].bidAmount}
          bidderEmail={bids.asset.bidAssets[0].bidder.email}
          myEmail={session?.user.email.toString()}
          hasTransaction={!bids.transaction ? false : true}
        />
      ));
    }
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
