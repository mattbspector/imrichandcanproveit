import { render } from '@redwoodjs/testing'

import MainText from './MainText'

describe('MainText', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MainText />)
    }).not.toThrow()
  })
})
