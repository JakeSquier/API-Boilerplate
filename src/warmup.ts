import logger from "./common/logging/log";
import getUserData from "./models/user";
/**
 * Function within this file is utilized for application warmup phase.
 * Tasks defined here will be executed befor the server is started
 */

export default async function (): Promise<void> {
  logger.info("Application has started warmup phase");
  const profiler = logger.startTimer();
  /** Push tasks into array so they can be computed in parallel */
  const tasks = [];
  /** Hydrate users cache */
  tasks.push(await getUserData());
  /** Once all tasks have resolved function will exit */
  await Promise.all(tasks);
  profiler.done({ message: "All warmup tasks have been completed" });
}
