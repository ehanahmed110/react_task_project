import * as Yup from 'yup';
export const PayrunInitialValues = {
    pay:"",
    account:""
};
export const PayrunValidationSchema = Yup.object({
    pay: Yup.string().required(),
    account: Yup.string().required()
});
export const AccountType = [
    {label:"Client",value:"client"},
    {label:"Self Paid",value:"self paid"}
]