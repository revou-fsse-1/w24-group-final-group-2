import { prisma } from '@/libs/db';
import { NextResponse } from 'next/server';

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const id = params.id;
	const asset = await prisma.asset.findUnique({
		where: {
			id: id,
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
