import { Calculator } from './calculator'

/**
 * Calculate and outputs a multiplication table of a given value.
 *
 * @param {number} operand - the multiplication number.
 */
function multiplicationTable (operand: number): void {
  console.log(`Times table of ${operand}:\n`)

  for (let i = 1; i <= 10; i++) {
    const result = new Calculator(i).times(operand).equals()
    console.log(`${i} x ${operand} = ${result}`)
  }
}

multiplicationTable(7)
