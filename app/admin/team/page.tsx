"use client";
import AllUsers from "../../components/Admin/Users/AllUsers";
import DashbordHero from "@/app/components/Admin/DashbordHero";
import Sidebar from "@/app/components/Admin/Sidebar/Adminsidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

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
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5 ">
            <Sidebar />
          </div>
          <div className="w-[85%] ">
            <DashbordHero />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
