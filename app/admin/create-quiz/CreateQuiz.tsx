import React, { useEffect, useState } from "react";
import {
  useCreateQuestionsMutation,
  useGetAllQuestionQuery,
} from "@/redux/features/questions/questionApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Loader from "@/app/components/Loader/Loader";
import { MdDeleteOutline } from "react-icons/md";

const CreateQuiz: React.FC = () => {
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [""],
      correctAnswer: 0,
      courseId: "",
    },
  ]);

  // Use RTK mutation hook for creating questions
  const [createQuestionMutation, { isLoading, isError: error, isSuccess }] =
    useCreateQuestionsMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Question Created Successfully");
    }
    if (error) {
      toast.error("Error while creating Questions");
    }
  }, [isSuccess, error]);

  // Use RTK query hook for fetching all questions
  const {
    data: allQuestions,
    isLoading: questionsLoading,
    isError: questionsError,
  } = useGetAllQuestionQuery({});

  const handleCreateQuiz = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call mutation to create new quiz
    questions.forEach((question) => {
      createQuestionMutation(question);
    });
    setQuestions([
      ...questions,
      {
        question: "",
        options: [""],
        correctAnswer: 0,
        courseId: "",
      },
    ]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    if (optionIndex < 4) {
      // Limit options to 4
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].options[optionIndex] = value;
      setQuestions(updatedQuestions);
    }
  };

  const handleCorrectAnswerChange = (index: number, value: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const handleCourseIdChange = (index: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].courseId = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: [""],
        correctAnswer: 0,
        courseId: "",
      },
    ]);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-[100%] ml-20 mt- w-[85%]">
          <h1 className={styles.title} style={{ fontSize: "30px" }}>
            Create New Quiz
          </h1>
          <form onSubmit={handleCreateQuiz}>
            {questions.map((question, index) => (
              <div key={index} className="my-6 border-b pb-6">
                <div className="flex justify-between items-center">
                  <h2 className={styles.title}>Question {index + 1}</h2>
                  {index !== 0 && (
                    <button
                      className={`  !py-1 !px-3`}
                      type="button"
                      onClick={() => deleteQuestion(index)}
                    >
                      <MdDeleteOutline size={30} />
                    </button>
                  )}
                </div>
                <div>
                  <label className={styles.title}>Question:</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className={styles.title}>Options:</label>
                  {question.options.map((option, optionIndex) => (
                    <input
                      key={optionIndex}
                      className={styles.input}
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, optionIndex, e.target.value)
                      }
                    />
                  ))}
                  <button
                    className={`${styles.button} mt-2 !w-[100px] !h-[5px] !py-1 !rounded-[5px] !bg-[#001636] `}
                    type="button"
                    onClick={() => {
                      if (question.options.length < 4) {
                        // Limit adding options to 4
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].options.push("");
                        setQuestions(updatedQuestions);
                      }
                    }}
                  >
                    Add Option
                  </button>
                </div>
                <div>
                  <label className={styles.title}>Correct Answer:</label>
                  <input
                    className={styles.input}
                    type="number"
                    value={question.correctAnswer}
                    onChange={(e) =>
                      handleCorrectAnswerChange(index, parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <label className={styles.title}>Course ID:</label>
                  <input
                    className={styles.input}
                    type="text"
                    value={question.courseId}
                    onChange={(e) =>
                      handleCourseIdChange(index, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <button
              className={`${styles.button} mt-2 !w-[150px] !h-[5px] !py-1 !rounded-[5px] !bg-[#001636] `}
              type="button"
              onClick={addQuestion}
            >
              Add Question
            </button>
            <button
              className={`${styles.button}  mt-4 !bg-[#001636]`}
              type="submit"
            >
              Create Quiz
            </button>
            <br />
            <br />
            <br />
            <br />
          </form>
          {isLoading && <div>Loading...</div>}
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
