import { render } from '@redwoodjs/testing'

import CheckoutForm from './CheckoutForm'

describe('CheckoutForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckoutForm />)
    }).not.toThrow()
  })
})
