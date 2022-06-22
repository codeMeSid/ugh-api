import { validationResult } from "express-validator";
import { consoleLog } from "../utils/consoleLog";
import { Controller } from "../utils/routeManager";
import { CustomError } from "./errorHandler";

export const validateHandler = (): Controller => (req, res, nextFunc) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) nextFunc();
  else
    throw new CustomError(
      "BadRequestError",
      errors.array().map((error) => `${error?.param} is ${error?.msg}`)
    );
};
