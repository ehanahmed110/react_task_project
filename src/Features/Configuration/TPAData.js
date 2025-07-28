import * as Yup from "yup";
export const TPAInitialValues = {
  name_en: "",
  name_ar: "",
  short_name: "",
  license_id: "",
};
export const TPAValidationSchema = Yup.object({
  name_en: Yup.string().required("Name is required"),
  name_ar: Yup.string().required("Arabic Name is required"),
  short_name: Yup.string().required("Short Name is required"),
  license_id: Yup.string().required("License ID is required"),
});