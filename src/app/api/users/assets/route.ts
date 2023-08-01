import { prisma } from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  // BAKAL DIPAKAI
  // const assetList = await prisma.user.findFirst({
  //   where: {
  //     email: session?.user?.email?.toString(),
  //   },
  //   select: {
  //     assets: true,
  //   },
  // });

  // TESTING ONLY
  const assetList = await prisma.asset.findMany({
    select: {
      id: true,
      openingPrice: true,
      imageUrl: true,
      name: true,
      endTime: true,
      bidAssets: {
        orderBy: {
          currentPrice: "desc",
        },
        select: {
          currentPrice: true,
        },
        take: 1,
      },
    },
  });
  return NextResponse.json(assetList);
}
