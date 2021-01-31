import { render } from '@redwoodjs/testing'

import HallOfFamePage from './HallOfFamePage'

describe('HallOfFamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HallOfFamePage />)
    }).not.toThrow()
  })
})
