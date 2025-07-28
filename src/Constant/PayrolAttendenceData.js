 import * as Yup from 'yup';
// export const employeeName = [
//   { name: "Amina Shehbaz" },
//   { name: "Ahmed Ali" },
//   { name: "Sara Khan" }
// ];
// export const yearData = [
//   { year: "2016" },
//   { year: "2017" },
//   { year: "2018" },
//   { year: "2019" },
//   { year: "2020" },
//   { year: "2021" },
//   { year: "2022" },
//   { year: "2023" },
//   { year: "2024" },
//   { year: "2025" }
// ];
// export const monthData = [
//   { month: "January" },
//   { month: "February" },
//   { month: "March" },
//   { month: "April" },
//   { month: "May" },
//   { month: "June" },
//   { month: "July" },
//   { month: "August" },
//   { month: "September" },
//   { month: "October" },
//   { month: "November" },
//   { month: "December" }
// ];
// export const dayData = Array.from({ length: 31 }, (_, i) => ({
//   day: String(i + 1)
// }));
export const employeeName = [
  { label: "Amina Shehbaz", value: "Amina Shehbaz" },
  { label: "Ahmed Ali", value: "Ahmed Ali" },
  { label: "Sara Khan", value: "Sara Khan" }
];

export const yearData = Array.from({ length: 10 }, (_, i) => {
  const year = 2016 + i;
  return { label: year.toString(), value: year };
});

export const monthData = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 }
];

export const dayData = Array.from({ length: 31 }, (_, i) => ({
  label: (i + 1).toString(),
  value: i + 1
}));
export const AttendenceInitialValues = {
  name: '',
  year: '',
  month: '',
  day: '',
};
export const AttendenceValidationSchema = Yup.object({
  name: Yup.string().required("Employee Name is required"),
  year: Yup.number().required("Year is required"),
  month: Yup.number().required("Month is required"),
  day: Yup.number().required("Day is required"),
});