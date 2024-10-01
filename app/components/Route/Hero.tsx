import { styles } from "@/app/styles/style";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useRef, useState } from "react";
import { BiSearch, BiMicrophone } from "react-icons/bi"; // Import microphone icon
import "./hero.css";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

const Hero: FC = () => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [recording, setRecording] = useState(false); // State to track recording status
  const router = useRouter();

  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };
  // const handleTextToSpeech = (text: any) => {
  //   if ("speechSynthesis" in window) {
  //     const utterance = new SpeechSynthesisUtterance(text);
  //     window.speechSynthesis.speak(utterance);
  //   }
  // };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    let transcript = ""; // Variable to store the transcript temporarily

    recognition.onresult = (event: any) => {
      transcript += event.results[0][0].transcript + " "; // Append transcript to the temporary variable
    };

    recognition.onstart = () => {
      setRecording(true); // Set recording state to true when recording starts
    };

    recognition.onend = () => {
      setSearch(transcript.trim());
      setRecording(false);

      const searchText = transcript.trim();

      // handleTextToSpeech(`Searching for ${searchText}`);

      router.push(`/courses?title1=${searchText}`);
    };

    recognition.start();
  };

  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollTop = window.scrollY;
        const heroOffset = heroRef.current.offsetTop;
        const windowHeight = window.innerHeight;

        const isHeroVisible =
          scrollTop + windowHeight > heroOffset &&
          scrollTop < heroOffset + heroRef.current.clientHeight;

        setIsVisible(isHeroVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          ref={heroRef}
          id="hero"
          className={`w-full flex items-center justify-center h-screen ${
            isVisible ? "fade-in" : ""
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="flex flex-row items-center">
              <div className="w-30% ml-20 flex justify-center pt-10">
                <Image
                  style={{ boxShadow: "0 0 15px #001329" }}
                  src={data?.layout?.banner?.image?.url}
                  width={350}
                  height={350}
                  alt=""
                  className="object-contain max-w-[100%] w-full h-auto z-10 rounded-full hero_animation"
                />
              </div>
              <div className="w-1/2 ml-20 mt-20 text-start">
                <h3
                  style={{
                    color: "white",
                    fontSize: "30px",
                    fontWeight: "600",
                    overflowWrap: "break-word",
                    fontFamily: "'Josefin Sans', sans-serif",
                  }}
                >
                  {data?.layout.banner.title}
                </h3>
                <br />
                <p
                  style={{
                    color: "white",
                    fontSize: "15px",
                    fontWeight: "600",
                    fontFamily: "'Josefin Sans', sans-serif",
                    whiteSpace: "pre-line",
                    overflowWrap: "break-word",
                  }}
                >
                  {data?.layout.banner.subTitle}
                </p>
                <div className="w-full mt-8 justify-center">
                  <div className="w-3/4 bg-transparent relative h-12">
                    <input
                      type="search"
                      placeholder="Search Courses..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                        }
                      }}
                      className="bg-transparent border border-gray-300 dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-md p-2 w-full h-full outline-none text-[#0000004c] text-lg font-semibold font-Josefin"
                    />
                    <div // Voice search button
                      className={`absolute flex items-center justify-center w-12 h-12 right-8 top-0 rounded-full cursor-pointer ${
                        recording ? "recording" : ""
                      }`}
                      onClick={handleVoiceSearch}
                    >
                      <BiMicrophone
                        className={`${
                          recording ? "simple-color" : "multicolor-microphone"
                        } `}
                        size={30}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex items-center">
                  <Image
                    src={require("../../../public/assets/banner1.png")}
                    alt=""
                    style={{ border: "solid white 4px" }}
                    className="w-16 h-16 rounded-full "
                  />
                  <Image
                    src={require("../../../public/assets/banner.png")}
                    alt=""
                    style={{ border: "solid white 4px" }}
                    className="w-16 h-16 rounded-full ml-[-20px]"
                  />
                  <Image
                    src={require("../../../public/assets/banner2.png")}
                    alt=""
                    style={{ border: "solid white 4px" }}
                    className="w-16 h-16 rounded-full ml-[-20px]"
                  />
                  <p
                    style={{ color: "white" }}
                    className=" pl-3 text-lg font-semibold font-Josefin  text-[#edfff4]"
                  >
                    500K+ People already trusted us.{" "}
                    <Link
                      href="/courses"
                      style={{ color: "#0fdf0f" }}
                      className="text-green-500 ml-1"
                    >
                      View Courses
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
