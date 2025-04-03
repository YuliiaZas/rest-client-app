export class AppError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

export class ApiError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}

export type UnionErrorType = AppError | ApiError;
