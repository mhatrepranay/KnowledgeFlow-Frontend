"use client";
import React, { FC } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../../app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { VscDebugBreakpointData } from "react-icons/vsc";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
  videoUrl?: string;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
  videoUrl,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[70%] m-auto py-5 mb-5 ">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          {courseData?.price === 0 ? (
            <h1 className="pt-5" style={{ fontSize: "25px", color: "#00cc00" }}>
              Free
            </h1>
          ) : (
            <h1 className="pt-5" style={{ fontSize: "25px" }}>
              {courseData?.price + "$"}
            </h1>
          )}
          <h5
            style={{
              fontSize: "20px",
              textDecoration: "line-through",
              opacity: "0.7",
              marginTop: "10px",
              paddingLeft: "10px",
              // Adjust color for line-through
            }}
          >
            {courseData?.estimatedPrice + "$"}
          </h5>
          <h4 style={{ fontSize: "24px", marginLeft: "10px" }} className="pt-4">
            {discountPercentagePrice} % Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} my-3 !w-[180px] font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price} $
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discountt code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0 `}
          />
          <div
            className={`${styles.button} my-3 ml-4 !w-[120px] font-Poppins  cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <div className="pb-2 flex items-center">
          <VscDebugBreakpointData color="#ff8787" size={20} />
          <span className="ml-1">Souce code included</span>
        </div>
        <div className="pb-2 flex items-center">
          <VscDebugBreakpointData color="#ff8787" size={20} />
          <span className="ml-1">Full lifetime access</span>
        </div>

        <div className="pb-2 flex items-center">
          <VscDebugBreakpointData color="#ff8787" size={20} />
          <span className="ml-1">Certificate of complition</span>
        </div>

        <div className="pb-2 flex items-center">
          <VscDebugBreakpointData color="#ff8787" size={20} />
          <span className="ml-1">Premium support</span>
        </div>
      </div>
      <br />
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1
            style={{ fontSize: "25px", fontWeight: "600" }}
            className="font-Poppins "
          >
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1
            style={{ fontSize: "25px", fontWeight: "600" }}
            className="font-Poppins "
          >
            What you will learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2 " key={index}>
            <div className="w-[15px] mr-1 ">
              <IoCheckmarkDoneOutline size={20} color="#00ffcb" />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1
          style={{ fontSize: "25px", fontWeight: "600" }}
          className="font-Poppins "
        >
          What are the prerequisites for starting this course?
        </h1>
        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2 " key={index}>
            <div className="w-[15px] mr-1 ">
              <IoCheckmarkDoneOutline size={20} color="#00ffcb" />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />

        <div className="w-full">
          <h1
            style={{ fontSize: "25px", fontWeight: "600" }}
            className="font-Poppins "
          >
            Coourse Deatils
          </h1>
          <p
            style={{ fontSize: "18px" }}
            className=" mt-[20px] whitespace-pre-line w-full overflow-hidden"
          >
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-[180px] 800px:[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-[180px] 800px:[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          {isEdit ? "Update" : "Create"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
