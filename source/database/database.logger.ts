
import { Logger as NestLogger } from '@nestjs/common';
import { Logger as TypeOrmLogger } from 'typeorm';

export class DatabaseLogger implements TypeOrmLogger {

  private readonly LOGGER = new NestLogger('SQL');

  /**
   * Logs a database query with the query string and parameters.
   *
   * @param query - The query string.
   * @param parameters - Optional. The query parameters as an array of unknown values.
   * @returns
   */
  public logQuery(query: string, parameters?: unknown[]): void {
    this.LOGGER.log(`${query} -- Parameters: ${this.stringifyParameters(parameters)}`);
  }

  /**
   * Logs a database query error with the query string, parameters, and error message.
   *
   * @param error - The error message.
   * @param query - The query string.
   * @param parameters - Optional. The query parameters as an array of unknown values.
   * @returns
   */
  public logQueryError(error: string, query: string, parameters?: unknown[]): void {
    this.LOGGER.error(`${query} -- Parameters: ${this.stringifyParameters(parameters)} -- ${error}`);
  }

  /**
   * Logs a slow database query with its execution time, query string, and parameters.
   *
   * @param time - The execution time of the query in milliseconds.
   * @param query - The query string.
   * @param parameters - Optional. The query parameters as an array of unknown values.
   * @returns
   */
  public logQuerySlow(time: number, query: string, parameters?: unknown[]): void {
    this.LOGGER.warn(`Time: ${time} -- Parameters: ${this.stringifyParameters(parameters)} -- ${query}`);
  }

  /**
   * Logs a message related to database migration.
   *
   * @param message - The message to be logged.
   * @returns
   */
  public logMigration(message: string): void {
    this.LOGGER.log(message);
  }

  /**
   * Logs a message related to the schema build process.
   *
   * @param message - The message to be logged.
   * @returns
   */
  public logSchemaBuild(message: string): void {
    this.LOGGER.log(message);
  }

  /**
   * Logs a message with the specified log level.
   *
   * @param level - The log level ('log', 'info', or 'warn') to be used.
   * @param message - The message to be logged.
   * @returns
   */
  public log(level: 'log' | 'info' | 'warn', message: string): void {
    if (level === 'log') {
      return this.LOGGER.log(message);
    }

    if (level === 'info') {
      return this.LOGGER.debug(message);
    }

    if (level === 'warn') {
      return this.LOGGER.warn(message);
    }
  }

  /**
   * Converts an array of parameters to a JSON string representation.
   *
   * @param parameters - An array of parameters to be converted to a JSON string.
   * @returns A JSON string representation of the provided parameters.
   */
  private stringifyParameters(parameters?: unknown[]): string {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }

}
