import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { VscDebugBreakpointData, VscVerifiedFilled } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import ChkeckOutForm from "../Payement/ChkeckOutForm";
import Image from "next/image";
import avatar from "../../../public/assets/banner.png";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setOpen: any;
  setRoute: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuth,
}: Props) => {
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuth(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] mt-20 m-auto py-5 ">
        <div className="w-full flex flex-row 800px:flex-row ">
          <div className="w-[65%] 800px:w-[65%] 800px:pr-5 pr-8">
            <h1
              style={{ fontSize: "20px", fontWeight: 600 }}
              className="font-Poppins "
            >
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3 ">
              <div className="flex items-center">
                <Ratings rating={data.ratings} />
                <h5>{data.reviews?.length} Reviews</h5>
              </div>
              <h5>{data.purchased} Students</h5>
            </div>
            <br />

            <h1
              style={{ fontSize: "20px", fontWeight: 600 }}
              className="font-Poppins "
            >
              What you Will Learn from this course?
            </h1>
            <div>
              {data?.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} color="#00ffcb" />
                  </div>
                  <p className="pl-2 text-white">{item.title}</p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1
              style={{ fontSize: "20px", fontWeight: "600" }}
              className="font-Poppins "
            >
              What are the prerequisites for starting this course?
            </h1>
            {data?.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2 " key={index}>
                <div className="w-[15px] mr-1 ">
                  <IoCheckmarkDoneOutline size={20} color="#00ffcb" />
                </div>
                <p className="pl-2">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1
                style={{ fontSize: "20px", fontWeight: "600" }}
                className="font-Poppins "
              >
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />

            {/* course description */}
            <div className="w-full">
              <h1
                style={{ fontSize: "20px", fontWeight: "600" }}
                className="font-Poppins "
              >
                Course Details
              </h1>
              <p
                style={{ fontSize: "18px", fontWeight: 400 }}
                className=" mt-[20px] whitespace-pre-line w-full overflow-hidden"
              >
                {data?.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex  flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset] " />
                <h5
                  style={{ fontSize: "20px", fontWeight: "600" }}
                  className="font-Poppins "
                >
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[40px] h-[40px] ">
                        <Image
                          src={item.user.avatar ? item.user.avatar.url : avatar}
                          width={50}
                          height={50}
                          alt=""
                          className=" w-[40px] h-[40px] rounded-full object-cover "
                        />
                      </div>
                      <div className="pl-2">
                        <div className="flex item-center">
                          <h5
                            style={{ fontSize: "18px" }}
                            className="uppercase pr-2"
                          >
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p>{item.comment}</p>
                        <small style={{ color: "#ffffff83" }}>
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex ml-16 my-5">
                        <div className="w-[40px] h-[40px]">
                          <Image
                            src={i.user.avatar ? i.user.avatar.url : avatar}
                            width={50}
                            height={50}
                            alt=""
                            className=" w-[40px] h-[40px] rounded-full object-cover "
                          />
                        </div>

                        <div className="pl-2">
                          <div className="flex item-center">
                            <h1 style={{ fontSize: "18px" }}>{i?.user.name}</h1>
                            {i.user.role === "admin" && (
                              <VscVerifiedFilled
                                style={{ fontSize: "20px", color: "blue" }}
                                className="ml-2 mt-1"
                              />
                            )}
                          </div>
                          <p>{i.comment}</p>
                          <small style={{ color: "#ffffff83" }}>
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-[35%] 800px:w-[35%] relative">
            <div className="sticky top-[100px]   z-50 w-full">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

              <div className="flex items-center">
                <h1 style={{ fontSize: "20px" }} className="pt-5">
                  {data.price === 0 ? "Free" : data.price + "$"}
                </h1>
                <h5
                  style={{
                    fontSize: "20px",
                    textDecoration: "line-through",
                    opacity: "0.7",

                    // Adjust color for line-through
                  }}
                  className="pl-3 mt-2"
                >
                  {data?.estimatedPrice + "$"}
                </h5>

                <h4
                  style={{ fontSize: "22px", marginLeft: "10px" }}
                  className="pt-4"
                >
                  {discountPercentagePrice} % Off
                </h4>
              </div>

              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !rounded-[15px] !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson] `}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px]  my-3 font-Poppins cursor-pointer !bg-[crimson] `}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price} $
                  </div>
                )}
              </div>
              <br />
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
          </div>
        </div>
      </div>

      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 z-50 left-0 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl  shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  style={{ color: "black" }}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <ChkeckOutForm setOpen={setOpen} data={data} user={user} />
                </Elements>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
