"use client";
import React, { useState } from "react";
import Heading from "../../utils/Heading";
import Sidebar from "../../components/Admin/Sidebar/Adminsidebar";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DadshbordHeader from "../../components/Admin/DadshbordHeader";
import AdminProtected from "@/app/hooks/adminProtected";

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
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <Sidebar />
          </div>
          <div className="w-[85%] ">
            <DadshbordHeader open={open} setOpen={setOpen} />
            <CreateCourse />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
