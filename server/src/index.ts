import "dotenv/config";

import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { routes } from "./routes";
import { errorHandler } from "./middlewares";

const initializeExpress = (app: Application): void => {
  // Middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }
  // REST API routes
  app.use("/api", routes);
  // Error handling
  app.use(errorHandler);
  // Start server listening on port number.
  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
};

initializeExpress(express());
