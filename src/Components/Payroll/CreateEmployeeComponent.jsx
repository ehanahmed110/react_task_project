import React from "react";
import { useNavigate } from "react-router-dom";
import { ShareButton } from "../../Shared/ShareButton";
import { Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import { CoustomHeading } from "../../Shared/CoustomHeading";

export function CreateEmployeeComponent() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div className="py-2 px-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h1 className="text-3xl font-bold">Create Employee</h1>
          <div className="mt-4">
            <Formik>
              <Form>
                <div className="bg-white p-4 shadow rounded-lg border border-gray-300">
                  <div className="flex">
                    <div className="flex justify-center items-center h-6 w-6 bg-gray-100">
                      <i className="pi pi-user text-2xl text-[#fab768]"></i>
                    </div>
                    <div>
                      <CoustomHeading title="Personal Details" />
                    </div>
                  </div>
                 
                    <div className="grid ">
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
                    <div className="flex">
                    <div className="flex justify-center items-center h-6 w-6 bg-gray-100">
                      <i className="pi pi-user text-2xl text-[#fab768]"></i>
                    </div>
                    <div>
                      <CoustomHeading title="Bank Details" />
                    </div>
                  </div>
                   
                  </div>
                {/* ----           --------------------- */}
                <div></div>
              </Form>
            </Formik>
          </div>

          <div className="flex justify-end gap-x-3">
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
        </div>
      </div>
    </React.Fragment>
  );
}
