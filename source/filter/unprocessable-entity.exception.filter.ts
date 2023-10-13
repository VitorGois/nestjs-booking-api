import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CannotCreateEntityIdMapError } from 'typeorm';

import { OrmException } from '../orm/orm.enum';

/**
 * Custom exception filter to convert EntityNotFoundError from TypeOrm to NestJs responses.
 * @see also @https://docs.nestjs.com/exception-filters
 */
@Catch(CannotCreateEntityIdMapError)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {

  /**
   * Handles the exception when it's not possible to create an entity ID map.
   *
   * @param exception - The exception of type CannotCreateEntityIdMapError.
   * @param host - The host object from NestJS.
   * @returns An HTTP response indicating an Unprocessable Entity error.
   */
  public catch(exception: CannotCreateEntityIdMapError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'Unprocessable Entity',
        message: OrmException.ENTITY_CONFLICT,
      });
  }

}
