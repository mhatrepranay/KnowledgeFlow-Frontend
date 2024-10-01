import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import "./component.css";

type Props = {
  item: any;
  isProfile?: boolean;
  user?: any;
};

const CourseCard: FC<Props> = ({ item, isProfile, user }) => {
  const discountPercentage =
    ((item?.estimatedPrice - item?.price) / item?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  return (
    <Link
      id="Card"
      href={isProfile ? `course-access/${item._id}` : `course/${item._id}`}
    >
      <div
        style={{
          background: "transparent",
          backdropFilter: "blur(10px)",
        }}
        className="w-full min-h-[35vh]  bg-opacity-10   border border-[#ffffff1d] shadow-[bg-slate-700] rounded-lg p-3 shadow-inner  "
      >
        <div
          className={`relative overflow-hidden ${
            isProfile ? "w-[250px] h-[250px]" : "w-[300px] h-[300px]"
          }`}
        >
          <Image
            src={item.thumbnail.url}
            width={300}
            height={300}
            objectFit="contain"
            className="rounded-lg w-full  pr-5"
            alt=""
          />
        </div>

        <br />
        <h1 style={{ fontSize: "16px" }} className="font-Poppins break-words  ">
          {item.name}
        </h1>
        <div className="w-full flex  items-start justify-between pt-2">
          <Ratings rating={item.ratings} />
          <h5 className={`${isProfile && "inline 800px:inline"}`}>
            {item.purchased} Students
          </h5>
        </div>

        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3>{item.price === 0 ? "Free" : item.price + "$"}</h3>
            <h5
              style={{
                fontSize: "15px",
                color: "white",
                textDecoration: "line-through",
                opacity: "0.7",
                marginLeft: "5px",
                marginTop: "-5px",
              }}
            >
              {item.estimatedPrice + "$"}
            </h5>
            <h4
              style={{
                fontWeight: 500,
                color: "#20ff20",
                fontSize: "14px",
                marginLeft: "10px",
                marginTop: "-5px",
              }}
            >
              {discountPercentagePrice} % Off
            </h4>
          </div>

          <div className="flex items-center pb-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 ">{item.courseData?.length} Lectures</h5>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default CourseCard;
