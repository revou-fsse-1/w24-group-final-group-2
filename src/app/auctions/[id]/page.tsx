"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import BidCard, { IBid } from "@/components/Auctions/BidCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LoadingSpinner from "@/components/LoadingSpinner";
import { indonesianCurrency } from "@/utils/Currency";
import { useState } from "react";

export default function AuctionPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const pathname = usePathname();
  const [disableSubmit, setDisableSubmit] = useState(false);

  async function fetcher(url: string) {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      throw new Error("error fetching data");
    }
  }

  const { data, error, isLoading } = useSWR(
    `/api/assets/${params.id}`,
    fetcher,
    { refreshInterval: 500 }
  );

  const schema = yup.object({
    bidValue: yup
      .number()
      .min(
        !data
          ? 0
          : data.bidAssets.length == 0
          ? data.openingPrice + 1
          : data.bidAssets[data.bidAssets.length - 1].bidAmount + 1,
        "Bid must be higher than current price or bid"
      )
      .test({
        name: "is-authenticated",
        test: () => status == "authenticated",
        message: "You must be logged in to bid",
      }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      bidValue: !data
        ? 0
        : data.bidAssets.length == 0
        ? data.openingPrice + 100000
        : data.bidAssets[data.bidAssets.length - 1].bidAmount + 100000,
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

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

  async function onSubmit(data: any) {
    try {
      setDisableSubmit(true);
      const response = await axios.post(
        "/api/bids",
        {
          bidAmount: data.bidValue,
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
    } catch (error) {
      setDisableSubmit(false);
      throw new Error("Failed to place bid");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <Header />
      <main className="w-full max-w-7xl p-6 mt-8 flex flex-col items-center justify-center">
        <section className="w-full max-w-7xl flex flex-col gap-10">
          <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
            <div className="w-full max-w-sm md:w-1/3">
              <img
                src={`${data.imageUrl}`}
                alt="asset image"
                className="w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-2/3">
              {data.sellerId === session?.user.id ? (
                ""
              ) : (
                <div className="w-full">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col w-full"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row">
                      <input
                        {...register("bidValue")}
                        type="input"
                        placeholder="Please place your bid!"
                        className="w-full p-3 text-lg bg-mkl-neutral bg-opacity-30 rounded-xl border-2 border-gray-500 sm:w-2/3"
                      />

                      {disableSubmit ? (
                        <button
                          className="w-full btn-primary sm:w-1/3 opacity-40"
                          disabled
                        >
                          Place Bid
                        </button>
                      ) : (
                        <button
                          className="w-full btn-primary sm:w-1/3 hover:btn-secondary"
                          type="submit"
                        >
                          Place Bid
                        </button>
                      )}
                    </div>
                    <span className="mt-2 text-sm text-red-600">
                      {errors.bidValue?.message?.toString()}
                    </span>
                  </form>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <span className="w-1/3 min-w-[120px] text-lg font-bold border-b-2 border-[#203C59] px-3 py-2">
                  Bid List
                </span>
                {data.bidAssets.length == 0 ? (
                  <div className="w-full flex flex-col gap-7">
                    <div className="flex flex-col items-center gap-5 p-6 bg-gray-100">
                      <span className="text-2xl font-bold">
                        There&apos;s no bid to be seen...
                      </span>
                      <span>Be the first person to bid now!</span>
                    </div>
                  </div>
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

          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-bold text-[#203C59] md:text-4xl">
              {data.name}
            </h2>
            <div className="flex flex-col gap-3 py-4 border-t-2">
              <span className="w-1/3 min-w-[220px] border-l-8 border-[#203C59] px-3 py-2 rounded-lg bg-gray-200">
                Opening Price:
              </span>
              <h3 className="text-3xl md:text-4xl">
                {indonesianCurrency.format(data.openingPrice)}
              </h3>
            </div>
            <div className="flex flex-col gap-3 py-4 border-t-2">
              <span className="w-1/3 min-w-[220px] border-l-8 border-[#203C59] px-3 py-2 rounded-lg bg-gray-200">
                Description:
              </span>
              <p className="md:text-lg">{data.description}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
