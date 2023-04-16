// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ rejectOnNotFound: true });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		query: { id },
		method,
	} = req;

	const userId = Number(id);

	switch (method) {
		case 'GET':
			try {
				const user = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				});

				if (!user) {
					res.status(404).json({ message: 'User not found' });
				} else {
					res.status(200).json(user);
				}
			} catch (e) {
				res.status(400).json(e);
			}
			break;

		case 'PUT':
			try {
				const { name } = req.body;

				const user = await prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						name,
					},
				});

				res.json(user);
			} catch (e) {
				res.status(400).json(e);
			}
			break;

		case 'DELETE':
			try {
				const user = await prisma.user.delete({
					where: {
						id: userId,
					},
				});

				res.json(user);
			} catch (e) {
				res.status(400).json(e);
			}
			break;

		default:
			res.setHeader('Allow', ['PUT']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
