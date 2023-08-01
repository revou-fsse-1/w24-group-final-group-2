import { prisma } from "@/libs/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const session = await getServerSession(authOptions);

  // BAKAL DIPAKAI
  // const asset = await prisma.user.findFirst({
  //   where: {
  //     email: session?.user?.email?.toString(),
  //   },
  //   select: {
  //     assets: true,
  //   },
  // });

  // TESTING ONLY
  const asset = await prisma.asset.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      openingPrice: true,
      endTime: true,
      imageUrl: true,
    },
  });
  return NextResponse.json(asset);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const json = await request.json();

  const updateAsset = await prisma.asset.update({
    where: {
      id: id,
    },
    data: json,
  });

  return NextResponse.json(updateAsset);
}

export async function DELETE({ params }: { params: { id: string } }) {
  const id = params.id;

  const deleteAsset = await prisma.asset.update({
    where: {
      id: id,
    },
    data: {
      deletedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json(deleteAsset);
}
