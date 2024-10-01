import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, error, layoutSuccess]);

  console.log(questions);

  const toggleQuestions = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };
  const handleQuestionChange = (id: any, value: string) => {
    // Corrected function name: handleQuetionChange -> handleQuestionChange
    setQuestions(
      (prevQuestions) =>
        prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q)) // Corrected property name: questions -> question
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        _id: uuidv4(), // Generate unique identifier
        questions: "",
        answer: "",
      },
    ]);
  };
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };
  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px] h-screen">
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`border-gray-200 pt-6 ${
                    q._id !== questions[0]?._id ? "border-t" : ""
                  }`}
                >
                  <dt style={{ fontSize: "1.125rem" }}>
                    <button
                      className="flex items-start justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestions(q._id)}
                    >
                      <input
                        style={{ outline: "none" }}
                        className={`${styles.input} !border-none`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder={"Add your questions..."}
                      />
                      <span className="ml-6 flex-shrink-0">
                        {q.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {q.active && (
                    <dd className="mt-2 pr-12">
                      <textarea
                        className={`${styles.input} !border-none !resize-none !h-[50px]`}
                        value={q.answer}
                        onChange={(e: any) =>
                          handleAnswerChange(q._id, e.target.value)
                        }
                        placeholder="Add your answer..."
                        style={{
                          width: "100%",
                          outline: "none",
                        }}
                        rows={5} // Set the number of rows here
                      />
                      <span className="ml-6 flex-shrink-0">
                        <AiOutlineDelete
                          style={{ fontSize: "18px" }}
                          className="cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              style={{ fontSize: "25px" }}
              className="cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] bg-[#cccccc34] ${
              areQuestionsUnchanged(data?.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? "!cursor-not-allowed"
                : "!cursor-pointer !bg-[#42d383]"
            }
    !rounded mt-10 bottom-1 right-12`}
            onClick={
              areQuestionsUnchanged(data?.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
