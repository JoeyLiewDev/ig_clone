import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  _next
): void => {
  const {
    statusCode,
    message,
  }: { statusCode: number | undefined; message: string } = error;

  response.status(statusCode || 500).json({
    message,
  });
};
