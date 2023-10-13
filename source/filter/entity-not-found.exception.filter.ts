import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { OrmException } from '../orm/orm.enum';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses.
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

  /**
   * Handles the exception when an entity is not found in the database.
   *
   * @param exception - The exception of type EntityNotFoundError.
   * @param host - The host object from NestJS.
   * @returns An HTTP response indicating a Not Found error.
   */
  public catch(exception: EntityNotFoundError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .status(HttpStatus.NOT_FOUND)
      .json({ statusCode: HttpStatus.NOT_FOUND, error: 'Not Found', message: OrmException.ENTITY_NOT_FOUND });
  }

}
