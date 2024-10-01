"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Quiz from "./Quiz";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(-1);
  const [route, setRoute] = useState("Login");
  const [id, setId] = useState<string | undefined>(undefined); // Initialize id state with type string | undefined

  useEffect(() => {
    // Access the id parameter from window.location
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("courseId");
    if (idParam !== null) {
      setId(idParam);
    } else {
      console.error("No 'id' parameter found in the URL.");
    }
  }, []);

  console.log(id);

  return (
    <div>
      <Heading
        title="PathHub us-KnowledgeFlow"
        description="Knowledge Flow for improve learning online with uniqueness"
        keywords="programming,react,next,mearn"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      {/* Pass courseId as prop to Quiz component */}
      {id !== undefined && <Quiz courseId1={id} />}
      <Footer />
    </div>
  );
};

export default Page;
