import * as Yup from "yup";
export const AccountInitialValues = {
  name_en: "",
  name_ar: "",
  type: "",
  sub_type: "",
  balance: 0,
  catagory: "",
  description: "",
};


export const AccountValidationSchema = Yup.object().shape({
  name_en: Yup.string()
    .required("Name is required")
    .min(2, "At least 2 characters"),
  name_ar: Yup.string()
    .required("Arabic name is required")
    .min(2, "At least 2 characters"),
  type: Yup.string().required("Type is required"),
  sub_type: Yup.string().required("Sub type is required"),
  balance: Yup.number()
    .typeError("Balance must be a number")
    .required("Balance is required")
    .min(0, "Balance cannot be negative"),
  catagory: Yup.string().required("Category is required"),
  description: Yup.string().optional().max(500, "Max 500 characters allowed"),
});