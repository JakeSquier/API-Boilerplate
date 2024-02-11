import winston from "winston";
import { isProductionEnv } from "../environment";

/** Conditionally set logging level for different environments */
const level = isProductionEnv() ? "error" : "debug";

/** Conditionally create transports for different environments */
const transports = [];
if (!isProductionEnv()) {
  transports.push(new winston.transports.Console());
} else {
  transports.push(new winston.transports.File({ filename: "combined.log" }));
}

/** Conditionally set format for different environments */
const format = isProductionEnv()
  ? winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.colorize(),
      winston.format.simple()
    )
  : winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.json()
    );

const logger = winston.createLogger({
  level,
  format,
  transports
});

export default logger;
