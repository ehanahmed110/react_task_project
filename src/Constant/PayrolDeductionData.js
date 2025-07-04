 import * as Yup from 'yup';

export const type = [
    {label:"Tax",value:"Tax"},
    {label:"Absent",value:"Absent"},
    {label:"Advance",value:"Advance"},
]

export const DeductionInitialValues = {
  name: '',
  type: '',
  date: '',
  amount: 0,
  description:""
};
export const DeductionValidationSchema = Yup.object({
  name: Yup.string().required("Employee Name is required"),
  type: Yup.string().required("Type is required"),
  date: Yup.string().required("Date is required"),
  amount: Yup.number().required("Amount is required"),
    description:Yup.string().required('firld is required')
});
