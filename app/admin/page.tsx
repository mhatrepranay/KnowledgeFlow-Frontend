"use client";
import React, { useEffect, useState } from "react";
import Heading from "../utils/Heading";
import Sidebar from "../components/Admin/Sidebar/Adminsidebar";
import "./admin.css";
import AdminProtected from "../hooks/adminProtected";
import DashbordHero from "../components/Admin/DashbordHero";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {};

const page = (props: Props) => {
  const [ttsSpoken, setTtsSpoken] = useState(false); // TTS flag
  const { data: userData } = useLoadUserQuery(undefined, {});

  const handleTextToSpeech = (text: any) => {
    if ("speechSynthesis" in window && !ttsSpoken) {
      const voices = window.speechSynthesis.getVoices();

      // Define criteria for selecting a sweet and soft voice
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.toLowerCase().includes("soft") || // Looking for 'soft' in name
          // Example for British English
          voice.lang === "en-US" // Example for American English
      );

      const utterance = new SpeechSynthesisUtterance(text);

      if (preferredVoice) {
        // Use the selected voice if it matches the criteria
        utterance.voice = preferredVoice;
      }

      utterance.onend = () => setTtsSpoken(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // useEffect(() => {
  //   if (userData && userData.user) {
  //     const ttsText = `Hello ${userData.user.name}, welcome to the Admin Dashboard`;
  //     handleTextToSpeech(ttsText);
  //     setTtsSpoken(true);
  //   }
  // }, [userData]);

  console.log(userData?.user?.name);

  const [open, setOpen] = useState(false);
  return (
    <div>
      <AdminProtected>
        <Heading
          title="ULMP -Admin"
          description="my new project lms"
          keywords="programing,react,next"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5 ">
            <Sidebar />
          </div>
          <div className="w-[85%] ">
            <DashbordHero isDashboard={true} open={open} setOpen={setOpen} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
