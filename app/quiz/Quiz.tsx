import React, { useState, useEffect } from "react";
import Question from "./Question";
import { useGetAllQuestionQuery } from "@/redux/features/questions/questionApi";
import "./quiz.css"; // Import CSS file for styling
import html2canvas from "html2canvas";
import { TbCaptureFilled } from "react-icons/tb";
import Result from "./Result"; // Import the Result component
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../components/Loader/Loader";
import Link from "next/link";
import { styles } from "../styles/style";
import { RiArrowLeftSLine } from "react-icons/ri";

interface QuestionType {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  courseId: string;
}

interface Props {
  courseId1: string | string[] | undefined;
}

const Quiz: React.FC<Props> = ({ courseId1 }) => {
  const { data: questionsData, error, isLoading } = useGetAllQuestionQuery({});
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const { data: cdata } = useGetCourseDetailsQuery(courseId1);

  useEffect(() => {
    if (questionsData) {
      // Filter questions based on courseId
      const filteredQuestions = (questionsData as QuestionType[]).filter(
        (question) => question.courseId === courseId1
      );
      setQuestions(filteredQuestions);
    }
  }, [questionsData]);

  const handleOptionChange = (index: number, optionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = optionIndex;
    setUserAnswers(updatedAnswers);
  };

  const calculateResult = () => {
    const totalQuestions = questions.length;
    const totalAttempts = userAnswers.filter(
      (answer) => answer !== null
    ).length; // Count only non-null answers
    const totalMarks = totalQuestions * 10;
    const earnedMarks = userAnswers.reduce((acc, answer, index) => {
      const isCorrect = answer === questions[index].correctAnswer;
      return isCorrect ? acc + 10 : acc;
    }, 0);
    const passResult = earnedMarks >= totalMarks / 2;

    return {
      totalMarks,
      totalQuestions,
      totalAttempts,
      earnedMarks,
      passResult,
    };
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  if (error) return <div className="error">Error: An error occurred</div>;

  const result = calculateResult();
  const currentQuestion = questions[currentQuestionIndex];
  const captureScreenshot = () => {
    // Capture screenshot of the entire document body
    html2canvas(document.body).then(function (canvas: any) {
      // Convert canvas to image data URL
      const imageData = canvas.toDataURL("image/png");

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = imageData;
      link.download = "screenshot.png"; // Set download attribute to specify filename
      link.click(); // Simulate click on the link to download the screenshot
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="quiz-container mt-20">
            <div className="header-container">
              <div className="back-button">
                <Link href={`/course-access/${courseId1}`}>
                  <RiArrowLeftSLine
                    className="mt-[-10px] "
                    style={{ fontSize: "60px", color: "white" }}
                  />
                </Link>
              </div>
              {questions.length > 0 && (
                <h1 className="quiz-title">
                  {submitted
                    ? "Result"
                    : `Solve The Quiz On ${cdata?.course?.name}`}
                </h1>
              )}
            </div>

            {submitted ? (
              <>
                <Result
                  {...result}
                  setSubmitted={setSubmitted}
                  setUserAnswers={setUserAnswers}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                />{" "}
                {/* Render the Result component */}
                {/* <button onClick={captureScreenshot}>
                  <TbCaptureFilled
                    className="ml-20"
                    style={{ fontSize: "30px", color: "red" }}
                  />
                </button> */}
              </>
            ) : (
              <>
                {questions.length > 0 ? (
                  <div className="question-container">
                    {currentQuestion && (
                      <Question
                        key={currentQuestion._id}
                        index={currentQuestionIndex}
                        question={currentQuestion}
                        selectedOption={userAnswers[currentQuestionIndex]}
                        handleOptionChange={handleOptionChange}
                      />
                    )}
                    <div className="button-container">
                      {!(currentQuestionIndex === 0) && (
                        <button
                          className="navigation-button"
                          onClick={goToPrevQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          Previous
                        </button>
                      )}
                      {!(currentQuestionIndex === questions.length - 1) && (
                        <button
                          className="navigation-button"
                          onClick={goToNextQuestion}
                          disabled={
                            currentQuestionIndex === questions.length - 1
                          }
                        >
                          Next
                        </button>
                      )}

                      {currentQuestionIndex === questions.length - 1 && (
                        <button
                          className="submit-button"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h1 style={{ fontSize: "30px", color: "#dd8585" }}>
                      The quiz for this course has not yet been uploaded. Please
                      try again later.
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Quiz;
