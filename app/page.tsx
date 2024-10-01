"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <div
    // style={{
    //   backgroundImage: "linear-gradient( #010020, rgb(0 0 0))",
    // }}
    >
      <Heading
        title="ULMP"
        description="my new project lms"
        keywords="programing,react,next"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <br />
      <Courses />
      <br />
      <Reviews />
      <FAQ />
      <Footer />
      <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
      <script
        src="https://mediafiles.botpress.cloud/b5929795-51d0-46ae-a15d-af9b11d5a72d/webchat/config.js"
        defer
      ></script>
    </div>
  );
};

export default Page;
