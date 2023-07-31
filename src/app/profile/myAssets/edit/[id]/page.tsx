"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { indonesianCurrency } from "@/utils/Currency";

export default function EditAsset({ params }: { params: { id: string } }) {
  const currentDate = new Date().toISOString();
  const exampleCurrency = 500000;

  const schema = yup.object({
    description: yup.string().required("Description required"),
    endTime: yup
      .date()
      .min(currentDate, "Invalid date (date is older than current date/time)")
      .required("End time required")
      .typeError("Invalid date"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  const onSubmit = (data: any) => {
    const formatDate = new Date(data.endTime).toISOString();
    console.log({
      ...data,
      endTime: formatDate,
    });
  };

  const onDelete = () => {
    console.log("Delete Asset");
  };

  return (
    <div className="w-full max-w-7xl flex p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 text-lg md:text-xl"
      >
        <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
          Edit Asset
        </h1>

        <div className="w-full flex flex-col-reverse gap-5 md:flex-row">
          <div className="w-full flex flex-col gap-5 md:w-1/2">
            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="name">Asset Name</label>
              <p className="font-bold">Asset Name 1</p>
            </div>

            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="description">Description</label>
              <textarea
                rows={5}
                {...register("description")}
                className="resize-none px-3 py-2 border border-black rounded-md"
              />
              <span className="text-sm text-rose-500">
                {errors.description?.message}
              </span>
            </div>

            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="openingPrice">Starting Price</label>
              <p className="font-bold">
                {indonesianCurrency.format(exampleCurrency)}
              </p>
            </div>

            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="endTime">Auction End Date</label>
              <input
                type="datetime-local"
                {...register("endTime")}
                className="px-3 py-2 border border-black rounded-md"
              />
              <span className="text-sm text-rose-500">
                {errors.endTime?.message}
              </span>
            </div>

            <button
              type="submit"
              className="w-fit px-8 py-3 rounded-md bg-[#EAC066]"
            >
              Register Asset
            </button>

            <button
              type="button"
              onClick={() => onDelete()}
              className="w-fit px-8 py-3 mt-10 rounded-md bg-[#FF5959]"
            >
              Delete Asset
            </button>
          </div>

          <div className="w-full flex flex-col gap-5 md:w-1/2">
            <div className="w-48 h-48 flex items-center justify-center border">
              Image
            </div>

            <div className="flex flex-col gap-1 md:w-3/4">
              <label htmlFor="imageUrl">Image Url</label>
              <p className="font-bold">https://exampleUrl.com/1</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
