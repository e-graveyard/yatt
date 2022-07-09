/* globals describe it expect */

import Calculator from '@yatt/Calculator'

describe('Calculator:', (): void => {
  it('Should sum two values', (): void => {
    const result = new Calculator(1).plus(1).equals()
    expect(result).toEqual(2)
  })

  it('Should subtract two values', (): void => {
    const result = new Calculator(7).minus(1).equals()
    expect(result).toEqual(6)
  })

  it('Should divide one value by another', (): void => {
    const result = new Calculator(9).divided(3).equals()
    expect(result).toEqual(3)
  })

  it('Should multiply one value by another', (): void => {
    const result = new Calculator(4).times(4).equals()
    expect(result).toEqual(16)
  })

  it('Should perform complex operations', (): void => {
    const result = new Calculator(10).plus(1).times(2).minus(2).divided(4).equals()
    expect(result).toEqual(5)
  })
})
