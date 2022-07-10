/**
 * Calculator with basic operations.
 * @class
 */
export default class {
  private result: number

  /**
   * Creates a new calculator.
   * @param operand First operand.
   */
  public constructor (operand: number) {
    this.result = operand
  }

  /**
   * Adds a value to the current result.
   * @param value The number value to be added.
   * @returns The class itself object.
   */
  public plus (value: number): this {
    this.result += value
    return this
  }

  /**
   * Subtracts a value to the current result.
   * @param value The number value to be subtracted.
   * @returns The class itself object.
   */
  public minus (value: number): this {
    this.result -= value
    return this
  }

  /**
   * Divides the result by a given value.
   * @param value The number to divide the result.
   * @returns The class itself object.
   */
  public divided (value: number): this {
    this.result /= value
    return this
  }

  /**
   * Multiplies the result by a given value.
   * @param value The number to multiply the result.
   * @returns The class itself object.
   */
  public times (value: number): this {
    this.result *= value
    return this
  }

  /**
   * Finishes the calculation and returns the final result.
   * @returns The final result.
   */
  public equals (): number {
    return this.result
  }
}
