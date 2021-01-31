import { db } from 'src/lib/db'
import { calculateOrderAmount } from 'src/services/payments'
const stripe = require('stripe')('sk_test_IpZ4kubn7q0zrnB8V9l8YAoU')

export const leaders = () => {
  return db.leader.findMany({
    orderBy: [
      {
        amount: 'desc',
      },
    ],
  })
}

export const leader = ({ id }) => {
  return db.leader.findUnique({
    where: { id },
  })
}

export const createLeader = async ({ input }) => {
  const currentLeader = await db.leader.findFirst({
    orderBy: [
      {
        amount: 'desc',
      },
    ],
  })
  return db.leader.create({
    data: { ...input, amount: currentLeader.amount + 1 },
  })
}

export const updateLeader = ({ id, input }) => {
  return db.leader.update({
    data: input,
    where: { id },
  })
}

export const deleteLeader = ({ id }) => {
  return db.leader.delete({
    where: { id },
  })
}

export const createPaymentIntent = async ({ amount }) => {
  const currentLeader = await db.leader.findFirst({
    orderBy: [
      {
        amount: 'desc',
      },
    ],
  })

  const amountForOrder = calculateOrderAmount(amount, currentLeader.amount + 1)
  if (amountForOrder) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(amount, currentLeader.amount + 1),
      currency: 'usd',
    })

    return {
      clientSecret: paymentIntent.client_secret,
    }
  } else {
    return {
      clientSecret: '',
    }
  }
}

export const verifyPayment = async ({ amount }) => {
  const currentLeader = await db.leader.findFirst({
    orderBy: [
      {
        amount: 'desc',
      },
    ],
  })

  const amountForOrder = calculateOrderAmount(amount, currentLeader.amount + 1)
  const verified = amountForOrder ? true : false

  return {
    verified,
  }
}
