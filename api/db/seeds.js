/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')

dotenv.config()
const db = new PrismaClient()

async function main() {
  await db.leader.upsert({
    where: { id: '1' },
    update: {
      id: '1',
      firstName: 'Matt',
      lastName: 'Spector',
      amount: 1,
      email: 'matt@matt.com',
    },
    create: {
      id: '1',
      firstName: 'Matt',
      lastName: 'Spector',
      amount: 1,
      email: 'matt@matt.com',
    },
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
