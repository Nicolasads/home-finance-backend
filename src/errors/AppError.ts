export class AppError extends Error {
  readonly statusCode: number;
  readonly details?: unknown;

  constructor(message: string, statusCode = 400, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.details = details;
  }

  static unauthorized(message = "Não Autenticado") {
    return new AppError(message, 401);
  }

  static forbidden(message = "Acesso Negado") {
    return new AppError(message, 403);
  }

  static notFound(message = "Recurso não encontrado") {
    return new AppError(message, 404);
  }

  static conflict(message: string) {
    return new AppError(message, 409);
  }
}
