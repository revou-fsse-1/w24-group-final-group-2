import { prisma } from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  // BAKAL DIPAKAI
  // const transactionList = await prisma.user.findFirst({
  //   where: {
  //     email: session?.user?.email?.toString(),
  //   },
  //   select: {
  //     assets: true,
  //   },
  // });

  // TESTING ONLY
  const transactionList = await prisma.transaction.findMany({
    select: {
      assets: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
      bidder: {
        select: {
          currentPrice: true,
        },
      },
      price: true,
      id: true,
    },
  });

  return NextResponse.json(transactionList);
}
