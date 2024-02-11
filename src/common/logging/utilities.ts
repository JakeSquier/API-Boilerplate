/**
 * Safely (never throw) get an error message, optionally with stack trace, from an unknown variable
 * @param error Error details in unknown format
 */
export function safeGetErrorMessage(
  error: unknown,
  includeStack: boolean
): string {
  // Null or undefined
  if (error == null) {
    return "";
  }

  // Error object
  if (error instanceof Error) {
    return includeStack ? error.stack ?? error.message : error.message;
  }

  // Stringify anything else
  return String(error);
}
