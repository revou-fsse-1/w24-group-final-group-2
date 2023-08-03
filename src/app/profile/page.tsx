"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconWarning from "@/components/icons/IconWarning";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import { indonesianCurrency } from "@/utils/Currency";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Profile() {
  const { data: session, status } = useSession();
  const [disableSubmit, setDisableSubmit] = useState(false);

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
        throw new Error("Failed fetching user data");
      });
  const { data, isLoading } = useSWR(
    `/api/users/${session?.user?.email}`,
    fetchData
  );

  // Phone number regex
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // Yup & react hook form setup
  const schema = yup.object({
    creditAmount: yup
      .number()
      .min(0, "Invalid credit amount")
      .integer("Invalid credit amount"),
    name: yup.string().required("Full name required"),
    address: yup.string().required("Address required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Invalid phone number")
      .required("Phone number required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      creditAmount: !data ? 0 : data.creditAmount,
      name: !data ? "" : data.name,
      address: !data ? "" : data.address,
      phoneNumber: !data ? "" : data.phoneNumber,
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // Handle submit
  const onSubmit = async (formData: any) => {
    try {
      setDisableSubmit(true);
      const response = await axios.patch(
        `/api/users/${session?.user?.email}`,
        formData
      );

      window.location.reload();
    } catch (error) {
      setDisableSubmit(false);
      throw new Error("Failed to update profile");
    }
  };

  return (
    <div className="w-full max-w-7xl flex p-6 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-5 text-lg md:text-xl md:w-1/2"
      >
        <h1 className="text-4xl font-bold py-4 text-[#203C59] md:text-5xl">
          My Profile
        </h1>

        <div className="flex flex-col gap-1 md:w-3/4">
          <label htmlFor="email">Email</label>
          <span className="font-bold">{!data ? "..." : data.email}</span>
        </div>

        <div className="flex flex-col gap-1 md:w-3/4">
          <label htmlFor="creditAmount">Credit Amount</label>
          <span className="font-bold">
            {!data ? "Rp. ..." : indonesianCurrency.format(data.creditAmount)}
          </span>

          {!data ? (
            <input
              type="number"
              disabled
              className="px-3 py-2 border rounded-md"
            />
          ) : (
            <input
              type="number"
              {...register("creditAmount")}
              className="px-3 py-2 border border-black rounded-md"
            />
          )}
          <span className="text-sm text-rose-500">
            {errors.creditAmount?.message?.toString()}
          </span>
        </div>

        <hr className="h-[2px] my-4 border-0 bg-[#222E3F] bg-opacity-40" />

        <h2 className="text-2xl font-bold text-[#203C59] md:text-3xl">
          Delivery Details
        </h2>

        <div className="flex items-center gap-3 px-4 py-2 text-sm rounded-md bg-[#EAC066] bg-opacity-50 md:w-3/4">
          <div className="w-fit">
            <IconWarning size={30} />
          </div>
          <p>
            Please fill in the information below to receive delivery of your
            assets
          </p>
        </div>

        <div className="flex flex-col gap-1 md:w-3/4">
          <label htmlFor="name">Full Name</label>
          {!data ? (
            <input disabled className="px-3 py-2 border rounded-md" />
          ) : (
            <input
              {...register("name")}
              className="px-3 py-2 border border-black rounded-md"
            />
          )}
          <span className="text-sm text-rose-500">
            {errors.name?.message?.toString()}
          </span>
        </div>

        <div className="flex flex-col gap-1 md:w-3/4">
          <label htmlFor="address">Address</label>
          {!data ? (
            <textarea
              rows={5}
              disabled
              className="resize-none px-3 py-2 border rounded-md"
            />
          ) : (
            <textarea
              rows={5}
              {...register("address")}
              className="resize-none px-3 py-2 border border-black rounded-md"
            />
          )}
          <span className="text-sm text-rose-500">
            {errors.address?.message?.toString()}
          </span>
        </div>

        <div className="flex flex-col gap-1 md:w-3/4">
          <label htmlFor="phoneNumber">Phone Number</label>
          {!data ? (
            <input disabled className="px-3 py-2 border rounded-md" />
          ) : (
            <input
              {...register("phoneNumber")}
              className="px-3 py-2 border border-black rounded-md"
            />
          )}
          <span className="text-sm text-rose-500">
            {errors.phoneNumber?.message?.toString()}
          </span>
        </div>

        {!data || disableSubmit ? (
          <button
            disabled
            className="w-fit px-8 py-3 rounded-md bg-[#EAC066] bg-opacity-70"
          >
            <LoadingSpinner />
          </button>
        ) : (
          <button
            type="submit"
            className="w-fit px-8 py-3 rounded-md bg-[#EAC066]"
          >
            Update Profile
          </button>
        )}
      </form>
    </div>
  );
}
