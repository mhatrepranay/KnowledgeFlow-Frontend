"use client";
import { styles } from "@/app/styles/style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React, { FC } from "react";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits]; // Create a new array
    updatedBenefits[index] = { title: value }; // Update the specific element
    setBenefits(updatedBenefits); // Update the state
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handleDeleteBenefit = (index: number) => {
    if (index !== 0) {
      const updatedBenefits = [...benefits];
      updatedBenefits.splice(index, 1);
      setBenefits(updatedBenefits);
    }
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites]; // Create a new array
    updatedPrerequisites[index] = { title: value }; // Update the specific element
    setPrerequisites(updatedPrerequisites); // Update the state
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleDeletePrerequisites = (index: number) => {
    if (index !== 0) {
      const updatedPrerequisites = [...prerequisites];
      updatedPrerequisites.splice(index, 1);
      setPrerequisites(updatedPrerequisites);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to go to next!");
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 block ">
      <div>
        <label className={`${styles.lable}`} htmlFor="benefits">
          What are the benefits for you in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <div className="relative" key={index}>
            <input
              type="text"
              name="benefits"
              placeholder="You will able to learn all the 4 technologies ..."
              required
              className={`${styles.input} my-2 pl-8 pr-2`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
            {index !== 0 && ( // Render delete icon for all entries except the first one
              <DeleteOutlineIcon
                className="absolute mt-5 right-0 cursor-pointer"
                onClick={() => handleDeleteBenefit(index)}
              />
            )}
          </div>
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px ", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label className={`${styles.lable}`} htmlFor="prerequisites">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <div className="relative" key={index}>
            <input
              type="text"
              name="prerequisites"
              placeholder="You need basic knowledge of web dev"
              required
              className={`${styles.input} my-2 pl-8 pr-2`}
              value={prerequisite.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
            {index !== 0 && ( // Render delete icon for all entries except the first one
              <DeleteOutlineIcon
                className="absolute mt-5 right-0 cursor-pointer"
                onClick={() => handleDeletePrerequisites(index)}
              />
            )}
          </div>
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px ", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
