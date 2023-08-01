import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const id = params.id;

  // Get user bidding list - BAKAL DIPAKAI
  // const bidList = await prisma.user.findFirst({
  //   where: {
  //     email: session?.user?.email?.toString(),
  //   },
  //   select: {
  //     bidAssets: true,
  //   },
  // });

  // TESTING ONLY
  const bidList = await prisma.bidAsset.findFirst({
    where: {
      id: id,
    },
    select: {
      currentPrice: true,
      asset: {
        select: {
          name: true,
        },
      },
    },
  });
  return NextResponse.json(bidList);
}
