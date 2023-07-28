import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const bid = await prisma.bidAsset.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(bid);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const json = await request.json();

  const update = await prisma.bidAsset.update({
    where: {
      id: id,
    },
    data: json
  });
  return NextResponse.json(update);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.bidAsset.update({
    where: {
      id: id,
    },
    data: json,
  });

  return NextResponse.json(updated);
}