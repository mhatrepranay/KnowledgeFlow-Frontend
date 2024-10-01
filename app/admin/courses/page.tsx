"use client";
import AllCourses from "@/app/components/Admin/Course/AllCourses";
import DadshbordHeader from "@/app/components/Admin/DadshbordHeader";
 import Sidebar from "@/app/components/Admin/Sidebar/Adminsidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ULMP -Admin"
          description="my new project lms"
          keywords="programing,react,next"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5 ">
            <Sidebar />
          </div>
          <div className="w-[85%] ">
          <DadshbordHeader open={open} setOpen={setOpen} />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
