import * as Yup from "yup";
export const employeeInitialValues = {
  // Personal Details
  first_name: "",
  last_name: "",
  national_id: "",
  contact_number: "",
  email: "",
  department_id: "",

  // Contract Details
  job: "",
  salery: "",
  contract_start_date: "",
  contract_end_date: "",

  // Bank Details
  bank_name: "",
  account_number: "",
  IBAN: "",

  // (FileUpload is handled separately, not as part of Formik fields)
};


export const employeeValidationSchema = Yup.object({
  // Personal Details
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  national_id: Yup.string().required("National ID is required"),
  contact_number: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]{10,15}$/, "Enter a valid contact number"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  department_id: Yup.string().required("Department ID is required"),

  // Contract Details
  job: Yup.string().required("Job Title is required"),
  salery: Yup.number()
    .typeError("Sallery must be a number")
    .required("Sallery is required"),
  contract_start_date: Yup.date().required("Start Date is required"),
  contract_end_date: Yup.date()
    .required("End Date is required")
    .min(
      Yup.ref("contract_start_date"),
      "End date cannot be before start date"
    ),

  // Bank Details
  bank_name: Yup.string().required("Bank Name is required"),
  account_number: Yup.string()
    .required("Account Number is required")
    .matches(/^[0-9]{8,20}$/, "Enter a valid account number"),
  IBAN: Yup.string()
    .required("IBAN is required")
    .matches(/^[A-Z0-9]{15,34}$/, "Enter a valid IBAN"),
});
