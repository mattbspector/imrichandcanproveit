import React, { useState } from 'react'

import { Link, routes } from '@redwoodjs/router'
import MainText from 'src/components/MainText'
import CheckoutForm from 'src/components/CheckoutForm'
import { useMutation } from '@redwoodjs/web'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const promise = loadStripe(process.env.STRIPE_PUBLIC)

export const QUERY = gql`
  query LEADERS {
    leaders: leaders {
      id
      firstName
      lastName
      amount
    }
  }
`

const SEND_PAYMENT = gql`
  mutation LeadersCell_SendPayment($amount: Int!) {
    createPaymentIntent(amount: $amount) {
      clientSecret
    }
  }
`

const VERIFY_PAYMENT = gql`
  mutation LeadersCell_VerifyPayment($amount: Int!) {
    verifyPayment(amount: $amount) {
      verified
    }
  }
`
const CREATE_LEADER = gql`
  mutation LeadersCell_CreateLeadere($input: CreateLeaderInput!) {
    createLeader(input: $input) {
      firstName
      lastName
      amount
      affiliate
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = () => (
  <div className="text-white">There was an error, please refresh</div>
)

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No leaders yet. '}
      <Link to={routes.newLeader()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ leaders, af }) => {
  const [currentLeader, setCurrentLeader] = useState(leaders ? leaders[0] : {})
  const [sendPayment] = useMutation(SEND_PAYMENT)
  const [createLeader] = useMutation(CREATE_LEADER)
  const [verifyPayment] = useMutation(VERIFY_PAYMENT)

  const createPayment = async () => {
    const response = await sendPayment({
      variables: { amount: currentLeader.amount + 1 },
    })
    return response
  }

  const addLeader = (input) => {
    createLeader({
      variables: { input },
    })
  }

  const checkVerification = async () => {
    const response = verifyPayment({
      variables: { amount: currentLeader.amount + 1 },
    })

    return response
  }

  return (
    <div className="table h-full m-auto">
      {currentLeader && currentLeader.amount ? (
        <div className="table-cell text-center align-middle">
          <MainText currentLeader={currentLeader} />
          <Elements stripe={promise}>
            <CheckoutForm
              affiliate={af}
              createPayment={createPayment}
              addLeader={addLeader}
              amount={currentLeader.amount + 1}
              setCurrentLeader={setCurrentLeader}
              checkVerification={checkVerification}
            />
          </Elements>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}
