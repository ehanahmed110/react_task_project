import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { ShareButton } from "../../Shared/ShareButton";
import { SearchInput } from "../../Shared/SearchInput";
import { useSelector } from "react-redux";
import { ShareTabs } from "../../Shared/ShareTabs";
import { ShareDialog } from "../../Shared/ShareDialog";
import { CharttabComponent } from "./CharttabComponent";
import { ShareInput } from "../../Shared/ShareInput";
import { Formik, Form, Field } from "formik";
import { CustomDropDown } from "../../Shared/CustomDropDown";
import {
  AccountInitialValues,
  AccountValidationSchema,
} from "../../Constant/CreateAccountData";

export function ChartAccount() {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useSelector((state) => state.data);
  const [visible, setVisible] = useState(false);
  const tabs = [
    {
      label: "Asset",
      content: (
        <CharttabComponent account_type="Asset" searchTerm={searchTerm} />
      ),
    },
    {
      label: "Liability",
      content: (
        <CharttabComponent account_type="Liability" searchTerm={searchTerm} />
      ),
    },
    {
      label: "Revenue",
      content: (
        <CharttabComponent account_type="Revenue" searchTerm={searchTerm} />
      ),
    },
    {
      label: "Equity",
      content: (
        <CharttabComponent account_type="Equity" searchTerm={searchTerm} />
      ),
    },
    {
      label: "Expense",
      content: (
        <CharttabComponent account_type="Expense" searchTerm={searchTerm} />
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium">
            Accounts({data?.length || 5}
            <span className="text-[13px] italic"> Entries</span>)
          </h1>
        </div>
        <div className="flex gap-x-3">
          <SearchInput
            placeholder="search by code or name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ShareButton
            label=" Create Account "
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
        </div>
      </div>
      {/* --------------------- */}
      <div className="mt-2">
        <div>
          <ShareTabs tabs={tabs} />
        </div>
      </div>
      <div>
        <ShareDialog
          visible={visible}
          onHide={() => setVisible(false)}
          title="Create Account"
          width="60vw"
          showFooter={false}
        >
          <Formik
            initialValues={AccountInitialValues}
            validationSchema={AccountValidationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <div>
                  <ShareInput label="Name" name="name_en" placeholder="Name" />
                </div>
                <div>
                  <ShareInput
                    label="Name"
                    name="name_ar"
                    placeholder="Name(Arabic)"
                  />
                </div>
                <div>
                  <Field
                    name="type"
                    label="Type"
                    component={CustomDropDown}
                    optionLabel="label"
                    placeholder="Select Type"
                    options={['Asset']}
                  />
                </div>
                <div>
                  <Field
                    name="sub_type"
                    label="Sub Type"
                    component={CustomDropDown}
                    optionLabel="label"
                    placeholder="Select Sub Type"
                    options={['current Asset']}
                  />
                </div>
                <div>
                  <ShareInput
                    label="Balance"
                    name="balance"
                    placeholder="Enter Balance"
                  />
                </div>
                <div>
                  <Field
                    name="catagory"
                    label="Catagory"
                    component={CustomDropDown}
                    optionLabel="label"
                    placeholder="Select Catagory"
                    options={['child']}
                  />
                </div>
                <div>
                  <ShareInput
                    label="Description"
                    name="description"
                    placeholder="Enter Description"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-x-3 mt-4">
                <div>
                  <ShareButton
                    label="Cancel"
                    type="button"
                    onClick={() => setVisible(false)}
                  />
                </div>
                <div>
                  <ShareButton label="Submit" type="submit" />
                </div>
              </div>
            </Form>
          </Formik>
        </ShareDialog>
      </div>
    </React.Fragment>
  );
}
