import jwt, { SignOptions } from "jsonwebtoken";

import { AppError } from "./appError";

export const createToken = (
  payload: object,
  secret: string,
  options?: SignOptions
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "7 days",
    ...options,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): { [key: string]: any } => {
  const payload = jwt.verify(token, secret);

  if (typeof payload === "object" && payload !== null) {
    return payload as { [key: string]: any };
  }
  throw new AppError(401, "Invalid token.");
};
