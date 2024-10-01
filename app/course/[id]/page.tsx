"use client";
import CourseDeatilsPage from "@/app/components/Course/CourseDeatilsPage";
import React from "react";

type Props = {};

const Page = ({ params }: any) => {
  return (
    <div>
      <CourseDeatilsPage id={params.id} />
    </div>
  );
};

export default Page;
