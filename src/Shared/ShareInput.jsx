import { InputText } from "primereact/inputtext";
import React from "react";
import { useField } from "formik";

export function ShareInput({ icon, label, className, placeholder, ...props }) {
  const { name, type } = props;
  const [field, meta] = useField({ name, type });

  return (
    <>
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2">{label}</label>
        )}
        <InputText
          //{...props}
          icon={icon}
          {...field}
          type={type}
          placeholder={placeholder}
          className={`${className} ${
            meta.touched && meta.error ? "border-red-500" : "border-gray-300"
          } w-full border focus:outline-none focus:ring-2 px-3 py-2`}
          pt={{
            root: { className: "!px-2 !py-1 !w-full !rounded-[4px] focus:!border-[#fab768] !outline-none !ring-0 focus:!ring-0 !shadow-none focus:!outline-none focus:!shadow-none hover:!border-[#fab768]" },
          }}
        />
        {meta.touched && meta.error && (
          <p className="text-red-500 text-sm mt-1">{meta.error}</p>
        )}
      </div>
    </>
  );
}
