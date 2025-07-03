 import * as Yup from 'yup';
export const AllowanceInitialValues = {
  name: '',
  type: '',
  date: '',
  amount: 0 ,
};
export const AllowanceValidationSchema = Yup.object({
  name: Yup.string().required("Employee Name is required"),
  type: Yup.string().required("field is required"),
  date: Yup.string().required("Date is required"),
  amount: Yup.number().required("Amount is required"),
});
export const allowanceType = [
    {label : "Hosuing", value :"Housing"},
    {label : "Travel", value :"Travel"},
    {label : "Bonus", value :"Bonus"},
    {label : "Food", value :"Food"},
]