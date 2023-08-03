import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  const userBidList = await prisma.user.findFirst({
    where: {
      email: session?.user?.email?.toString(),
    },
    select: {
      bidAssets: {
        select: {
          id: true,
          bidAmount: true,
          transaction: true,
          asset: {
            select: {
              id: true,
              imageUrl: true,
              name: true,
              endTime: true,
              bidAssets: {
                orderBy: {
                  bidAmount: "desc",
                },
                select: {
                  bidAmount: true,
                  bidder: {
                    select: {
                      email: true,
                    },
                  },
                },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(userBidList?.bidAssets);
}
