import { useState } from "react";
import { useSession } from "next-auth/react";
import LogoBlue from "./logo/LogoBlue";
import IconAvatar from "./icons/IconAvatar";
import Link from "next/link";
import IconSearch from "./icons/IconSearch";

export default function Header() {
  const { data: session, status } = useSession();
  const [searchInput, setSearchInput] = useState("");

  const searchAuctionList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      console.log(searchInput);
    }
  };

  const handleLoginDisplay = () => {
    return status == "loading" ? (
      <div>...</div>
    ) : status == "unauthenticated" ? (
      <Link href={"/login"}>
        <button className="flex gap-2">
          <IconAvatar size={30} />
          <span>Login</span>
        </button>
      </Link>
    ) : (
      <button className="flex gap-2">
        <IconAvatar size={30} />
        <span>{session?.user?.name}</span>
      </button>
    );
  };

  return (
    <div className="w-full flex flex-col items-center px-6 py-6 bg-[#CFD4CB]">
      <header className="w-full max-w-7xl flex items-center justify-between gap-5">
        <Link href={"/"} className="flex gap-3 items-center">
          <LogoBlue size={55} />
          <span className="text-xl font-bold text-[#203C59]">MARKILANG</span>
        </Link>

        <div className="w-1/3 hidden md:flex md:relative">
          <div className="absolute right-1 top-[3px] p-[7px] rounded-full hover:bg-gray-200">
            <IconSearch size={25} />
          </div>
          <input
            type="text"
            name="auctionItem"
            placeholder="Search for..."
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => searchAuctionList(e)}
            className="w-full pl-5 pr-12 py-2 text-lg rounded-full"
          />
        </div>

        <div className="hidden gap-8 text-lg text-[#203C59] md:flex">
          <button>About</button>
          <button>Auctions</button>
          {handleLoginDisplay()}
        </div>
      </header>
    </div>
  );
}
