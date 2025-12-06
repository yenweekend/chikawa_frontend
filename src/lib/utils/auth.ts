export const getErrorMessage = (err: unknown, error?: string): string => {
  if (typeof err === "string") {
    return err;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return error ?? "An error has occurred.";
};
