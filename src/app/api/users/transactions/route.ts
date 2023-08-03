import { prisma } from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  const currentUser = await prisma.user.findFirst({
    where: {
      email: session?.user?.email?.toString(),
    },
    select: {
      id: true,
    },
  });

  const transactionList = await prisma.transaction.findMany({
    where: {
      bidder: {
        userId: currentUser?.id,
      },
    },
    select: {
      assets: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
      bidder: {
        select: {
          bidAmount: true,
        },
      },
      price: true,
      id: true,
    },
  });

  return NextResponse.json(transactionList);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const json = await request.json();

  const updateUserCredits = await prisma.user.update({
    where: {
      email: session?.user?.email?.toString(),
    },
    data: {
      creditAmount: {
        decrement: json.price,
      },
    },
  });

  const createTransaction = await prisma.transaction.create({
    data: { ...json },
  });

  return NextResponse.json(createTransaction);
}
