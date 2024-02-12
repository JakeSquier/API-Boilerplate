import dotenv from "dotenv";
dotenv.config();

import _app from "./app";
import warmup from "./warmup";
import logger from "./common/logging/log";
import { safeGetErrorMessage } from "./common/logging/utilities";

async function main(): Promise<void> {
  const app = _app();
  const port = process.env.PORT || 8080;

  /** Run warmup tasks */
  await warmup();

  app.listen(port, () => {
    logger.info(`[server]: Server is running at http://localhost:${port}`);
  });
}

main().catch((ex) => {
  logger.error(
    "Critical: Application failed to startup",
    safeGetErrorMessage(ex, false)
  );
});
