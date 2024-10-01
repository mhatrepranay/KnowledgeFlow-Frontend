import {
  useGetCourseContentQuery,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";
import Link from "next/link";
import { LiaClipboardListSolid } from "react-icons/lia";

type Props = {
  id: string;
  user: any;
};

function CourseContent({ id, user }: Props) {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const { data: cdata } = useGetCourseDetailsQuery(id);
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />

          <div className="w-full  grid grid-cols-10 800px:grid-cols-10 ">
            <Heading
              title={data[activeVideo]?.title}
              description="Nothing"
              keywords={data[activeVideo]?.tags}
            />

            <div className="col-span-7 ">
              <CourseContentMedia
                data={data}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="   800px:block  mt-20 col-span-3 800px:col-span-3 ">
              <CourseContentList
                setActiveVedio={setActiveVideo}
                data={data}
                activeVideo={activeVideo}
              />

              <h1 style={{ fontSize: "20px" }} className="mt-10  ">
                {`Solve The Quiz of ${cdata.course.name}`}{" "}
              </h1>
              <Link
                style={{
                  fontSize: "30px",
                  display: "flex",
                  justifyItems: "between",
                  marginTop: "30px",
                }}
                href={`/quiz?courseId=${id}`}
              >
                <LiaClipboardListSolid
                  style={{
                    fontSize: "50px",
                    marginLeft: "5px",
                    color: "violet",
                  }}
                />{" "}
                Test
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default CourseContent;
