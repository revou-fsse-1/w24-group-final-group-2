import { prisma } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET() {
  const bid = await prisma.bidAsset.findMany();
  console.log(bid);
  return new Response(JSON.stringify(bid));
}

export async function POST(request: Request) {
  const json = await request.json();
  const post = await prisma.bidAsset.create({
    data: json,
  })
  return NextResponse.json(post);
}

