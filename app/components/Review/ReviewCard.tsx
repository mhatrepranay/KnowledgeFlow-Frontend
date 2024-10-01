import Ratings from "@/app/utils/Ratings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
};

const ReviewCard = (props: Props) => {
  return (
    <div className="w-full h-max bg-slate-500 bg-opacity-20 backdrop-blur border border-[#ffffff1d] shadow-[bg-slate-700] rounded-lg p-3 shadow-inner ">
      <div className="flex w-full">
        <Image
          src={props.item.avatar}
          width={100}
          height={100}
          className="w-[100px] h-[100px] rounded-full object-cover"
          alt=""
        />
        <div className="800px:flex justify-between w-full">
          <div className="pl-4">
            <h5 style={{ fontSize: "20px" }}>{props.item.name}</h5>
            <h6 style={{ fontSize: "16px" }}>{props.item.profession}</h6>
          </div>
        </div>
        <Ratings rating={5} />
      </div>
      <p className="pt-2 px-2 font-Poppins ">{props.item.comment}</p>
    </div>
  );
};

export default ReviewCard;
