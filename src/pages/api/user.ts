// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const users = await prisma.user.findMany({
					include: { Posts: true },
				});

				res.status(200).json(users);
			} catch (e) {
				res.status(400).json(e);
			}
			break;

		case 'POST':
			const { name, email } = req.body;

			try {
				const user = await prisma.user.create({
					data: {
						name,
						email,
					},
				});

				res.status(201).json(user);
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
