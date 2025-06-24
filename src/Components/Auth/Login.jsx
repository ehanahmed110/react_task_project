import React from "react";
import { Form, Formik } from "formik";
import { ShareInput } from "../../Shared/ShareInput";
import { ShareButton } from "../../Shared/ShareButton";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../Features/AuthThunk";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../../Shared/toast";

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {message} = useSelector((state)=>state.auth)
    const validation = Yup.object({
        employee_id:Yup.string().required(),
        password:Yup.string().required().min(6,'at leat 6 characters')
    })
  return (
    <>
      <Formik
        initialValues={{ employee_id: "", password: "" }}
        validationSchema={validation}
        onSubmit={(values) => {
          const result = dispatch(LoginUser(values))
          if(result){
            //alert(message || 'Login Successfull')
            showSuccess(message || 'login Successfull')
            navigate('/dashboard')
          }
        }}
      >
        <Form className="space-y-4 w-[330px] ">
          <div className="flex flex-col gap-3">
            <IconField iconPosition="left">
              <InputIcon className="pi pi-user text-orange-500"> </InputIcon>
              <ShareInput
                name="employee_id"
                label="Username"
                placeholder="Enter Username"
                className="w-full focus:ring-2 focus:ring-red-500"
              />
            </IconField>
          </div>
          <div className="flex flex-col gap-3">
            <IconField iconPosition="left">
              <InputIcon className="pi pi-lock text-orange-500"> </InputIcon>
              <ShareInput
                name="password"
                label="Password"
                type='password'
                placeholder="Enter Password"
                className='w-full focus:ring-2 focus:ring-red-500'
              />
            </IconField>
          </div>
          <div>
            <ShareButton type='submit' label="Login" 
            
            />
          </div>
          <div className="absolute bottom-7 right-3">
            <p className="bg-gray-100 px-3 py-1.5 text-gray-600 text-xs font-semibold rounded-full">Super Git 2.1.4</p>
          </div>
        </Form>
      </Formik>
    </>
  );
}
