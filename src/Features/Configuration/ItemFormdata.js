import * as Yup from "yup";
export const ItemForminitialValues = {
  name_en: "",
  name_ar: "",
  item_code: "",
  item_type: "",
  effective_date: "",
  price: "",
  factor:"",
  tax: 15,
  discount: 0,
  non_standard_code: "",
  non_standard_description: "",
  payer_id: "",
  branch_id: "",
  business_id: "",
};

export const ItemFormvalidationSchema = Yup.object({
  name_en: Yup.string().required("Name is required"),
  name_ar: Yup.string().required("Arabic Name is required"),
  item_code: Yup.string().required("Item Code is required"),
  item_type: Yup.string().required("Item Type is required"),
  effective_date: Yup.string().required("Effective Date is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is Required"),
  factor: Yup.number()

    .typeError("Factor must be a number")
    .required("Factor is required"),

  tax: Yup.number()

    .typeError("Tax must be a number")
    .required("Tax is required"),

  discount: Yup.number()

    .typeError("Discount must be a number")
    .required("Discount is required"),

  non_standard_code: Yup.string()
    .required("Discount is required"),
  non_standard_description: Yup.string().required(
    "Non Standard Description is required"
  ),

  payer_id: Yup.number()

    .typeError("Payer is required")
    .required("Payer is required"),

  //   branch_id: Yup.number()
  //     .transform((value, originalValue) => (originalValue === "" ? undefined : Number(originalValue)))
  //     .typeError("Branch ID must be a number")
  //     .required("Branch ID is required"),

  //   business_id: Yup.number()
  //     .transform((value, originalValue) => (originalValue === "" ? undefined : Number(originalValue)))
  //     .typeError("Business ID must be a number")
  //     .required("Business ID is required"),
});
