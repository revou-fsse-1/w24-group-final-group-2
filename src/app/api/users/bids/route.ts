import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Get user bids list - BAKAL DIPAKAI
  const bidList = await prisma.user.findFirst({
    where: {
      email: session?.user?.email?.toString(),
    },
    select: {
      bidAssets: {
        select: {
          id: true,
          bidAmount: true,
          currentPrice: true,
          asset: {
            select: {
              id: true,
              imageUrl: true,
              name: true,
              endTime: true,
            },
          },
        },
      },
    },
  });

  // TESTING ONLY
  // const bidList = await prisma.bidAsset.findMany({
  //   select: {
  //     id: true,
  //     bidAmount: true,
  //     currentPrice: true,
  //     asset: {
  //       select: {
  //         id: true,
  //         imageUrl: true,
  //         name: true,
  //         endTime: true,
  //       },
  //     },
  //     bidder: {
  //       select: {
  //         name: true,
  //       },
  //     },
  //   },
  // });
  return NextResponse.json(bidList?.bidAssets);
}
