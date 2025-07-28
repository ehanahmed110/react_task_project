import * as Yup from 'yup';
export const employeeName = [
  "Amina Shehbaz",
  "Ahmed Ali",
  "Sara Khan"
];
export const typeData = [
  "Day",
  "Week",
  "Month",
  "Annual"
];
export const statusData = ["Approved", "Pending", "Rejected"];

export const leaveInitialValues = {
  name: '',
  type: '',
  start_date: '',
  end_date: '',
  status: '',
};
export const leaveValidationSchema = Yup.object({
  name: Yup.string().required('Employee Name is required'),
  type: Yup.string().required('Leave Type is required'),
  start_date: Yup.date().required('Start Date is required'),
  end_date: Yup.date()
    .required('End Date is required')
    .min(Yup.ref('start_date'), 'End Date cannot be before Start Date'),
  status: Yup.string().required('Status is required'),
});