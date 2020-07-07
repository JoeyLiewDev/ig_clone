import bcrypt from "bcrypt";

import { database } from "../database";
import { AppError } from "../utils";
import { createToken, verifyToken } from "../utils";

interface registerParams {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const register = async (data: registerParams) => {
  const { name, email, password } = data;
  // Check whether user with e-mail address exists.
  const userEmail = await database("users").select().where({ email });
  // If e-mail address is already taken, throw an error.
  if (userEmail.length) {
    throw new AppError(409, "E-mail address is alredy taken.");
  }
  // Never store passwords as plain text in database => Hash the password.
  const hashedPassword = await bcrypt.hash(password, 12);
  // Save to "users" table in database.
  const newUser = await database("users").insert(
    { name, email, password: hashedPassword },
    "*"
  );
  const user = newUser[0];
  const tokenPayload = { userId: user.id, tokenVersion: user.token_version };
  // Create access token.
  const accessToken = await createToken(
    tokenPayload,
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );
  // Create refresh token.
  const refreshToken = await createToken(
    tokenPayload,
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    }
  );
  // Omit password from user object.
  const { password: omit, ...rest } = user;
  return { user: rest, accessToken, refreshToken };
};

interface loginParams {
  email: string;
  password: string;
}

export const login = async (data: loginParams) => {
  const { email, password } = data;
  // Check whether user with e-mail address exists.
  const userEmail = await database("users").select().where({ email });
  // If user with e-mail address not found, throw an error.
  if (!userEmail.length) {
    throw new AppError(404, "User with e-mail address not found");
  }
  const user = userEmail[0];
  // Check whether both passwords match.
  const match = await bcrypt.compare(password, user.password);
  // If passwords don't match, throw an error.
  if (!match) {
    throw new AppError(401, "Invalid credentials");
  }
  const tokenPayload = { userId: user.id, tokenVersion: user.token_version };
  // Create access token.
  const accessToken = await createToken(
    tokenPayload,
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );
  // Create refresh token.
  const refreshToken = await createToken(
    tokenPayload,
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    }
  );
  // Omit password from user object.
  const { password: omit, ...rest } = user;
  return { user: rest, accessToken, refreshToken };
};

export const refreshToken = async (refreshToken: string) => {
  // Verify refresh token.
  const { userId, tokenVersion } = verifyToken(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  );
  // Get user with id and token version.
  const user = await database("users")
    .select()
    .where({ id: userId, token_version: tokenVersion });
  // If no user found, throw an error.
  if (!user.length) {
    throw new AppError(401, "Invalid refresh token.");
  }
  const tokenPayload = { userId, tokenVersion };
  // Create access token.
  const accessToken = await createToken(
    tokenPayload,
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );
  return accessToken;
};
