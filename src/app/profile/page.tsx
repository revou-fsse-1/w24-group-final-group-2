"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IconWarning from "@/components/icons/IconWarning";

export default function Profile() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object({
    username: yup.string().required("username required"),
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
  } = useForm({ resolver: yupResolver(schema), mode: "onTouched" });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <Header />

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
            <span className="font-bold">exampleEmail@google.com</span>
          </div>

          <div className="flex flex-col gap-1 md:w-3/4">
            <label htmlFor="username">Username</label>
            <input
              {...register("username")}
              className="px-3 py-2 border border-black rounded-md"
            />
            <span className="text-sm text-rose-500">
              {errors.username?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1 md:w-3/4">
            <label htmlFor="creditAmount">Credit Amount</label>
            <input
              type="number"
              defaultValue={0}
              {...register("creditAmount")}
              className="px-3 py-2 border border-black rounded-md"
            />
            <span className="text-sm text-rose-500">
              {errors.creditAmount?.message}
            </span>
          </div>

          <hr className="h-[2px] my-4 border-0 bg-[#222E3F] bg-opacity-40" />

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
            <input
              {...register("name")}
              className="px-3 py-2 border border-black rounded-md"
            />
            <span className="text-sm text-rose-500">
              {errors.name?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1 md:w-3/4">
            <label htmlFor="address">Address</label>
            <textarea
              rows={5}
              {...register("address")}
              className="resize-none px-3 py-2 border border-black rounded-md"
            />
            <span className="text-sm text-rose-500">
              {errors.address?.message}
            </span>
          </div>

          <div className="flex flex-col gap-1 md:w-3/4">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              {...register("phoneNumber")}
              className="px-3 py-2 border border-black rounded-md"
            />
            <span className="text-sm text-rose-500">
              {errors.phoneNumber?.message}
            </span>
          </div>

          <button
            type="submit"
            className="w-fit px-8 py-3 rounded-md bg-[#EAC066]"
          >
            Update Profile
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
