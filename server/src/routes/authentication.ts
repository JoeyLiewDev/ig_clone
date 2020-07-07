import { Router } from "express";
import cookieParser from "cookie-parser";

import { authenticationController } from "../controllers";

const router = Router();

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);
router.get("/logout", authenticationController.logout);
router.get(
  "/refresh_token",
  cookieParser(),
  authenticationController.refreshToken
);

export const authenticationRoutes = router;
