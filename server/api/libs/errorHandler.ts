import { Error } from "mongoose";
import { Request, Response, NextFunction, RequestHandler } from "express";

import logger from "../../utils/logger";

export const errorHandler = (fn: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
};

export const mongoErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    logger.error(`Error ocurried with mongo ${err}`);
    err.message = "Internal Server Error MDB";
  }
  next(err);
};

export const prodError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error ocurried ${err}`);
  err.message = err.message || "Internal Server Error";
  err.stack = err.stack || "";
  return res.status(500).json({
    msg: err.message,
  });
};

export const devError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error ocurried  ${err}`);
  err.message = err.message || "Internal Server Error";
  return res.status(500).json({
    msg: err.message,
  });
};
