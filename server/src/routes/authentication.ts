import { Router } from "express";
import cookieParser from "cookie-parser";

import { authenticationController } from "../controllers";
import { protect } from "../middlewares";
import { validate } from "../middlewares";
import { validationSchemas } from "../utils";

const router = Router();

router.post(
  "/register",
  validate(validationSchemas.register),
  authenticationController.register
);
router.post(
  "/login",
  validate(validationSchemas.login),
  authenticationController.login
);
router.get("/logout", authenticationController.logout);
router.get(
  "/refresh_token",
  cookieParser(),
  authenticationController.refreshToken
);
router.get("/load_session", protect, authenticationController.loadSession);

export const authenticationRoutes = router;
