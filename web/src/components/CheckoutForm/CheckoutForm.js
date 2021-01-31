/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './CheckoutForm.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CheckoutForm = ({
  createPayment,
  amount,
  addLeader,
  setCurrentLeader,
  checkVerification,
}) => {
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [processing, setProcessing] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [fieldsNotFilled, setFieldsNotFilled] = useState(true)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    const creatPaymentIntent = async () => {
      const data = await createPayment()
      const secret = data?.data?.createPaymentIntent?.clientSecret
      if (secret) {
        setClientSecret(secret)
      } else {
        setError(
          'Please refresh the page, it looks like someone else is even richer!'
        )
      }
    }

    creatPaymentIntent()
  }, [amount])

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  }

  const areFieldsSet = () => {
    if (firstName && lastName && email) return true
    return false
  }

  useEffect(() => {
    setFieldsNotFilled(!areFieldsSet())
  }, [firstName, lastName, email])

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)
    const verifyData = await checkVerification()
    console.log(verifyData)
    const isVerified = verifyData?.data?.verifyPayment?.verified
    if (isVerified) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        receipt_email: email,
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${firstName} ${lastName}`,
          },
        },
      })
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`)
        setProcessing(false)
      } else {
        addLeader({ firstName, lastName, email })
        setCurrentLeader({ firstName, lastName, email, amount })
        setError(null)
        setProcessing(false)
        setSucceeded(true)
        toast.success('💰 Payment Success! You are rich!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } else {
      setError(
        'Please refresh the page, it looks like someone else is even richer!'
      )
    }
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form id="payment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="checkoutButton"
          disabled={processing || disabled || fieldsNotFilled}
          id="submit"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              `Pay $${amount}`
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <div
          className={
            succeeded
              ? 'result-message text-white pt-5'
              : 'result-message hidden'
          }
        >
          <div>Payment Succeeded!</div>
          <div>Share this page to prove you are rich!</div>
        </div>
      </form>
    </>
  )
}

export default CheckoutForm
