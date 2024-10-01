"use client";
import React, { FC, useRef, useState } from "react";
type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleContextMenu = (
    event: React.MouseEvent<HTMLVideoElement, MouseEvent>
  ) => {
    event.preventDefault(); // Prevent right-click context menu
  };

  return (
    <div style={{ position: "relative", width: "100%", background: "#000" }}>
      <video
        ref={videoRef}
        src={`http://localhost:8000/video/${videoUrl}`}
        style={{ width: "100%", outline: "none" }}
        onTimeUpdate={updateTime}
        onContextMenu={handleContextMenu}
        controls
        controlsList="nodownload" // Prevent download option
      ></video>
    </div>
  );
};

export default CoursePlayer;
