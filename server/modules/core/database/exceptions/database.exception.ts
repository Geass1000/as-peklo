import * as Core from './../../../../core';

import { Enums, Constants } from '../shared';

export class DatabaseException extends Core.Exceptions.InternalServerErrorException {
  constructor(
    message: string,
    errorType: Enums.ExceptionType = Enums.ExceptionType.Database,
  ) {
    super(
      message, Constants.Exception.Code[errorType], Constants.Exception.Name[errorType],
    );
  }
}
