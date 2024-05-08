import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. create
  await prisma.user.deleteMany(); // 仮 開発中のみ。DBのデータを消すため
  const user = await prisma.user.create({
    data: {
      name: 'Miku',
      email: '92@gmail.com',
      age: 92,
      userPreference: {
        create: {
          emailUpdate: true,
        },
      },
    },
    // include: {
    //   userPreference: true,
    // },
    select: {
      name: true,
      email: true,
      userPreference: { select: { id: true } },
    },
  });

  // 2. createMany
  // await prisma.user.deleteMany(); // 仮 開発中のみ。DBのデータを消すため
  // const users = await prisma.user.createMany({
  //   data: [
  //     { name: 'Miku', email: '123@gmail.com', age: 29 },
  //     { name: 'Miku', email: '72@gmail.com', age: 27 },
  //     { name: 'Miku', email: '30@gmail.com', age: 30 },
  //     { name: 'Ami', email: '1234@gmail.com', age: 26 },
  //     { name: 'Kayo', email: '12345@gmail.com', age: 53 },
  //   ],
  // });

  // 3. find one
  // const user = await prisma.user.findUnique({
  //   where: {
  //     age_name: {
  //       age: 29,
  //       name: 'Miku',
  //     },
  //   },
  // });

  // 4. find many
  // const users = await prisma.user.findMany({
  //   where: {
  //     // name: { not: 'Miku' },
  //     age: { lt: 30 },
  //   },
  //   // take: 3, // pagination
  //   // skip: 1, // skip the 1st one
  //   orderBy: {
  //     age: 'asc',
  //   },
  // });

  // 5. update
  // const user = await prisma.user.updateMany({
  //   where: {
  //     name: 'new Miku',
  //   },
  //   data: {
  //     name: 'Miku',
  //   },
  // });

  // 6. delete
  // const user = await prisma.user.delete({
  //   where: {
  //     email: 'miku2@gmail.com',
  //   },
  // });

  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
