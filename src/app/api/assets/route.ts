import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/libs/db';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(req);
	if (req.method === 'GET') {
		const { page = '1', limit = '10', search } = req.query;
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
			const totalAssets = await prisma.asset.count({ where: whereClause });
			const assets = await prisma.post.findMany({
				where: whereClause,
				skip: (pageNumber - 1) * perPageNumber,
				take: perPageNumber,
			});
			return res.status(200).json({
				assets,
				totalPages: Math.ceil(totalAssets / perPageNumber),
			});
		} catch (error) {
			console.error('Error fecthing data', error);
		}
	}
}
