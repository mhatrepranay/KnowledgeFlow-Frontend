"use client";
import React from "react";
import Heading from "../../utils/Heading";
import Sidebar from "../../components/Admin/Sidebar/Adminsidebar";
import UserAnalytics from "../../components/Admin/Analytics/UserAnalytics";
import DadshbordHeader from "../../components/Admin/DadshbordHeader";
import AdminProtected from "@/app/hooks/adminProtected";

type Props = {};

const page = (props: Props) => {
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
            <UserAnalytics />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
