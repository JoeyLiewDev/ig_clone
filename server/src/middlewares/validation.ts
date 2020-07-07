import { ObjectSchema } from "@hapi/joi";

import { asyncCatch } from "../utils";

export const validate = (schema: ObjectSchema) =>
  asyncCatch((req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(422).json({
        error,
      });
    }
    next();
  });
