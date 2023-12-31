import { prisma } from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  const assetList = await prisma.user.findFirst({
    where: {
      email: session?.user?.email?.toString(),
    },
    select: {
      assets: {
        where: {
          deletedAt: {
            equals: null,
          },
        },
        select: {
          id: true,
          openingPrice: true,
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
                  name: true,
                },
              },
            },
            take: 1,
          },
        },
      },
    },
  });

  return NextResponse.json(assetList?.assets);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const json = await request.json();

  const currentUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email?.toString(),
    },
    select: {
      id: true,
    },
  });

  const createAsset = await prisma.asset.create({
    data: {
      ...json,
      sellerId: currentUser?.id,
    },
  });

  return NextResponse.json(createAsset);
}
