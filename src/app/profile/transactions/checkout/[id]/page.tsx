"use client";

import { indonesianCurrency } from "@/utils/Currency";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";
import IconWarning from "@/components/icons/IconWarning";

const deliveryCost = 500000;

export default function TransactionCheckout({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [displayCreditError, setDisplayCreditError] = useState(false);

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
  const { data, isLoading } = useSWR(`/api/users/bids/${params.id}`, fetchData);

  if (!isLoading) {
    console.log(data);
  }

  // Handles the display of payment button
  const displayPaymentButton = () => {
    const missingDeliveryDetails =
      !data.bidder.name || !data.bidder.address || !data.bidder.phoneNumber;

    return disableSubmit ? (
      <button
        disabled
        className="w-fit px-8 py-3 rounded-md bg-[#EAC066] opacity-40"
      >
        Confirm Payment
      </button>
    ) : missingDeliveryDetails ? (
      <>
        <div className="flex items-center gap-2 px-3 py-2 bg-red-200 rounded-lg border-l-8 border-red-800">
          <div className="min-h-fit">
            <IconWarning size={30} />
          </div>
          <span>
            Missing delivery details - Please fill in your delivery details on
            the Profile page
          </span>
        </div>
        <button
          disabled
          className="w-fit px-8 py-3 rounded-md bg-[#EAC066] opacity-40"
        >
          Confirm Payment
        </button>
      </>
    ) : (
      <div className="flex flex-col gap-2 items-end">
        <button
          onClick={() => handlePayment()}
          className="w-fit px-8 py-3 rounded-md bg-[#EAC066]"
        >
          Confirm Payment
        </button>
        {displayCreditError ? (
          <span className="text-red-500">Not enough credits</span>
        ) : (
          ""
        )}
      </div>
    );
  };

  // Handle submit
  const handlePayment = async () => {
    const totalPrice: number =
      data.bidAmount + data.bidAmount / 10 + deliveryCost;

    if (data.bidder.creditAmount < totalPrice) {
      setDisplayCreditError(true);
      return;
    }

    setDisableSubmit(true);
    setDisplayCreditError(false);

    try {
      const response = await axios.post("/api/users/transactions", {
        assetId: data.asset.id,
        bidderId: data.id,
        price: totalPrice,
        statusPaid: "paid",
      });

      console.log(response);
      console.log("Payment Successful");
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create transaction");
    }
  };

  return (
    <div className="w-full max-w-7xl flex flex-col gap-12 p-6">
      <div className="w-full flex flex-col gap-5 text-md md:text-lg">
        <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
          Checkout
        </h1>

        <div className="w-full flex flex-col gap-5 md:flex-row">
          <div className="w-full flex flex-col gap-6 pr-6 pb-6 border-b-2 md:w-1/2 md:pb-0 md:border-b-0 md:border-r-2">
            <div className="flex flex-col gap-1">
              <h2>Asset Name:</h2>
              {!data ? (
                <p className="font-bold opacity-40">...</p>
              ) : (
                <p className="font-bold">{data.asset.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h2>Received By:</h2>
              {!data || !data.bidder.name ? (
                <p className="font-bold opacity-40">...</p>
              ) : (
                <p className="font-bold">{data.bidder.name}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h2>Deliver To:</h2>
              {!data || !data.bidder.address ? (
                <p className="font-bold opacity-40">...</p>
              ) : (
                <p className="font-bold">{data.bidder.address}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h2>Phone Number:</h2>
              {!data || !data.bidder.phoneNumber ? (
                <p className="font-bold opacity-40">...</p>
              ) : (
                <p className="font-bold">{data.bidder.phoneNumber}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col justify-between gap-3 md:w-1/2">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Final Bid Price:</h2>
                {!data ? (
                  <p className="font-bold opacity-40">...</p>
                ) : (
                  <p className="font-bold">
                    {indonesianCurrency.format(data.bidAmount)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Service Charge (10%):</h2>
                {!data ? (
                  <p className="font-bold opacity-40">...</p>
                ) : (
                  <p className="font-bold">
                    {indonesianCurrency.format(data.bidAmount / 10)}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Delivery Cost:</h2>
                {!data ? (
                  <p className="font-bold opacity-40">...</p>
                ) : (
                  <p className="font-bold">
                    {indonesianCurrency.format(deliveryCost)}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Total Cost:</h2>
                {!data ? (
                  <p className="text-2xl font-bold opacity-40">...</p>
                ) : (
                  <p className="text-2xl font-bold">
                    {indonesianCurrency.format(
                      data.bidAmount + data.bidAmount / 10 + deliveryCost
                    )}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col-reverse justify-between gap-6 md:flex-row">
        <Link href={"/profile/myBids"}>
          <button className="w-fit px-8 py-3 rounded-md text-white bg-[#203C59]">
            Cancel
          </button>
        </Link>

        {!data ? (
          <div className="w-fit p-3">
            <LoadingSpinner />
          </div>
        ) : (
          displayPaymentButton()
        )}
      </div>
    </div>
  );
}
