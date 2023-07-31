import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(transaction);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const json = await request.json();

  const update = await prisma.transaction.update({
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

  const updated = await prisma.transaction.update({
    where: {
      id: id,
    },
    data: json,
  });

  return NextResponse.json(updated);
}