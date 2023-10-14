import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses.
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(QueryFailedError)
export class EntityConflictExceptionFilter implements ExceptionFilter {

  /**
   * Handles the exception when a database query fails, such as a conflict.
   *
   * @param exception - The exception of type QueryFailedError.
   * @param host - The host object from NestJS.
   * @returns An HTTP response indicating a Conflict error.
   */
  public catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .status(HttpStatus.CONFLICT)
      .json({ statusCode: HttpStatus.CONFLICT, error: 'Conflict', message: exception.message });
  }

}
