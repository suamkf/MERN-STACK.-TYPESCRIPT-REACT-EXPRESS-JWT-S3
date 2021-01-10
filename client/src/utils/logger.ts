import { format, createLogger, transports } from "winston";

import { config } from "../config/index";

const addDate = format((info) => {
  info.message = `${new Date().toISOString} ${info.message}`;
  return info;
});
export default createLogger({
  transports: [
    new transports.Console({
      level: "debug",
      handleExceptions: true,
      format: format.combine(format.colorize(), format.simple()),
    }),/*
    new transports.File({
      level: "info",
      handleExceptions: true,
      format: format.combine(addDate(), format.simple()),
      dirname: config.winston.dirname,
      filename: config.winston.filename,
      maxFiles: config.winston.maxFiles,
      maxsize: config.winston.maxsize,
    }),*/
  ]
});
