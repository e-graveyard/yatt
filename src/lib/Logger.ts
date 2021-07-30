/**
 * @module src/lib/Logger
 */

import {
  Logger as WinstonLogger,
  transports as transport,
  format as fmt,
  createLogger
} from 'winston'

/**
 * Representation of a hashmap that received a string as a key name and value
 * of any type.
 * @interface
 */
interface IHash {
  [key: string]: any
}

/**
 * Representation of the logger class config.
 * @interface
 * @property isDev - Whether the logger is on dev mode or not.
 * @property label - The logger label.
 */
export interface ILoggerConfig {
  isDev?: boolean
  label?: string
}

/**
 * Logger helper.
 * @class
 */
export default class {
  private readonly isDev: boolean
  private readonly label: string
  private readonly logger: WinstonLogger

  /**
   * Creates a new console logger.
   * @param config - Configuration with "isDev" flag and log "label".
   */
  public constructor (config?: ILoggerConfig) {
    const c = typeof config === 'undefined' ? {} : config

    this.isDev = Boolean(c.isDev)
    this.label = c.label ?? ''
    this.logger = createLogger({ transports: [this.createConsoleLogger()] })
  }

  /**
   * Creates a Winston console transport.
   * @returns The transport object.
   */
  private createConsoleLogger (): transport.ConsoleTransportInstance {
    const f = [fmt.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), fmt.label({ label: this.label })]

    if (this.isDev) {
      f.push(fmt.colorize({ all: true }))
    }

    /* eslint-disable @typescript-eslint/restrict-template-expressions */
    if (this.label === '') {
      f.push(fmt.printf((i) => `${i.timestamp} ${i.level}: ${i.message}`))
    } else {
      f.push(fmt.printf((i) => `${i.timestamp} (${i.label}) -- ${i.level}: ${i.message}`))
    }
    /* eslint-enable */

    return new transport.Console({ format: fmt.combine(...f) })
  }

  /**
   * Emits an informational log message.
   * @param message - The log message.
   * @param [data] - Additional data to be shown, such as an HTTP response object.
   */
  public info (message: string, data?: IHash): void {
    this.logger.info(message, data)
  }

  /**
   * Emits a warning log message.
   * @param message - The log message.
   * @param [data] - Additional data to be shown, such as an error object.
   */
  public warn (message: string, data?: IHash): void {
    this.logger.warn(message, data)
  }

  /**
   * Emits an error log message.
   * @param message - The log message.
   * @param [data] - Additional data to be shown, such as an error object.
   */
  public error (message: string, data?: IHash): void {
    this.logger.error(message, data)
  }
}
