import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const json = await request.json();

  const update = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: json.username,
    },
  });
  return NextResponse.json(update);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const json = await request.json();

  const updated = await prisma.user.update({
    where: {
      id: id,
    },
    data: json,
  });

  return NextResponse.json(updated);
}
