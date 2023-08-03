import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/libs/db';
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
	const page = req.nextUrl.searchParams.get('page');
	const limit = req.nextUrl.searchParams.get('limit');
	const search = req.nextUrl.searchParams.get('search');

	const pageNumber = parseInt(page as string);
	const perPageNumber = parseInt(limit as string);

	if (!search) {
		const assets = await prisma.asset.findMany({
			where: {
				deletedAt: {
					equals: null,
				},
			},
			skip: (pageNumber - 1) * perPageNumber,
			take: perPageNumber,
			include: {
				bidAssets: {
					orderBy: {
						bidAmount: 'desc',
					},
					select: {
						bidAmount: true,
						currentPrice: true,
						bidder: {
							select: {
								name: true,
							},
						},
					},
					take: 1,
				},
			},
		});

		return NextResponse.json({
			assets,
		});
	} else {
		const assets = await prisma.asset.findMany({
			where: {
				OR: [
					{
						name: {
							contains: search,
							mode: 'insensitive',
						},
					},
					{
						description: {
							contains: search,
							mode: 'insensitive',
						},
					},
				],
				deletedAt: {
					equals: null,
				},
			},
			skip: (pageNumber - 1) * perPageNumber,
			take: perPageNumber,
			include: {
				bidAssets: {
					orderBy: {
						bidAmount: 'desc',
					},
					select: {
						bidAmount: true,
						currentPrice: true,
						bidder: {
							select: {
								name: true,
							},
						},
					},
					take: 1,
				},
			},
		});

		return NextResponse.json({
			assets,
		});
	}
}

export async function POST(request: Request) {
	const json = await request.json();
	const post = await prisma.asset.create({
		data: json,
	});
	return NextResponse.json(post);
}
