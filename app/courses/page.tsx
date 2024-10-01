"use client";

import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import { useGetUsresAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import "./course.css";
import Footer from "../components/Footer";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const search1 = searchParams?.get("title1");
  const { data, isLoading } = useGetUsresAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const [ttsSpoken, setTtsSpoken] = useState(false); // TTS flag

  const handleTextToSpeech = (text: string) => {
    if ("speechSynthesis" in window && !ttsSpoken) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setTtsSpoken(true); // Update flag once TTS completes
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    let filteredCourses = data?.courses;

    if (category !== "All") {
      filteredCourses = filteredCourses?.filter(
        (item: any) => item.categories === category
      );
    }

    if (search) {
      filteredCourses = filteredCourses?.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (search1) {
      filteredCourses = filteredCourses?.filter((item: any) =>
        item.name.toLowerCase().includes(search1.toLowerCase())
      );
    }

    setCourses(filteredCourses);

    if (!ttsSpoken && search1) {
      const ttsText = filteredCourses?.length
        ? `Found ${filteredCourses.length} courses for "${search1}"`
        : `No courses found for "${search1}"`;
      handleTextToSpeech(ttsText);
      setTtsSpoken(true);
    }
  }, [data, category, search, search1]); // Removed `ttsSpoken` to prevent re-trigger

  const categories = categoriesData?.layout?.categories;

  return (
    <div>
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

          <div className=" mt-20 w-[95%] 800px:w-[85%] m-auto min-h-[70vh] h-screen ">
            <Heading
              title="All Courses-KnowledgeFlow"
              description="My new project ULMS"
              keywords="programing,react,next"
            />
            <br />
            <div className="w-full flex items-center flex-wrap ">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#0d8050]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                onClick={() => setCategory("All")}
              >
                All
              </div>

              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#0d8050]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer `}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${styles.lable} justify-center min-h-[50vh] flex items-center `}
              >
                {search || search1
                  ? `"${search || search1}" This Course Not found`
                  : "No courses found in this category .Plese try another"}
              </p>
            )}
            <br />
            <br />

            <div className="  h-full scrollbar-hidden grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-1 1500px:gap-[35px] mb-12 border-0 grid-xl grid-lg .grid-md ">
              {courses &&
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default page;
