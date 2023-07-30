"use client";

import { indonesianCurrency } from "@/utils/Currency";
import Link from "next/link";

export default function TransactionCheckout({
  params,
}: {
  params: { id: string };
}) {
  const exampleData = {
    assetName: "Asset Name 1",
    userFullName: "John Doe",
    address:
      "Jl. LPK Pemuda I, RT.002/RW.012, Buaran Indah, Kec. Tangerang, Kota Tangerang, Banten 15118",
    phoneNumber: "082112345678",
    currentPrice: 6800000,
  };

  const finalBidPrice = exampleData.currentPrice;
  const serviceCharge = finalBidPrice / 10;
  const deliveryCost = 500000;
  const totalCost = finalBidPrice + serviceCharge + deliveryCost;

  const handlePayment = () => {
    console.log("Payment Successful");
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
              <p className="font-bold">{exampleData.assetName}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h2>Received By:</h2>
              <p className="font-bold">{exampleData.userFullName}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h2>Deliver To:</h2>
              <p className="font-bold">{exampleData.address}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h2>Phone Number:</h2>
              <p className="font-bold">{exampleData.phoneNumber}</p>
            </div>
          </div>

          <div className="w-full flex flex-col justify-between gap-3 md:w-1/2">
            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Final Bid Price:</h2>
                <p className="font-bold">
                  {indonesianCurrency.format(finalBidPrice)}
                </p>
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Service Charge (10%):</h2>
                <p className="font-bold">
                  {indonesianCurrency.format(serviceCharge)}
                </p>
              </div>
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Delivery Cost:</h2>
                <p className="font-bold">
                  {indonesianCurrency.format(deliveryCost)}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="flex flex-col gap-1 md:flex-row md:justify-between">
                <h2>Total Cost:</h2>
                <p className="text-2xl font-bold">
                  {indonesianCurrency.format(totalCost)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col-reverse justify-between gap-6 md:flex-row">
        <Link href={"/profile/transactions"}>
          <button className="w-fit px-8 py-3 rounded-md text-white bg-[#203C59]">
            Cancel
          </button>
        </Link>

        <button
          onClick={() => handlePayment()}
          className="w-fit px-8 py-3 rounded-md bg-[#EAC066]"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
