import { indonesianCurrency } from "@/utils/Currency";

interface IBidder {
  name: string;
}
export interface IBid {
  id: string;
  bidAmount: number;
  createdAt: Date;
  bidder: IBidder;
}

export default function BidCard({ bidAmount, bidder, createdAt }: IBid) {
  function getDate(date: Date) {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function getTime(time: Date) {
    const newTime = new Date(time);
    return newTime.toLocaleString("en-GB", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  }

  const date = getDate(createdAt);
  const time = getTime(createdAt);

  return (
    <div className="flex flex-col items-center justify-between gap-3 w-full px-4 py-2 bid-card bg-mkl-accent text-mkl-secondary rounded-xl sm:flex-row">
      <p>{bidder.name}</p>

      <div className="flex flex-col items-center text-center">
        <small>{date}</small>
        <p>{time}</p>
      </div>

      <p className="font-bold">{indonesianCurrency.format(bidAmount)}</p>
    </div>
  );
}
