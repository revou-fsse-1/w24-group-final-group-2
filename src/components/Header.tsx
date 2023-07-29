import { useState } from "react";
import LogoBlue from "./logo/LogoBlue";
import IconAvatar from "./icons/IconAvatar";
import IconHamburger from "./icons/IconHamburger";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");

  const searchAuctionList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      console.log(searchInput);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-6 py-6 bg-[#CFD4CB]">
      <header className="w-full max-w-7xl flex items-center justify-between gap-5">
        <div className="flex gap-3 items-center">
          <LogoBlue size={55} />
          <span className="text-xl font-bold text-[#203C59]">MARKILANG</span>
        </div>

        <div className="w-1/3 hidden md:flex">
          <input
            type="text"
            name="auctionItem"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => searchAuctionList(e)}
            className="w-full px-5 py-2 text-lg rounded-full"
          />
        </div>

        <div className="hidden gap-8 text-lg text-[#203C59] md:flex">
          <button>About</button>
          <button>Auctions</button>
          <div className="flex gap-2">
            <IconAvatar size={30} />
            <button>Login</button>
          </div>
        </div>

        <div className="flex items-center md:hidden">
          <IconHamburger size={30} />
        </div>
      </header>
    </div>
  );
}
