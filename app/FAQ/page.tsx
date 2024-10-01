"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";

import Footer from "../components/Footer";

import FAQ from "../components/FAQ/FAQ";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
        title="Policy-KnowledgeFlow"
        description="Knowledge Flow for improve learning online with uniquness"
        keywords="programing,react,next,mearn"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <FAQ />
      <Footer />
    </div>
  );
};

export default page;
