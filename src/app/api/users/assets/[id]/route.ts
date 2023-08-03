import { prisma } from '@/libs/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;

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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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
