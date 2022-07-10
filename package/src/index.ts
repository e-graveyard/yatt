import 'module-alias/register'
import Calculator from '@yatt/Calculator'
import Logger from '@yatt/lib/Logger'

export { Calculator, Logger }

export const logger = new Logger({ isDev: true, label: 'yatt' })

/**
 * Repeats a given callback function N times.
 *
 * @param n How many times the callback function should be repeated.
 * @param cb The callback function.
 */
export const each = (n: number, cb: (v: any, i: number) => void): void => Array.from(Array(n).keys()).forEach(cb)

/**
 * Calculates and outputs a multiplication table of a given value.
 *
 * @param operand The multiplication number.
 */
export function multiplicationTable (operand: number): void {
  logger.warn('-'.repeat(30))
  logger.warn(`Times table of ${operand}:`)

  each(10, (_, i) => {
    const iter = i + 1
    const result = new Calculator(iter).times(operand).equals()

    logger.info(`${iter} x ${operand} = ${result}`)
  })
}

each(10, (_, i) => multiplicationTable(i + 1))
