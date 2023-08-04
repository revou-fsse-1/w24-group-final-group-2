"use client";

import TransactionCard from "@/components/profile/TransactionCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

export default function Transactions() {
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
  const { data, isLoading } = useSWR("/api/users/transactions", fetchData);

  const displayMyTransactions = () => {
    if (data.length == 0) {
      return (
        <div className="w-full flex flex-col gap-7">
          <div className="flex flex-col items-center gap-5 p-6 bg-gray-100">
            <span className="text-2xl font-bold">
              {"No transactions to be found"}
            </span>
            <span>
              Transactions will appear here after successful payment of assets
            </span>
          </div>
        </div>
      );
    } else {
      return data.map((transaction: any) => (
        <TransactionCard
          key={transaction.id}
          imageUrl={transaction.assets.imageUrl}
          assetName={transaction.assets.name}
          bidAmount={transaction.bidder.bidAmount}
          totalPrice={transaction.price}
        />
      ));
    }
  };

  return (
    <div className="w-full max-w-7xl flex flex-col p-6">
      <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
        Transactions
      </h1>
      {!data ? (
        <div className="w-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        displayMyTransactions()
      )}
    </div>
  );
}
