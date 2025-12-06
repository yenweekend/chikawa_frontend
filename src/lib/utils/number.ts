export const isValidNumber = (
  value: number | undefined | null
): value is number => {
  return value !== null && value !== undefined && !isNaN(value);
};
