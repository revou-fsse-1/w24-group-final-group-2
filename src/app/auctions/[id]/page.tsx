"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import BidCard, { IBid } from "@/components/Auctions/BidCard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingSpinner from "@/components/LoadingSpinner";
import { indonesianCurrency } from "@/utils/Currency";

async function fetcher(url: string) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw new Error("error fetching data");
  }
}

export default function AuctionPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState<boolean>(false);
  const { data: session } = useSession();
  const params = useParams();
  const pathname = usePathname();

  const { data, error, isLoading } = useSWR(
    `/api/assets/${params.id}`,
    fetcher,
    { refreshInterval: 500 }
  );
  const assetData = data;
  const schema = yup.object({
    bidValue: yup.number(),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between">
        <Header />
        <main className="flex grow flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner />
            Loading Asset ...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const length =
    assetData.bidAssets.length === undefined
      ? 0
      : assetData.bidAssets.length - 1;
  const isSeller = assetData.sellerId === session?.user.id;
  const lastBid = assetData.bidAssets[length];
  const defaultBidInputValue =
    lastBid === undefined ? assetData.openingPrice : lastBid.bidAmount;

  async function doPost(bidSubmittedValue: number) {
    await axios.post(
      "/api/bids",
      {
        bidAmount: bidSubmittedValue,
        currentPrice: 0,
        assetId: params.id,
        userId: session?.user.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.replace(pathname);
  }

  async function onSubmit(data: any) {
    const bidAmountValue = data.bidValue;
    if (session) {
      if (lastBid.userId !== session?.user.id) {
        if (assetData.openingPrice < bidAmountValue) {
          if (lastBid.bidAmount < bidAmountValue) {
            doPost(bidAmountValue);
            setIsError(false);
          } else {
            setIsError(true);
            setErrorMessage("Bid must be higher than the current price");
            return;
          }
        } else {
          setIsError(true);
          setErrorMessage("Bid must be higher than opening price");
          return;
        }
      } else {
        setIsError(true);
        setErrorMessage("You are the highest bidder");
        return;
      }
    } else {
      setIsError(true);
      setErrorMessage("Please login first");
      return;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <Header />
      <main className="flex flex-col items-center justify-center w-full">
        <section className="container flex flex-col mx-5 mt-10 md:mx-0">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <img src={`${data.imageUrl}`} alt="asset image" />
            </div>

            <div className="flex flex-col w-full px-5 md:w-1/2">
              <div>
                <div className={`${isSeller ? "hidden" : ""} w-full`}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-full"
                  >
                    <div className="flex justify-between">
                      <input
                        {...register("bidValue")}
                        type="input"
                        placeholder="Please place your bid!"
                        defaultValue={defaultBidInputValue + 100000}
                        className="w-full pl-10 mr-2 text-lg bg-mkl-neutral rounded-xl min-h-[40px]"
                      />

                      <button
                        className="max-h-[60px] w-8/12  md:w-10/12 lg:w-7/12 btn-primary"
                        type="submit"
                      >
                        Place Bid!
                      </button>
                    </div>
                    <span className="mt-2 text-sm text-red-600">
                      {errorMessage}
                    </span>
                  </form>
                </div>
                <div className="mt-5" id="bid-list-container">
                  {!data.bidAssets ? (
                    <p>Be The First to bid!</p>
                  ) : (
                    data.bidAssets
                      .slice(-5)
                      .map((bid: IBid, index: number) => {
                        return (
                          <BidCard
                            key={index}
                            id={bid.id}
                            bidAmount={bid.bidAmount}
                            bidder={bid.bidder}
                            createdAt={bid.createdAt}
                          />
                        );
                      })
                      .reverse()
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 mt-10 md:px-20">
            <h2 className="h2">{data.name}</h2>
            <h3 className="mt-3 h3">
              {indonesianCurrency.format(data.openingPrice)}
            </h3>
            <p className="my-10 ">{data.description}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
