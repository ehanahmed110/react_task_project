import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ShareInput } from "./ShareInput";
import { ShareButton } from "./ShareButton";
export function FilterSideBar({
  visible,
  onHide,
  title = "Filter",
  // initialValues,
  // validationSchema,
  // onSubmit,
  children,
  width = "20vw",
}) {
  const initialValues = {
    start_date: "",
    end_date: "",
  };

  const validationSchema = Yup.object({
    start_date: Yup.string().required(),
    end_date: Yup.string().required(),
  });
  const handleSubmit = (values) => {
    console.log("Form Data:", values);
  };
  return (
    <React.Fragment>
      <Sidebar
        visible={visible}
        position="right"
        onHide={onHide}
        style={{ width }}
      >
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="relative h-full flex flex-col">
            {/* <div>
            {children}
            </div> */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              <div>
                <ShareInput name="start_date" label="Start Date" type="date" />
              </div>
              <div>
                <ShareInput name="end_date" label="End Date" type="date" />
              </div>
            </div>
            {/* <div>
                <ShareButton label='Submit' type='submit'/>
            </div> */}
            <div className="mt-4 sticky bottom-0 bg-white py-2">
              <ShareButton label="Submit" type="submit" className="w-full" />
            </div>
          </Form>
        </Formik>
      </Sidebar>
    </React.Fragment>
  );
}
