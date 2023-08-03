import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const id = params.id;

  // Get user bid by id
  const bidList = await prisma.bidAsset.findFirst({
    where: {
      bidder: {
        email: session?.user?.email?.toString(),
      },
      id: id,
    },
    select: {
      id: true,
      bidAmount: true,
      asset: {
        select: {
          id: true,
          name: true,
        },
      },
      bidder: {
        select: {
          name: true,
          address: true,
          phoneNumber: true,
          creditAmount: true,
        },
      },
    },
  });

  return NextResponse.json(bidList);
}
