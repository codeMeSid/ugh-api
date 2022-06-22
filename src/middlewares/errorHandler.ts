import { NextFunction, Request, Response } from "express";

type ErrorType =
  | "BadRequestError"
  | "ServerError"
  | "NotFoundError"
  | "UnAuthorised";

const getStatusCode = (status?: ErrorType): number => {
  switch (status) {
    case "BadRequestError":
      return 400;
    case "UnAuthorised":
      return 401;
    case "NotFoundError":
      return 404;
    case "ServerError":
    default:
      return 500;
  }
};

export class CustomError extends Error {
  messages: Array<{ message: string }> = [];
  type: ErrorType;
  statusCode: number = getStatusCode();
  constructor(
    type: ErrorType = "ServerError",
    messages: Array<string> = ["Something went wrong"]
  ) {
    super(messages[0]);
    this.messages = messages.map((message) => ({ message }));
    this.type = type;
    this.statusCode = getStatusCode(type);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  nextFunc: NextFunction
) => {
  res.status(error.statusCode).json({ success: false, errors: error.messages });
};
