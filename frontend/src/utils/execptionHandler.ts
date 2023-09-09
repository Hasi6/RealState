import { ErrorZ } from '@/models/error';

export interface FormattedError {
  errors: ErrorZ[];
  formErrors: ErrorZ[];
}

export function exceptionHandler(errors: ErrorZ[]): FormattedError {
  const formErrors = [];
  const otherErrors = [];

  for (const error of errors) {
    if (error.field) {
      formErrors.push(error);
    } else {
      otherErrors.push(error);
    }
  }

  return {
    errors: otherErrors,
    formErrors,
  };
}
