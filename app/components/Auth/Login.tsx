"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }: any) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast.success("Login Successfully");
      refetch();
      // Reload the current route upon successful login
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        if (errorData.data.message === "Email already exists") {
          toast.error("Email already exists");
        } else {
          toast.error(errorData.data.message);
        }
      }
    }
  }, [isSuccess, error, setOpen]);

  const { errors, touched, handleChange, handleSubmit, values } = formik;

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1
        style={{ fontSize: "25px", fontWeight: "600" }}
        className={`${styles.title} `}
      >
        Login With Me
      </h1>
      <form onSubmit={handleSubmit}>
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
          <span style={{ color: "red" }} className="text-red-500 pt-2 block">
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
          <span style={{ color: "red" }} className="text-red-500 pt-2 block">
            {errors.password}
          </span>
        )}
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Login"
            style={{ fontSize: "18px", fontWeight: "600" }}
            className={`${styles.button} btn`}
          />
        </div>
        <br />
        <h5 className="text-center  font-Poppins text-[14px] text-white">
          Or join With
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="cursor-pointer ml-2"
            onClick={() => signIn("github")}
          />
        </div>
        <h5 className="text-center pt-4 font-Poppins">
          Not have any account?{" "}
          <span
            style={{ color: "#5698e4" }}
            className="text-[#5698e4] pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign Up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
