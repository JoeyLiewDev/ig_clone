import { authenticationServices } from "../services";
import { asyncCatch, AppError } from "../utils";

export const register = asyncCatch(async (req, res) => {
  const {
    user,
    accessToken,
    refreshToken,
  } = await authenticationServices.register(req.body);
  // Set refresh token as cookie.
  res.cookie("rft", refreshToken, {
    httpOnly: true,
    maxAge: Number(process.env.REFRESH_TOKEN_EXPIRATION),
  });
  res.status(201).json({
    user,
    accessToken,
  });
});

export const login = asyncCatch(async (req, res) => {
  const {
    user,
    accessToken,
    refreshToken,
  } = await authenticationServices.login(req.body);
  // Set refresh token as cookie.
  res.cookie("rft", refreshToken, {
    httpOnly: true,
    maxAge: Number(process.env.REFRESH_TOKEN_EXPIRATION),
  });
  res.status(200).json({
    user,
    accessToken,
  });
});

export const logout = asyncCatch(async (_req, res) => {
  res.clearCookie("rft");
  res.json({
    message: "User successfully logout.",
  });
});

export const refreshToken = asyncCatch(async (req, res) => {
  const { rft } = req.cookies;
  if (!rft) {
    throw new AppError(401, "Refresh token is required.");
  }
  const accessToken = await authenticationServices.refreshToken(rft);
  res.json({
    accessToken,
  });
});

export const loadSession = asyncCatch(async (req, res) => {
  res.json({
    user: req.user,
  });
});
