import { Router } from "express";

import { authenticationRoutes } from "./authentication";

const router = Router();

router.use("/authentication", authenticationRoutes);

export const routes = router;
