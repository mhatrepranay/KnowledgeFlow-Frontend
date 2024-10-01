"use client";
import React from "react";
import DadshbordHeader from "./DadshbordHeader";
import DashboardeWidgets from "../../components/Admin/Widgest/DashboardeWidgets";

type Props = {
  isDashboard?: boolean;
  open?: boolean;
  setOpen?: any;
};

const DashbordHero = ({ isDashboard, open, setOpen }: Props) => {
  return (
    <div>
      <DadshbordHeader open={open} setOpen={setOpen} />
      {isDashboard && <DashboardeWidgets open={open} />}
    </div>
  );
};

export default DashbordHero;
