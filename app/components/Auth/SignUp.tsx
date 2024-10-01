"use client";
import React, { FC, useEffect, useState } from "react";
import "./auth.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userRegistration } from "@/redux/features/auth/authSlice";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter youe name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),

  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);

      dispatch(userRegistration({ token: data?.activationToken }));
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        if (errorData.data.message === "Email already exists") {
          // Display an error message to the user
          toast.error("Email already exists");
          // You may handle further actions here, such as clearing the email field
          // formik.setFieldValue('email', '');
        } else {
          toast.error(errorData.data.message);
        }
      }
    }
  }, [isSuccess, error, data, dispatch, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      await register(data);
    },
  });
  const { errors, touched, handleChange, handleSubmit, values } = formik;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1
        style={{ fontSize: "25px", fontWeight: "600" }}
        className={`${styles.title} `}
      >
        Join With KnowledgeFlow
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {" "}
          <label
            style={{ fontSize: "16px" }}
            className={`${styles.lable} `}
            htmlFor="email"
          >
            Enter your Name
          </label>
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="pranay"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span style={{ color: "red" }} className="text-red-500  block">
              {errors.name}
            </span>
          )}
        </div>
        <label
          style={{ fontSize: "16px" }}
          className={`${styles.lable} `}
          htmlFor="email"
        >
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="login@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span style={{ color: "red" }} className="text-red-500 block">
            {errors.email}
          </span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label
            style={{ fontSize: "16px" }}
            className={`${styles.lable} `}
            htmlFor="email"
          >
            Enter your Password
          </label>
          <input
            type={show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="@Password123"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span style={{ color: "red" }} className="text-red-500  block">
            {errors.password}
          </span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Sign up"
            style={{ fontSize: "18px", fontWeight: "600" }}
            className={`${styles.button} btn`}
          />
        </div>
        <br />
        <h5 className="text-center  font-Poppins text-[14px] text-white">
          Or join With
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-2 font-Poppins">
          Already have an account?{" "}
          <span
            style={{ color: "#5698e4" }}
            className="text-[#5698e4] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign In
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
