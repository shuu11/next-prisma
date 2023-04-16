// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const posts = await prisma.post.findMany();

				res.status(200).json(posts);
			} catch (e) {
				res.status(400).json(e);
			}
			break;

		case 'POST':
			const { title, content, authorId } = req.body;

			try {
				const post = await prisma.post.create({
					data: {
						title,
						content,
						authorId,
					},
				});

				res.status(201).json(post);
			} catch (e) {
				res.status(400).json(e);
			}
			break;

		default:
			res.setHeader('Allow', ['GET', 'POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
