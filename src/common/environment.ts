import moize from "moize";
import dotenv from "dotenv";
dotenv.config();

enum RuntimeEnv {
  PRODUCTION = "production",
  TEST = "test",
  DEVELOPMENT = "dev"
}

/**
 * Determine whether a value is a valid RuntimeEnv
 * @param val Candidate value
 */
function isRuntimeEnv(val: unknown): val is RuntimeEnv {
  return (
    typeof val === "string" && Object.values<string>(RuntimeEnv).includes(val)
  );
}

export const getEnv = moize.infinite((): RuntimeEnv => {
  const runtimeEnv = process.env["RUNTIME_ENV"];
  if (!runtimeEnv) {
    throw new Error(
      "Critical: RUNTIME_ENV is not defined. Ensure application settings are available."
    );
  }
  if (!isRuntimeEnv(runtimeEnv)) {
    const knownEnvs = Object.values<string>(RuntimeEnv);
    throw new Error(
      `Critical: Unrecognized RUNTIME_ENV value. Must be one of: ${knownEnvs.join(", ")}`
    );
  }
  return runtimeEnv;
});

/**
 * Whether the current runtime environment is production
 */
export function isProductionEnv(): boolean {
  return getEnv() === RuntimeEnv.PRODUCTION;
}

/**
 * Whether the current runtime environment is test
 */
export function isTestEnv(): boolean {
  return getEnv() === RuntimeEnv.TEST;
}
/**
 * Whether the current runtime environment is development
 */
export function isDevelopmentEnv(): boolean {
  return getEnv() === RuntimeEnv.DEVELOPMENT;
}
