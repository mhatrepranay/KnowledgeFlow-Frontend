"use client";
import React from "react";
import Heading from "../../../utils/Heading";
import Sidebar from "../../../components/Admin/Sidebar/Adminsidebar";
import EditCourse from "../../../components/Admin/Course/EditCourse";

import DadshbordHeader from "../../../components/Admin/DadshbordHeader";
import AdminProtected from "@/app/hooks/adminProtected";

type Props = {};

const page = ({params}:any) => {

    const id=params?.id;
    


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
            <DadshbordHeader />
            {/* <CreateCourse /> */}
            <EditCourse  id={id}/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
