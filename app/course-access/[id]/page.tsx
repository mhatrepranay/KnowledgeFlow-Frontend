"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "@/app/components/Loader/Loader";

import CourseContent from "../../components/Course/CourseContent";
import Footer from "@/app/components/Footer";

type Props = {
  params: any;
};

const page = ({ params }: Props) => {
  const id = params.id;

  const { isLoading, error, data } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data?.user?.courses.find(
        (item: any) => item._id === id
      );

      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mb-10">
          <CourseContent id={id} user={data?.user} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default page;
