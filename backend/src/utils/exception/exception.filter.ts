import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CustomExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : 500;
    const errors = [];
    if (exception.response && exception.response.errors) {
      for (const error of exception.response.errors) {
        // Validation pipe will format the error so we don't need to format errors here
        errors.push(error);
      }
    } else if (
      exception.response &&
      exception.response.message &&
      typeof exception.response.message !== 'string'
    ) {
      for (const error of exception.response.message) {
        errors.push(error);
      }
    } else if (typeof exception.message === 'string') {
      errors.push({
        field: exception.response?.field,
        message: exception.message
      });
    } else {
      errors.push({ message: 'Internal server error' });
    }

    response.status(status).send({
      errors,
      success: false,
      status
    });
  }
}
