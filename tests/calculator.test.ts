/* globals describe it expect */

import { Calculator } from '../src/calculator'

describe('Calculator:', () => {
  it('Should sum two values', () => {
    const result = new Calculator(1)
      .plus(1)
      .equals()

    expect(result).toEqual(2)
  })

  it('Should subtract two values', () => {
    const result = new Calculator(7)
      .minus(1)
      .equals()

    expect(result).toEqual(6)
  })

  it('Should divide one value by another', () => {
    const result = new Calculator(9)
      .divided(3)
      .equals()

    expect(result).toEqual(3)
  })

  it('Should multiply one value by another', () => {
    const result = new Calculator(4)
      .times(4)
      .equals()

    expect(result).toEqual(16)
  })

  it('Should perform complex operations', () => {
    const result = new Calculator(10)
      .plus(1)
      .times(2)
      .minus(2)
      .divided(4)
      .equals()

    expect(result).toEqual(5)
  })
})
