/* globals jest describe it expect */

import Logger from '@yatt/lib/Logger'

describe('Logger:', (): void => {
  it('Should work with default config', (): void => {
    const raise = jest.fn()

    try {
      const logger = new Logger()
      logger.info('info message')
      logger.warn('warn message')
      logger.error('error message')
    } catch (e) {
      raise()
    }

    expect(raise).not.toHaveBeenCalled()
  })

  it('Should work with custom config', (): void => {
    const raise = jest.fn()

    try {
      const devLogger = new Logger({ isDev: true })
      devLogger.info('info message')
      devLogger.warn('warn message')
      devLogger.error('error message')

      const prodLogger = new Logger({ isDev: false, label: 'jest' })
      prodLogger.info('info message')
      prodLogger.warn('warn message')
      prodLogger.error('error message')
    } catch (e) {
      raise()
    }

    expect(raise).not.toHaveBeenCalled()
  })
})
