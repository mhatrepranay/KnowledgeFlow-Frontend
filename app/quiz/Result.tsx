import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

interface ResultProps {
  totalMarks: number;
  totalQuestions: number;
  totalAttempts: number;
  earnedMarks: number;
  passResult: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Result: React.FC<ResultProps> = ({
  totalMarks,
  totalQuestions,
  totalAttempts,
  earnedMarks,
  passResult,
  setSubmitted,
  setUserAnswers,
  setCurrentQuestionIndex,
}) => {
  const [showResult, setShowResult] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false); // Control confetti visibility
  const { data: userData } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (passResult && !showConfetti) {
      setShowConfetti(true); // Show confetti when passing
      // Set a timer to hide confetti after 10 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
        console.log("timeout");
      }, 5000); // 10,000 milliseconds = 10 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [passResult, showConfetti]); // Dependency on passResult and showConfetti

  const clearResult = () => {
    localStorage.removeItem("quizResult");
    setShowResult(false);
    setSubmitted(false);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setShowConfetti(false); // Reset confetti when result is cleared
  };

  return (
    <div className="result-container">
      {showConfetti && <Confetti />} {/* Conditionally show confetti */}
      {showResult ? (
        <>
          <div className="result-details">
            <h1 style={{ color: "yellow" }}>
              {`Hello ${userData?.user?.name ?? "User"}`}
            </h1>
            <br />
            <table>
              <tbody>
                <tr>
                  <th>Result Summary</th>
                </tr>
                <tr>
                  <td>Total Quiz Points:</td>
                  <td>{totalMarks}</td>
                </tr>
                <tr>
                  <td>Total Questions:</td>
                  <td>{totalQuestions}</td>
                </tr>
                <tr>
                  <td>Total Questions Attempted:</td>
                  <td>{totalAttempts}</td>
                </tr>
                <tr>
                  <td>Total Earned Points:</td>
                  <td>{earnedMarks}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ color: passResult ? "green" : "red" }}>
            Result: {passResult ? "Pass" : "Fail"}
          </p>

          <button onClick={clearResult}>Clear Result</button>
        </>
      ) : (
        <p>Quiz result will be displayed here after completing the quiz.</p>
      )}
    </div>
  );
};

export default Result;
