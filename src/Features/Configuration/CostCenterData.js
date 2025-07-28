import * as Yup from "yup";

export const CostCenterInitialValues = {
  name_en: "",
  name_ar: "",
  description: "",
};

export const CostCenterValidationSchema = Yup.object({
  name_en: Yup.string()
    .required("English name is required")
    .min(3, "At least 3 characters required"),
  name_ar: Yup.string()
    .required("Arabic name is required")
    .min(2, "At least 2 characters required"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Minimum 5 characters"),
});
