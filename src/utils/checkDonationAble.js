function dateCompare(inputDate) {
  // Parse the input date (format: DD/MM/YYYY)
  const [day, month, year] = inputDate.split('/').map(Number);
  const inputDateObj = new Date(year, month - 1, day);
  const currentDate = new Date();

  // Calculate time difference in milliseconds
  const timeDiff = inputDateObj - currentDate;

  // If date is in the past
  if (timeDiff < 0) {
    return {
      able: true,
      duration: {
        days: 0,
        months: 0,
        years: 0
      },
      message: "The input date is in the past"
    };
  }

  // Calculate days difference
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  // Calculate months and years difference
  let monthsDiff = inputDateObj.getMonth() - currentDate.getMonth();
  let yearsDiff = inputDateObj.getFullYear() - currentDate.getFullYear();

  // Adjust for year rollover
  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff += 12;
  }

  // Calculate total months difference
  const totalMonthsDiff = yearsDiff * 12 + monthsDiff;

  // Check if difference is 3 months or more
  const isAllowed = totalMonthsDiff >= 3;

  return {
    able: isAllowed,
    duration: {
      days: daysDiff,
      months: totalMonthsDiff,
      years: yearsDiff
    },
    message: isAllowed 
      ? `Date difference is ${totalMonthsDiff} months (${yearsDiff} years and ${monthsDiff} months)` 
      : `Date difference is less than 3 months`
  };
}

export default dateCompare;