import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShareButton } from "../../Shared/ShareButton";
import { Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import { CoustomHeading } from "../../Shared/CoustomHeading";
import { FileUpload } from "primereact/fileupload";
import { showSuccess } from "../../Shared/toast";
import {
  employeeInitialValues,
  employeeValidationSchema,
} from "../../Constant/payrolCreateEmployee";

export function CreateEmployeeComponent() {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <React.Fragment>
      <div className="py-2 px-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h1 className="text-3xl font-bold">Create Employee</h1>
          <div className="mt-4">
            <Formik
              initialValues={employeeInitialValues}
              validationSchema={employeeValidationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="bg-white p-4 shadow rounded-lg border border-gray-300">
                  <div className="flex space-x-2">
                    <div className="flex justify-center items-center h-8 w-8 bg-gray-100 rounded">
                      <i className="pi pi-user text-2xl text-[#fab768]"></i>
                    </div>
                    <div>
                      <CoustomHeading title="Personal Details" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
                    <div>
                      <ShareInput
                        name="first_name"
                        label="First Name"
                        placeholder="Enter First Name"
                      />
                    </div>
                    <div>
                      <ShareInput
                        name="last_name"
                        label="Last Name"
                        placeholder="Enter Last Name"
                      />
                    </div>
                    <div>
                      <ShareInput
                        name="national_id"
                        label="National ID"
                        placeholder="Enter National ID"
                      />
                    </div>
                    <div>
                      <ShareInput
                        name="contact_number"
                        label="Contact Number"
                        placeholder="Enter Contact Number"
                      />
                    </div>
                    <div>
                      <ShareInput
                        name="email"
                        label="Email"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div>
                      <ShareInput
                        name="department_id"
                        label="Department ID"
                        placeholder="Enter Department ID"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex justify-center items-center h-8 w-8 bg-gray-100 rounded">
                      <i className="pi pi-book text-2xl text-[#fab768]"></i>
                    </div>
                    <div>
                      <CoustomHeading title="Contract Details" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    <div>
                      <ShareInput
                        label="Job Title"
                        placeholder="Enter job title"
                        name="job"
                      />
                    </div>
                    <div>
                      <ShareInput
                        label="Sallery"
                        placeholder="Enter Sallery"
                        name="salery"
                      />
                    </div>
                    <div>
                      <ShareInput
                        label="Start Date"
                        type="date"
                        name="contract_start_date"
                      />
                    </div>
                    <div>
                      <ShareInput
                        label="End Date"
                        type="date"
                        name="contract_end_date"
                      />
                    </div>
                  </div>
                </div>
                {/* ----           --------------------- */}
                <div className="bg-white p-4 shadow rounded-lg border border-gray-300 mt-2">
                  <div className="md:flex lg:flex gap-x-4">
                    <div className="w-full md:w-1/2">
                      <div className="flex space-x-2">
                        <div className="flex justify-center items-center h-8 w-8 bg-gray-100 rounded">
                          <i className="pi pi-building text-2xl text-[#fab768]"></i>
                        </div>
                        <div>
                          <CoustomHeading title="Bank Details" />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-2">
                        <div>
                          <ShareInput
                            label="Bank Name"
                            placeholder="Enter Bank Name"
                            name="bank_name"
                          />
                        </div>
                        <div>
                          <ShareInput
                            label="Account Number"
                            placeholder="Enter Account Number"
                            name="account_number"
                          />
                        </div>
                        <div>
                          <ShareInput
                            label="IBAN"
                            placeholder="Enter IBAN"
                            name="IBAN"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/2 w-full">
                      <div className="flex space-x-2">
                        <div className="flex justify-center items-center h-8 w-8 bg-gray-100 rounded">
                          <i className="pi pi-paperclip text-2xl text-[#fab768]"></i>
                        </div>
                        <div>
                          <CoustomHeading title="Attachment" />
                        </div>
                      </div>
                      <p>Upload Attachment</p>
                      <div className="card flex w-full">
                        <FileUpload
                          mode="basic"
                          name="demo[]"
                          url="/api/upload"
                          accept="image/*"
                          maxFileSize={1000000}
                          onUpload={() =>
                            showSuccess("File Uploaded Successfully")
                          }
                          pt={{
                            root: {
                              className:
                                "!px-2 !py-1 !w-full !rounded-[4px] !outline-none !shadow-none focus:!outline-none focus:!shadow-none hover:!border-[#fab768]",
                            },
                            basicbutton: {
                              className:
                                "!bg-transparent !text-black !px-2 !py-1 !w-full !rounded-[4px] !outline-none !shadow-none focus:!outline-none focus:!shadow-none hover:!border-[#fab768] !border-gray-300",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* ---------------- */}
                <div className="flex justify-end gap-x-3 mt-4">
                  <div>
                    <ShareButton
                      label="Cancel"
                      type="button"
                      onClick={() => navigate("/payroll")}
                    />
                  </div>
                  <div>
                    <ShareButton label="Submit" type="submit" />
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
