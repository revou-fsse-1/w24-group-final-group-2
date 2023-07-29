import IconFacebook from "./icons/IconFacebook";
import IconGoogle from "./icons/IconGoogle";
import IconTwitter from "./icons/IconTwitter";
import LogoYellow from "./logo/LogoYellow";

export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center px-6 py-6 bg-[#203C59]">
      <footer className="w-full max-w-7xl flex flex-col items-center justify-between gap-5 text-[#EAC066] md:flex-row">
        <div className="flex flex-col items-center gap-3">
          <LogoYellow size={120} />
          <span className="text-xl font-bold">MARKILANG</span>
        </div>
        <div className="w-2/3 flex items-center text-sm text-white md:w-1/3 md:text-base">
          <p className="line-clamp-5">
            Markilang - Your Collectibles Auction Hub. Discover unique
            treasures, from vintage toys to rare artifacts, all affordably
            priced. Join our passionate community of collectors, bid with
            confidence, and unearth your next cherished piece.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <p className="text-xl font-bold">Connect with Us</p>
          <div className="flex gap-6">
            <IconFacebook size={45} />
            <IconGoogle size={45} />
            <IconTwitter size={45} />
          </div>
        </div>
      </footer>
    </div>
  );
}
