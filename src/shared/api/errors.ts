export interface ApiError {
  message: string
  code: string
  errors?: Record<string, string[]>
}

export class ApiException extends Error {
  readonly status: number
  readonly code: string
  readonly errors?: Record<string, string[]>

  constructor(
    status: number,
    code: string,
    message: string,
    errors?: Record<string, string[]>,
  ) {
    super(message)
    this.name = 'ApiException'
    this.status = status
    this.code = code
    this.errors = errors
  }

  static fromResponse(status: number, data: unknown): ApiException {
    const d = data as { code?: string; message?: string; errors?: Record<string, string[]> }
    return new ApiException(
      status,
      d?.code ?? 'UNKNOWN_ERROR',
      d?.message ?? 'An unexpected error occurred',
      d?.errors,
    )
  }
}

export function isApiError(error: unknown): error is ApiException {
  return error instanceof ApiException
}

export function isUnauthenticated(error: unknown): boolean {
  return isApiError(error) && error.code === 'UNAUTHENTICATED'
}
