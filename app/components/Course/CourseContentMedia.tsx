import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import avatar from "../../../public/assets/banner.png";
import toast from "react-hot-toast";
import {
  useAddAnswerInQuetionMutation,
  useAddNewQuetionMutation,
  useAddReplyinreviewMutation,
  useAddReviewinCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import Ratings from "@/app/utils/Ratings";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");

  const { data: courseData, refetch: courseRefectch } =
    useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });
  const [
    addAnswerInQuetion,
    {
      isSuccess: answerSuccess,
      error: answererror,
      isLoading: answerCreationloading,
    },
  ] = useAddAnswerInQuetionMutation();

  const course = courseData?.course;

  const [
    addNewQuetion,
    { isSuccess, error, isLoading: quetioncreationLoading },
  ] = useAddNewQuetionMutation();

  const isreviewsExists = course?.reviews?.find(
    (item: any) => item.user._id == user._id
  );

  const [
    addReplyinreview,
    {
      isSuccess: replySucces,
      error: replyError,
      isLoading: replycreationLoading,
    },
  ] = useAddReplyinreviewMutation();

  const [
    addReviewinCourse,
    { isSuccess: reviewSuccess, error: reviewerror, isLoading: reviewLoading },
  ] = useAddReviewinCourseMutation();

  const handleQuetion = () => {
    if (question.length === 0) {
      toast.error("Quetion cant be empty");
    } else {
      addNewQuetion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();

      toast.success("Quetion added successfully...!");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new order from ${data[activeVideo].title} `,
        userId: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully...!");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Question reply recive",
          message: `You have a new question reply in ${data[activeVideo].title} `,
          userId: user._id,
        });
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(0);
      courseRefectch();
      toast.success("Review Added successfully...!");
      socketId.emit("notification", {
        title: "New Review Recived",
        message: `${user.name} has given a review in ${data.title} `,
        userId: user._id,
      });
    }
    if (replySucces) {
      setReply("");
      courseRefectch();
      toast.success("Reply Added successfully...!");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;

        toast.error(errorMessage.data.message);
      }
    }
    if (answererror) {
      toast.error("Error while creating review");
    }
    if (reviewerror) {
      toast.error("Error while creating review");
    }
    if (replyError) {
      toast.error("Error while creating review");
    }
  }, [
    isSuccess,
    error,
    answererror,
    answerSuccess,
    reviewerror,
    reviewSuccess,
    replyError,
    replySucces,
  ]);

  const handleAnswerSubmit = async () => {
    try {
      await addAnswerInQuetion({
        answer,
        courseId: id,
        contentId: data[activeVideo]._id,
        questionId: questionId,
      });
      // Clear answer input and refetch data
      setAnswer("");
      refetch();
      toast.success("Answer added successfully!");
    } catch (error) {
      console.error("Error adding answer:", error);
      toast.error("Failed to add answer. Please try again later.");
    }
  };
  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review cant be empty...!");
    } else {
      addReviewinCourse({
        review,
        rating,
        courseId: id,
      });
    }
  };
  const handleReviewreplySubmit = async () => {
    if (!replycreationLoading) {
      if (reply === "") {
        toast.error("Reply cant be empty...!");
      } else {
        addReplyinreview({
          comment: reply,
          courseId: id,
          reviewId,
        });
      }
    }
  };

  return (
    <div className="w-[86%]  800px:w-[86%] py-4 m-auto mt-20 ">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />

      <div className="w-full flex items-center justify-between my-3 ">
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] !px-5 ${
            activeVideo === 0 && "!cursor-no-drop opacity-[0.8]"
          } `}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !w-[unset] !min-h-[40px] !py-[unset] !px-5  ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[0.8]"
          } `}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <AiOutlineArrowRight className="mr-2" />
          Next Lesson
        </div>
      </div>

      <h1 style={{ fontSize: "25px" }} className="pt-2 font-[600]">
        {data[activeVideo]?.title}
      </h1>
      <br />

      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner ">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`cursor-pointer`}
            style={{ color: activeBar === index ? "red" : "inherit" }}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p style={{ fontSize: "18px" }} className="whitespace-pre-line mb-3">
          {data[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 style={{ fontSize: "20px" }}>
                {item.title && item.title + " :"}
              </h2>
              <a
                style={{ color: "blue" }}
                className="inline-block pl-2 "
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className=" w-[50px] h-[50px] rounded-full object-cover "
            />

            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Write your Question..."
              style={{ fontSize: "18px" }}
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full w-[100%] p-2 rounded font-Poppins "
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[120px] !h-[40px] mt-5 ${
                quetioncreationLoading && "cursor-not-allowed"
              } `}
              onClick={quetioncreationLoading ? () => {} : handleQuetion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#fffffe1c] "></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              answerCreationloading={answerCreationloading}
              setQuestionId={setQuestionId}
              questionId={questionId}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isreviewsExists && (
              <>
                <div className="w-full flex">
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    width={50}
                    height={50}
                    alt=""
                    className=" w-[50px] h-[50px] rounded-full object-cover "
                  />
                  <div className="w-full">
                    <h5
                      style={{ fontSize: "20px", fontWeight: 500 }}
                      className="pl-3 "
                    >
                      Give a Rating <span style={{ color: "red" }}>*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      cols={40}
                      rows={5}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Write your Comment..."
                      style={{ fontSize: "18px" }}
                      className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full w-[100%] p-2 rounded font-Poppins "
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${styles.button} !w-[120px] !h-[40px] mt-5 ${
                      reviewLoading && "cursor-not-allowed"
                    }`}
                    onClick={reviewLoading ? () => {} : handleReviewSubmit}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full">
              {(course?.reviews && [...course.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full my-5">
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={item.user.avatar ? item.user.avatar.url : avatar}
                          width={50}
                          height={50}
                          alt=""
                          className=" w-[50px] h-[50px] rounded-full object-cover "
                        />
                      </div>
                      <div className="ml-2">
                        <div className="flex item-center">
                          <h1 style={{ fontSize: "18px" }}>
                            {item?.user.name}
                          </h1>
                          {item.user.role === "admin" && (
                            <VscVerifiedFilled
                              style={{ fontSize: "20px", color: "blue" }}
                              className="ml-2 mt-1"
                            />
                          )}
                        </div>
                        <Ratings rating={item.rating} />
                        <p>{item.comment}</p>
                        <small style={{ color: "#ffffff83" }}>
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>

                    {user.role === "admin" &&
                      item.commentReplies.length !== 0 && (
                        <span
                          className={`${styles.lable} !pl-12 cursor-pointer`}
                          onClick={() => {
                            setIsReviewReply(!isReviewReply);
                            setReviewId(item._id);
                          }}
                        >
                          Add Reply
                        </span>
                      )}

                    {isReviewReply && reviewId === item._id && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          placeholder="Enter your reply..."
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          style={{ outlineStyle: "none" }}
                          className=" ml-12 outline-none bg-transparent border-b border-[#fff] p-[5px] w-[95%] "
                        />
                        <button
                          type="submit"
                          className={`absolute right-0 bottom-1 ${
                            reply === "" || replycreationLoading
                              ? "cursor-not-allowed"
                              : ""
                          }`}
                          onClick={handleReviewreplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex ml-16 my-5">
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={i.user.avatar ? i.user.avatar.url : avatar}
                            width={50}
                            height={50}
                            alt=""
                            className=" w-[50px] h-[50px] rounded-full object-cover "
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
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  setAnswer,
  answer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  questionId,
  answerCreationloading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            user={user}
            index={index}
            setAnswer={setAnswer}
            answer={answer}
            setQuestionId={setQuestionId}
            questionId={questionId}
            answerCreationloadin={answerCreationloading}
            handleAnswerSubmit={handleAnswerSubmit}
          />
        ))}
      </div>
    </>
  );
};
//change

const CommentItem = ({
  data,
  setQuestionId,
  questionId,
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  answerCreationloading,
  user,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);

  const handleReplySubmit = () => {
    toast.error("You cannot add a reply to your own question.");
  };

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={item.user.avatar ? item.user.avatar.url : avatar}
              width={50}
              height={50}
              alt=""
              className=" w-[50px] h-[50px] rounded-full object-cover "
            />
          </div>
          <div className="pl-3">
            <div className="flex items-center">
              <h5 style={{ fontSize: "20px" }}>{item?.user.name}</h5>
              {item.user.role === "admin" && (
                <VscVerifiedFilled
                  style={{ fontSize: "20px", color: "blue" }}
                  className="ml-2 mt-1"
                />
              )}
            </div>

            <p>{item?.question}</p>
            <small style={{ color: "#ffffff83" }}>
              {!item.createdAt ? " " : format(item?.createdAt)}{" "}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            style={{ color: "#ffffff83" }}
            className="cursor-pointer mr-2 pl-16 text-[#ffffff83]"
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Reply"
              : "Hide replies"}
          </span>

          <BiMessage size={20} className="cursor-pointer " fill="#ffffff83" />
          <span
            style={{ color: "#ffffff83" }}
            className="pl-1 cursor-pointer mt-[-4px] "
          >
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((replyItem: any) => (
              <div className="w-full flex ml-20 my-5">
                <div>
                  <Image
                    src={
                      replyItem.user.avatar ? replyItem.user.avatar.url : avatar
                    }
                    width={50}
                    height={50}
                    alt=""
                    className=" w-[40px] h-[40px] rounded-full object-cover "
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 style={{ fontSize: "20px" }}>{replyItem?.user.name}</h5>
                    {replyItem.user.role === "admin" && (
                      <VscVerifiedFilled
                        style={{ fontSize: "20px", color: "blue" }}
                        className="ml-2 mt-1"
                      />
                    )}
                  </div>

                  <p>{replyItem?.answer}</p>
                  <small style={{ color: "#ffffff83" }}>
                    {format(replyItem.createdAt)}
                  </small>
                </div>
              </div>
            ))}

            <>
              {item.user && user && !(item.user._id === user._id) && (
                <div className="w-full flex relative">
                  <input
                    type="text"
                    placeholder="Enter your anwer..."
                    value={answer}
                    style={{ outlineStyle: "none" }}
                    onChange={(e: any) => setAnswer(e.target.value)}
                    className=" ml-12 outline-none bg-transparent border-b border-[#fff] p-[5px] w-[95%] "
                  />
                  <button
                    type="submit"
                    onClick={handleAnswerSubmit}
                    disabled={answer === "" || answerCreationloading}
                    className={`absolute right-0 bottom-1 ${
                      answer === "" || answerCreationloading
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Submit
                  </button>
                </div>
              )}
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
