export const semesterOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();

export const semesterYearOptions = Array.from({ length: 7 }, (_, index) => ({
  value: currentYear + index,
  label: currentYear + index,
}));

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const semesterMonthOptions = months.map((month) => ({
  value: month,
  label: month,
}));
