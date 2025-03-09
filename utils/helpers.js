export const getDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return { startDate: null, endDate: null };
  }

  // Decode URL-encoded strings
  startDate = startDate ? decodeURIComponent(startDate) : null;
  endDate = endDate ? decodeURIComponent(endDate) : null;

  // Convert string dates to Date objects and adjust times
  if (startDate) {
    startDate = new Date(startDate);
    startDate.setHours(0, 0, 0, 0); // Start of the startDate
  }

  if (endDate) {
    endDate = new Date(endDate);
    endDate.setHours(23, 59, 59, 999); // End of the endDate
  }

  // Get today's date for comparison
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Set to the end of today

  // Check if startDate or endDate is in the future

  // temporary comment out
  // if ((startDate && startDate > today) || (endDate && endDate > today)) {
  //   const error = new Error(
  //     "Start date and end date must not be greater than the current date."
  //   );
  //   error.statusCode = 400; // Set the HTTP status code
  //   throw error;
  // }

  return { startRange: startDate, endRange: endDate };
};
