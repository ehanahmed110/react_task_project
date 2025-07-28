import * as Yup from "yup";
export const BranchInitialValues = {
  name_en: "",
  name_ar: "",
  contact_info: "",
  address: "",
};
export const BranchValidationSchema = Yup.object().shape({
  name_en: Yup.string().required("Name is required"),
  name_ar: Yup.string().required("Name (Arabic) is required"),
  contact_info: Yup.string().required("Contact Information is required"),
  address: Yup.string().required("Address is required"),
});