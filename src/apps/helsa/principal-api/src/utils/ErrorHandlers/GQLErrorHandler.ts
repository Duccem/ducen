import { DomainError, InternalError } from '@shared/core';

export function GraphQLErrorHandling(gqlError: any, e: any) {
  let error: DomainError;
  if (e.originalError.thrownValue instanceof DomainError) {
    error = e.originalError.thrownValue;
  } else {
    error = new InternalError(gqlError.message);
  }
  return {
    message: error.getMessage(),
    code: error.getCode(),
    timestamp: error.getTimestamp(),
  };
}
