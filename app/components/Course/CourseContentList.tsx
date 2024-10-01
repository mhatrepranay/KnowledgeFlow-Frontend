import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVedio?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = [];
  if (props.data) {
    const sectionSet = new Set<string>();
    for (const item of props.data) {
      sectionSet.add(item.videoSection);
    }
    videoSections.push(...Array.from(sectionSet));
  }

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  let sectionCount = 0;
  return (
    <div
      className={`mt-[15px] w-full ${!props.isDemo && "sticky top-24 z-30"}`}
    >
      {props.data && props.data.length > 0 && (
        <>
          {videoSections.map((section: string, sectionIndex: number) => {
            const isSectionVisible = visibleSections.has(section);

            // Filter videos by section
            const sectionVideos: any[] = props.data.filter(
              (item: any) => item.videoSection === section
            );

            const sectionVideoCount: number = sectionVideos.length; // Number of videos in the current section

            const sectionVideoLength: number = sectionVideos.reduce(
              (totalLength: number, item: any) =>
                totalLength + item.videoLength,
              0
            );

            const sectionStartIndex: number = totalCount;
            totalCount += sectionVideoCount;

            const sectionContentHours: number = sectionVideoLength / 60;
            sectionCount++;
            const sectionColors: string[] = [
              "skyblue",
              "pink",
              "red",
              "yellow",
            ];

            return (
              <div
                className={`${"border-b border-[#ffffff8e] pb-2"}`}
                key={section}
              >
                <div className="w-full flex">
                  <div className="w-full flex justify-between items-center">
                    <h2
                      style={{
                        fontSize: "30px",
                        color: sectionColors[sectionCount - 1],
                      }} // Subtract 1 from sectionCount to match array index
                      className="text-[22px] ☐ text-black dark:text-white"
                    >
                      {sectionCount}.{section}
                    </h2>

                    <button
                      className="mr-4 cursor-pointer"
                      onClick={() => toggleSection(section)}
                    >
                      {isSectionVisible ? (
                        <BsChevronUp size={20} />
                      ) : (
                        <BsChevronDown size={20} />
                      )}
                    </button>
                  </div>
                </div>
                <h5 className="pl-5">
                  {sectionVideoCount} Lessons -{" "}
                  {sectionVideoLength < 60
                    ? sectionVideoLength + "  minutes"
                    : sectionContentHours.toFixed(2) + "  Hours"}
                </h5>
                <br />
                {isSectionVisible && (
                  <div className="w-full">
                    {sectionVideos.map((item: any, index: number) => {
                      const videoIndex: number = sectionStartIndex + index;
                      const contentLength: number = item.videoLength / 60;

                      return (
                        <div
                          className={`w-full ${
                            videoIndex === props.activeVideo
                              ? "bg-slate-800"
                              : ""
                          } cursor-pointer transition-all p-2 mb-5`}
                          key={item._id}
                          onClick={() =>
                            props.isDemo
                              ? null
                              : props?.setActiveVedio(videoIndex)
                          }
                        >
                          <div className="flex items-start">
                            <div>
                              <MdOutlineOndemandVideo
                                size={25}
                                className="mr-2"
                                color="#1cdada"
                              />
                            </div>
                            <h1
                              style={{ fontSize: "18px" }}
                              className="inline-block break-words  "
                            >
                              {item.title}
                            </h1>
                          </div>
                          <h5 className="pl-8">
                            {item.videoLength > 60
                              ? contentLength.toFixed(2)
                              : item.videoLength}{" "}
                            {item.videoLength > 60 ? "hours" : "minutes"}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* <div className="w-full h-[1px] bg-white mt-2 mb-2"></div> */}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CourseContentList;
