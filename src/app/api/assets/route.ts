// import { prisma } from '@/libs/db';
// import { NextResponse, NextRequest } from 'next/server';

// export async function GET() {
// 	const asset = await prisma.asset.findMany();
// 	console.log(asset);
// 	return new Response(JSON.stringify(asset));
// }

export async function GET(req: NextRequest) {
	const page = req.nextUrl.searchParams.get('page');
	const limit = req.nextUrl.searchParams.get('limit');
	const search = req.nextUrl.searchParams.get('search');

	const pageNumber = parseInt(page as string);
	const perPageNumber = parseInt(limit as string);
	try {
		const whereClause = {
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
		};
		const assets = await prisma.asset.findMany({
			where: search ? whereClause : {},
			skip: (pageNumber - 1) * perPageNumber,
			take: perPageNumber,
		});
		return NextResponse.json({
			assets,
		});
	} catch (error) {
		console.error('Error fecthing data', error);
	}
}

export async function POST(request: Request) {
	const json = await request.json();
	const post = await prisma.asset.create({
		data: json,
	});
	return NextResponse.json(post);
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { prisma } from '@/libs/db';
import { NextResponse } from 'next/server';
import { url } from 'inspector';

export async function GET(req: NextRequest) {
	console.log('start test', req.nextUrl.searchParams.get('page'), 'end');
	const page = req.nextUrl.searchParams.get('page');
	const limit = req.nextUrl.searchParams.get('limit');
	const search = req.nextUrl.searchParams.get('search');

	const pageNumber = parseInt(page as string);
	const perPageNumber = parseInt(limit as string);
	try {
		const whereClause = search
			? {
					OR: [
						{
							name: {
								contains: search,
								mode: 'insensitive',
							},
						},
					],
			  }
			: {};

		const assets = await prisma.asset.findMany({
			where: whereClause,
			skip: (pageNumber - 1) * perPageNumber,
			take: perPageNumber,
		});
		return NextResponse.json({
			assets,
		});
	} catch (error) {
		console.error('Error fecthing data', error);
	}
}
