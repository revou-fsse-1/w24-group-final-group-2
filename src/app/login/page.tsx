"use client";

import Image from "next/image";
import bacgkroundImg from "../../../public/assets/backgroundImg-auth.jpg";
import { signIn, useSession } from "next-auth/react";
import LogoYellow from "@/components/logo/LogoYellow";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status == "authenticated") {
    router.push("/");
  }

  return (
    <section className="min-h-screen flex bg-[#203D59]">
      <div className="flex flex-col justify-between p-8 sm:w-2/3 sm:p-12 lg:max-w-lg">
        <div className="flex flex-col gap-20">
          <div className="flex gap-5 items-center flex-wrap sm:flex-nowrap">
            <LogoYellow size={70} />
            <span className="text-3xl font-bold text-[#EAC066]">MARKILANG</span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-semibold text-[#EAC066] sm:text-5xl">
              Welcome
            </h2>
            <p className="text-white sm:text-lg">
              Rare and valuable collectibles awaits you
            </p>
          </div>

          {status == "loading" ? (
            <div className="flex flex-col items-center gap-5 text-center">
              <h2 className="text-lg text-white">Loading...</h2>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 text-center">
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full px-4 py-3 bg-gray-200 rounded-md"
              >
                Login with Google
              </button>

              <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-full px-4 py-3 bg-gray-200 rounded-md"
              >
                Login with Github
              </button>

              <p className="text-sm text-gray-500">
                By logging in, you have agreed to MARKILANG
                <strong> Privacy Policy</strong> and
                <strong> Terms of Service</strong>
              </p>
            </div>
          )}
        </div>

        <div className="justify-self-end text-gray-500">
          <span>© MARKILANG 2023</span>
        </div>
      </div>

      <div className="hidden items-center relative sm:flex sm:w-2/3 lg:w-full">
        <Image
          src={bacgkroundImg}
          alt="illustration one"
          className="h-full object-cover"
        />
        <div className="w-full h-full absolute bg-gradient-to-r from-[#203D59]"></div>
      </div>
    </section>
  );
}
