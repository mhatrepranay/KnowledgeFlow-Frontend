"use client";
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/profile.png";
import { useSession } from "next-auth/react";
import "./Header.css";

import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface Props {
  activeItem: number;
  setOpen: (open: boolean) => void;
  route: string;
  open: boolean;
  setRoute: (route: string) => void;
}

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const { user } = useSelector((state: any) => state.auth);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const { isError } = useLogOutQuery(undefined, {
    skip: !logout,
  });

  useEffect(() => {
    if (!userData) {
      if (data) {
        socialAuth({
          email: data?.user?.email,
          name: data?.user?.name,
          avatar: data?.user?.image,
        });
        refetch();
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
    if (data === null && !isLoading && !userData) {
      setLogout(true);
    }
  }, [data, userData, isSuccess, isError]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(true);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  const logOutHandler = () => {
    setLogout(true);
  };

  useEffect(() => {
    if (!logout) {
      return;
    }
  }, [logout]);

  const navItemsData = [
    { name: "Home", url: "/" },
    { name: "Courses", url: "/courses" },
    { name: "About", url: "/about" },
    { name: "Policy", url: "/policy" },
    { name: "FAQ", url: "/FAQ" },
    { name: "News", url: "/News" },
    { name: "Resume", url: "/resume" },
  ];

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "bg-opacity-50 bg-gradient-to-b from-gray-900 to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b border-[#ffffff1c] h-[80px] z-[80] shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link href={"/"}>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "35px",
                    background: "-webkit-linear-gradient(#fff,#4f83c9)",
                    WebkitBackgroundClip: "text", // Note: camelCased
                    WebkitTextFillColor: "transparent", // Note: camelCased
                  }}
                >
                  HireHub{" "}
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              {!isMobile && (
                <>
                  <div
                    style={{ display: "flex", alignItems: "center" }}
                    className="800px:hidden"
                  >
                    {navItemsData.map((item, index) => (
                      <>
                        <Link href={item.url} key={index}>
                          <span
                            style={{
                              fontSize: "18px",
                              color: activeItem === index ? "#37a39a" : "white",
                            }}
                            className={`${
                              activeItem === index
                                ? "text-[#37a39a]"
                                : "text-black"
                            } text-18px px-6 font-Poppins font-400`}
                          >
                            {item.name}
                          </span>
                        </Link>
                        {item.name === "News" && (
                          <span
                            style={{
                              color: "red",
                              fontSize: "50px",
                              marginLeft: "-23px",
                              marginRight: "15px",
                              marginTop: "-20px",
                              animation: "blink 3s infinite", // Apply blinking animation
                            }}
                          >
                            •
                          </span>
                        )}
                      </>
                    ))}
                  </div>
                  {userData ? (
                    <Link id="profile" href={"/profile"}>
                      <Image
                        src={
                          userData?.user.avatar
                            ? userData.user.avatar.url
                            : avatar
                        }
                        alt=""
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px] rounded-full "
                        style={{
                          border:
                            activeItem === 7 ? "3px solid #72f1ea" : "none",
                        }}
                      />
                    </Link>
                  ) : (
                    <HiOutlineUserCircle
                      size={25}
                      className="cursor-pointer text-white ml-4"
                      onClick={() => setOpen(true)}
                    />
                  )}
                </>
              )}

              {isMobile && (
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer text-white ml-4"
                  onClick={() => setOpenSidebar(true)}
                />
              )}
            </div>
          </div>

          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999] bg-[#55545400]"
              onClick={handleClose}
              id="screen"
            >
              <div className="w-3/4 fixed z-[999999999] h-screen bg-slate-900 bg-opacity-90 top-0 right-0">
                {navItemsData.map((item, index) => (
                  <Link href={item.url} key={index}>
                    <span
                      style={{
                        fontSize: "20px",
                        color: activeItem === index ? "#37a39a" : "white",
                      }}
                      className={`${
                        activeItem === index
                          ? "dark:text-[#37a39a] text-[crimson]"
                          : "dark:text-white text-black"
                      } block text-20px px-6 py-3 font-Poppins font-400`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                {userData ? (
                  <Link id="profile" href={"/profile"}>
                    <Image
                      src={
                        userData?.user.avatar
                          ? userData.user.avatar.url
                          : avatar
                      }
                      alt=""
                      width={30}
                      height={30}
                      className="w-[40px] h-[40px] rounded-full ml-5 "
                      style={{
                        border: activeItem === 7 ? "3px solid #72f1ea" : "none",
                      }}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer text-white ml-4"
                    onClick={() => setOpen(true)}
                  />
                )}

                <br />
                <br />
                <p
                  style={{
                    fontSize: "18px",
                  }}
                  className="text-[16px] px-2 pl-5 text-black"
                >
                  &copy; 2024 KnowledgeFlow. All rights reserved.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              refetch={refetch}
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}{" "}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
