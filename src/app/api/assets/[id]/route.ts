import { prisma } from '@/libs/db';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	const asset = await prisma.asset.findUnique({
		where: {
			id: id,
		},
		include: {
			bidAssets: { include: { bidder: true } },
		},
	});
	return NextResponse.json(asset);
}

export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	const json = await request.json();

	const update = await prisma.asset.update({
		where: {
			id: id,
		},
		data: json,
	});
	return NextResponse.json(update);
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	const json = await request.json();

	const updated = await prisma.asset.update({
		where: {
			id: id,
		},
		data: json,
	});

	return NextResponse.json(updated);
}
