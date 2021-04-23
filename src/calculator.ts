/**
 * @module src/calculator
 */

/**
 * Calculator with basic operations.
 * @class
 */
export class Calculator {
  result: number

  /**
   * Creates a new calculator.
   *
   * @param {number} operand - First operand.
   */
  constructor (operand: number) {
    this.result = operand
  }

  /**
   * Adds a value to the current result.
   *
   * @param {number} value - The number value to be added.
   * @returns {object} - The class itself object.
   */
  plus (value: number): this {
    this.result += value
    return this
  }

  /**
   * Subtracts a value to the current result.
   *
   * @param {number} value - The number value to be subtracted.
   * @returns {object} - The class itself object.
   */
  minus (value: number): this {
    this.result -= value
    return this
  }

  /**
   * Divides the result by a given value.
   *
   * @param {number} value - The number to divide the result.
   * @returns {object} - The class itself object.
   */
  divided (value: number): this {
    this.result /= value
    return this
  }

  /**
   * Multiplies the result by a given value.
   *
   * @param {number} value - The number to multiply the result.
   * @returns {object} - The class itself object.
   */
  times (value: number): this {
    this.result *= value
    return this
  }

  /**
   * Finishes the calculation and returns the final result.
   *
   * @returns {number}
   */
  equals (): number {
    return this.result
  }
}
