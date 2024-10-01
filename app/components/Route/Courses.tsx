import { useGetUsresAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState, useRef } from "react";
import CourseCard from "../Course/CourseCard";
import "./route.css";

type Props = {};

const Courses = (props: Props) => {
  const { data, isLoading } = useGetUsresAllCoursesQuery({});
  const [courses, setCourses] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const courseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      if (courseRef.current) {
        const scrollTop = window.scrollY;
        const courseOffset = courseRef.current.offsetTop;
        const windowHeight = window.innerHeight;

        // Check if the course component is in the viewport
        const isCourseVisible =
          scrollTop + windowHeight > courseOffset &&
          scrollTop < courseOffset + courseRef.current.clientHeight;

        setIsVisible(isCourseVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on initial render
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div
        ref={courseRef}
        id="course"
        className={`w-[90%] 800px:w-[80%] m-auto ${isVisible ? "fade-in" : ""}`}
      >
        <h1
          style={{ fontSize: "35px", fontWeight: 400 }}
          className="text-center font-Poppins leading-[25px] sm:text-3xl lg:text-4xl 800px:!leading-[60px]  traking-tight"
        >
          Expand Your Career{" "}
          <span
            style={{
              fontWeight: 500,
              fontSize: "35px",
              background: "-webkit-linear-gradient(#57e2e0, #920ad7)",
              WebkitBackgroundClip: "text", // Note: camelCased
              WebkitTextFillColor: "transparent", // Note: camelCased
            }}
          >
            Opportunity{" "}
          </span>
          <br />
          With Our Courses
        </h1>

        <br />
        <br />

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-1 1500px:gap-[35px] mb-12 border-0 grid-xl grid-lg .grid-md ">
          {courses &&
            courses.map((item: any, index: number) => (
              <CourseCard item={item} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
