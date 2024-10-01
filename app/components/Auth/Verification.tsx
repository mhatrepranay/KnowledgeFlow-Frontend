"use client";
import { styles } from "../../../app/styles/style";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import "./auth.css";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  console.log("token=", token); // Ensure token retrieval is correct
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occurred", error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token, // Ensure token is correctly passed
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#4970f2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>

      <br />
      <div
        style={{ margin: "auto" }}
        className="m-auto flex items-center justify-around"
      >
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={` try w-[65px] h-[65px] bg-transparent border-[3px]  flex items-center text-white justify-center font-Poppins text-center ${
              invalidError ? "shake border-red-500" : "border-white"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            style={{
              marginRight: index < 3 ? "25px" : 0,
              fontSize: "18px",
              outline: "none",
            }}
          />
        ))}
      </div>
      <br />
      <div className="w-full flex justify-center">
        <button className={` ${styles.button}`} onClick={verificationHandler}>
          {" "}
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-2 font-Poppins text-white">
        Go back to sign in ?
        <span
          style={{ color: "#5698e4" }}
          className=" pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;
