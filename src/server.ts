import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import logger from "./common/logging/log";

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
