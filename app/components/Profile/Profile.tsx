"use client";
import React, { FC, useState, useEffect } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsresAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const [courses, setCourses] = useState([]);
  const [active, setActive] = useState(1);
  const { data, isLoading } = useGetUsresAllCoursesQuery(undefined, {});

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
    redirect("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once after component mount

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <>
      <style jsx>{`
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="w-[80%] flex mx-auto h-screen scrollbar-hidden">
        <div
          className={` w-[30%] 800px:w-[310px] h-[450px] bg-slate-900 bg-opacity-90 border border-[#ffffff1d] rounded-[5px] shadow-sm mt-[150px] mb-[80px] sticky ${
            scroll ? "top-[120px]  " : "top-[30px]"
          } left-[30px] `}
        >
          <SideBarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logOutHandler={logOutHandler}
          />
        </div>
        {active === 1 && (
          <div className=" w-full  bg-transparent mt-[80px] ">
            <ProfileInfo avatar={avatar} user={user} />
          </div>
        )}
        {active === 2 && (
          <div className=" w-full bg-transparent mt-[80px] ">
            <ChangePassword />
          </div>
        )}
        {active === 3 && (
          <div className=" spc overflow-y-auto w-full scrollbar-hidden">
            <div className="grid grid-cols-1 gap-[20px]  mb-12 border-0 mt-40 grid-lgw grid-mdw grid-xlw">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard
                    user={user}
                    item={item}
                    key={index}
                    isProfile={true}
                  />
                ))}
            </div>
            {courses.length === 0 && (
              <h1
                style={{ fontSize: "18px" }}
                className="text-center font-Poppins "
              >
                You Dont have any purchased courses...!
              </h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
