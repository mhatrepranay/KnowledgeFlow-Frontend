// Question.tsx
import React from "react";
import "./quiz.css";

interface QuestionProps {
  index: number;
  question: {
    question: string;
    options: string[];
  };
  selectedOption: number | null;
  handleOptionChange: (index: number, optionIndex: number) => void;
}

const Question: React.FC<QuestionProps> = ({
  index,
  question,
  selectedOption,
  handleOptionChange,
}) => {
  return (
    <div>
      <h2
        style={{ fontSize: "30px", color: "white" }}
        className="font-Poppins pb-5"
      >
        {`${index + 1} . ${question.question}`}
      </h2>
      <ul style={{ fontSize: "25px", color: "white" }}>
        {question.options.map((option, optionIndex) => (
          <React.Fragment key={optionIndex}>
            <li className="pt-5">
              <input
                className="col11"
                type="radio"
                id={`option-${index}-${optionIndex}`}
                name={`question-${index}`}
                value={optionIndex}
                checked={selectedOption === optionIndex}
                onChange={() => handleOptionChange(index, optionIndex)}
              />
              <label
                className="pl-3"
                htmlFor={`option-${index}-${optionIndex}`}
              >
                {option}
              </label>
            </li>
            <hr className="dotted-line" />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Question;
