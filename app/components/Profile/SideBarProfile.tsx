"use client";
import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/profile.png";
import { RiLockPasswordFill } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";
import "./Profile.css";
import { IoCalendarSharp } from "react-icons/io5";
import { PiPathBold } from "react-icons/pi";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          width={20}
          height={20}
          style={{
            border: "3px solid #72f1ea",
          }}
          className=" w-[40px] h-[40px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full "
        />
        <h5 className=" pl-2 800px:block font-Poppins text-white ">
          My account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordFill size={20} fill="#fff" />
        <h5 className=" pl-2 800px:block font-Poppins text-white">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} fill="#fff" />
        <h5 className=" pl-2 800px:block font-Poppins text-white">
          Enrolled Courses
        </h5>
      </div>
      <Link
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(4)}
        href={"/calendar"}
      >
        <IoCalendarSharp size={20} fill="#fff" />
        <h5 className=" pl-2 800px:block font-Poppins text-white">PlanHub</h5>
      </Link>

      <Link
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 5 ? "bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => setActive(5)}
        href="http://127.0.0.1:5000/"
      >
        <PiPathBold size={20} fill="#fff" />
        <h5 className=" pl-2 800px:block font-Poppins text-white">
          PathGuide Mentor
        </h5>
      </Link>

      {user.role == "admin" && (
        <Link
          id="admin"
          className={`w-full flex items-center px-3 py-4 cursor-pointer ${
            active === 7 ? "bg-slate-800" : "bg-transparent"
          } `}
          href={"/admin/create-course"}
        >
          <MdAdminPanelSettings size={20} fill="#fff" />
          <h5 className=" pl-2 800px:block font-Poppins text-white">
            Admin Dashboard
          </h5>
        </Link>
      )}

      <div
        id="logout"
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 6 ? "bg-slate-800" : "bg-transparent"
        } `}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} fill="#fff" />
        <h5 className=" pl-2 800px:block font-Poppins text-white">Log Out</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
