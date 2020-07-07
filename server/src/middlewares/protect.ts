import { asyncCatch, AppError } from "../utils";
import { verifyToken } from "../utils/authToken";
import { database } from "../database";

export const protect = asyncCatch(async (req, res, next) => {
  // Get 'authorization' header from request headers.
  const { authorization } = req.headers;
  // If no 'authorization' header found, throw an error.
  if (!authorization) {
    throw new AppError(401, "'authorization' header not found.");
  }
  // Get access token from 'authorization' header string.
  const accessToken = authorization.split(" ")[1];
  // If no access token found, throw an error.
  if (!accessToken) {
    throw new AppError(401, "Invalid 'authorization' header.");
  }
  // Verify access token.
  const { userId, tokenVersion } = verifyToken(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET!
  );
  if (!userId || !tokenVersion) {
    throw new AppError(401, "Invalid access token.");
  }
  // Get user with id and token version.
  const user = await database("users")
    .select()
    .where({ id: userId, token_version: tokenVersion });
  if (!user.length) {
    throw new AppError(401, "Invalid access token.");
  }
  req.user = user[0];
  next();
});
