const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
	const alice = await prisma.user.upsert({
		where: { email: 'alice@prisma.io' },
		update: {},
		create: {
			name: 'Alice',
			email: 'alice@prisma.io',
		},
	});

	console.log(alice);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
