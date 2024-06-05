/**
 * Truncates a string if it exceeds a specified length.
 * @param str - The string to truncate.
 * @param num - The maximum length of the truncated string.
 * @returns The truncated string.
 */
export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

/**
 * Formats a date string into a localized date string.
 * @param date - The date string to be formatted.
 * @returns The formatted date string.
 */
export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return newDate.toLocaleDateString("es-ES", options);
};