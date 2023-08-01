import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { email: string } }) {
  const email = params.email;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: { params: { email: string } }) {
  const email = params.email;
  const json = await request.json();

  const update = await prisma.user.update({
    where: {
      email: email,
    },
    data: json,
  });
  return NextResponse.json(update);
}

export async function PATCH(request: Request, { params }: { params: { email: string } }) {
  const email = params.email;
  const json = await request.json();

  const updated = await prisma.user.update({
    where: {
      email: email,
    },
    data: json,
  });

  return NextResponse.json(updated);
}
