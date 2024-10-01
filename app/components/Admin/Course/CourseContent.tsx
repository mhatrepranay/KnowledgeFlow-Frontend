"use client";
import { styles } from "@/app/styles/style";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapse, setIsCollapse] = useState(
    Array(courseContentData.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const handleSubmit = (e: any) => {
    e.preventDefalt();
  };
  const handleCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapse];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapse(updateCollapsed);
  };
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = courseContentData.map((item: any, i: number) => {
      if (i === index) {
        const updatedLinks = item.links.filter(
          (_link: any, j: number) => j !== linkIndex
        );
        return { ...item, links: updatedLinks };
      }
      return item;
    });
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const lastLink =
      courseContentData[index].links[courseContentData[index].links.length - 1];
    if (lastLink.title && lastLink.url) {
      const updatedData = courseContentData.map((item: any, i: number) => {
        if (i === index) {
          return { ...item, links: [...item.links, { title: "", url: "" }] };
        }
        return item;
      });
      setCourseContentData(updatedData);
    } else {
      toast.error(
        "Please fill both title and URL fields for the last link before adding a new one."
      );
    }
  };
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";

      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section Can't be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3 mb-10">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? "mt-10" : "mb-0"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        style={{ fontSize: "20px" }}
                        className={` ${
                          item.videoSection === "untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        }font-Poppins cursor-pointer text-white bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoSection = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <BsPencil className="cursor-pointer text-white" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapse[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins text-white">
                          {index + 1}.{item.title}
                        </p>
                      ) : (
                        <> </>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  {/* arroe butn for colapase video content*/}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      style={{ fontSize: "20px" }}
                      className={`text-white mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="text-white"
                      style={{
                        transform: isCollapse[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapse[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.lable}>Video Title</label>
                      <input
                        type="text"
                        style={{ fontSize: "20px" }}
                        placeholder="Project plan..."
                        className={` ${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].title = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.lable}>Video Url</label>
                      <input
                        type="text"
                        style={{ fontSize: "20px" }}
                        placeholder="demo url"
                        className={` ${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoUrl = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.lable}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        style={{ fontSize: "20px" }}
                        placeholder="2m min"
                        className={` ${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updateData = courseContentData.map(
                            (contentItem: any, i: number) => {
                              if (i === index) {
                                return {
                                  ...contentItem,
                                  videoLength: e.target.value,
                                };
                              }
                              return contentItem;
                            }
                          );
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label className={styles.lable}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        style={{ fontSize: "20px" }}
                        placeholder="Give Descrpition....."
                        className={` ${styles.input} !h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <br />
                      <br />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => {
                      return (
                        <div className="mb-3 block" key={linkIndex}>
                          <div className="w-full flex items-center justify-between">
                            <label className={styles.lable}>
                              Link {linkIndex + 1}
                            </label>
                            <AiOutlineDelete
                              fontSize="20px"
                              className={`${
                                linkIndex === 0
                                  ? "cursor-no-drop"
                                  : "cursor-pointer"
                              } text-white`}
                              onClick={() =>
                                linkIndex === 0
                                  ? null
                                  : handleRemoveLink(index, linkIndex)
                              }
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Source Code....{link title}"
                            className={`${styles.input}`}
                            value={link.title}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].title =
                                e.target.value; // Fixed this line
                              setCourseContentData(updateData);
                            }}
                          />
                          <input
                            type="text"
                            placeholder="Source Code url....{link title}"
                            className={`${styles.input} mt-6`}
                            value={link.url}
                            onChange={(e) => {
                              const updateData = [...courseContentData];
                              updateData[index].links[linkIndex].url =
                                e.target.value; // Fixed this line
                              setCourseContentData(updateData);
                            }}
                          />
                        </div>
                      );
                    })}

                    <br />
                    <div
                      className="flex items-center text-white cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" />
                      Add Link
                    </div>
                  </>
                )}
                <br />
                {/* New content adding  */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      style={{ fontSize: "18px" }}
                      className="flex items-center text-white cursor-pointer"
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className="mr-2" />
                      Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          style={{ fontSize: "20px" }}
          className="flex flex-center text-white cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add New Section
        </div>
      </form>

      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-[180px] 800px:[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-[180px] 800px:[100px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
