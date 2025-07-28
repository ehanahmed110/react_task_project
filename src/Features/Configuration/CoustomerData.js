import * as Yup from "yup";
export const countryOption = [
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Argentina", value: "Argentina" },
  { label: "Australia", value: "Australia" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Brazil", value: "Brazil" },
  { label: "Canada", value: "Canada" },
  { label: "China", value: "China" },
  { label: "Egypt", value: "Egypt" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Iran", value: "Iran" },
  { label: "Iraq", value: "Iraq" },
  { label: "Italy", value: "Italy" },
  { label: "Japan", value: "Japan" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Mexico", value: "Mexico" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands", value: "Netherlands" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Philippines", value: "Philippines" },
  { label: "Qatar", value: "Qatar" },
  { label: "Russia", value: "Russia" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Singapore", value: "Singapore" },
  { label: "South Africa", value: "South Africa" },
  { label: "South Korea", value: "South Korea" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Syria", value: "Syria" },
  { label: "Turkey", value: "Turkey" },
  { label: "United Arab Emirates", value: "United Arab Emirates" },
  { label: "United Kingdom", value: "United Kingdom" },
  { label: "United States", value: "United States" },
  { label: "Yemen", value: "Yemen" }
];


export const statusOption = [
    {label:"Active",value:"Active"},
    {label:"InActive",value:"Inactive"}
];

export const CoustomerInitialValues = {
  name: "",
  primary_contact_number: "",
  primary_email_id: "",
  address: "",
  document_id: "",
  status: "",        
  nationality: "",    
};
export const CoustomerValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
primary_contact_number: Yup.string()
  .required("Primary contact number is required")
  .matches(/^[0-9]+$/, "Only numeric values allowed")
  .length(10, "Must be exactly 10 digits"),
  primary_email_id: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  address: Yup.string().required("Address is required"),
  document_id: Yup.string().required("Document ID is required"),
  status: Yup.string().required("Status is required"),
  nationality: Yup.string().required("Nationality is required"),
});