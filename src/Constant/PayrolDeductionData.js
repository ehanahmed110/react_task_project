 import * as Yup from 'yup';
export const employeeName = [
  { label: "Amina Shehbaz", value: "Amina Shehbaz" },
  { label: "Ahmed Ali", value: "Ahmed Ali" },
  { label: "Sara Khan", value: "Sara Khan" }
];
export const type = [
    {label:"Tax",value:"Tax"},
    {label:"Absent",value:"Absent"},
    {label:"Advance",value:"Advance"},
]

export const DeductionInitialValues = {
  name: '',
  type: '',
  date: '',
  amount: '',
  description:""
};
export const DeductionValidationSchema = Yup.object({
  name: Yup.string().required("Employee Name is required"),
  type: Yup.string().required("Type is required"),
  date: Yup.string().required("Date is required"),
  amount: Yup.number().required("Amount is required"),
    description:Yup.string().required('firld is required')
});
