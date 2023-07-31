import { prisma } from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET() {
	const asset = await prisma.asset.findMany();
	console.log(asset);
	return new Response(JSON.stringify(asset));
}

export async function POST(request: Request) {
	const json = await request.json();
	const post = await prisma.asset.create({
		data: json,
	});
	return NextResponse.json(post);
}
