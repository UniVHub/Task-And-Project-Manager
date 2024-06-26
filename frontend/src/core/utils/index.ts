
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

/**
 * Formats a date string with time according to the specified options.
 * @param date - The date string to format.
 * @returns The formatted date string with time.
 */
export const formatDateWithTime = (date: string) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return newDate.toLocaleString("es-ES", options);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

