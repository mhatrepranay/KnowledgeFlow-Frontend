import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
import CourseanalyticsPieChart from "../Analytics/CourseanalyticsPieChart";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};
const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        sx={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardeWidgets: FC<Props> = ({ open, value }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);

        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100; // Set default value to 100% if previous month count is 0

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100; // Set default value to 100% if previous month count is 0

          setuserComparePercentage({
            cuurentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            cuurentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[65%,34%]">
        <div className="p-8 z-[10]">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8 ">
          <div className="w-full rounded-sm shadow  bg-[#111C43]">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft style={{ color: "#45cba0", fontSize: "30px" }} />
                <h5
                  style={{
                    // color: "#45cba0",
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                  className="pt-2 font-Poppins"
                >
                  {ordersComparePercentage?.cuurentMonth}
                </h5>
                <h5
                  style={{
                    color: "#45cba0",
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                  className="py-2 font-Poppins"
                >
                  Sales Obtain
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {" "}
                  {ordersComparePercentage?.percentChange > 0
                    ? "+" + ordersComparePercentage?.percentChange.toFixed(2)
                    : "-" +
                      ordersComparePercentage?.percentChange.toFixed(2)}{" "}
                  %
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full rounded-sm bg-[#111C43] shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight
                  style={{ color: "#45cba0", fontSize: "30px" }}
                />
                <h5
                  style={{
                    // color: "#45cba0",
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                  className="pt-2 font-Poppins"
                >
                  {userComparePercentage?.cuurentMonth}
                </h5>
                <h5
                  style={{
                    color: "#45cba0",
                    fontSize: "20px",
                    fontWeight: 400,
                  }}
                  className="py-2 font-Poppins"
                >
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {" "}
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : "-" +
                      userComparePercentage?.percentChange.toFixed(2)}{" "}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" grid grid-cols-[65%,35%] mt-[-20px]  ">
        <div className="bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto ">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5  z-[1]">
          <h5
            style={{
              fontSize: "20px",
              fontWeight: 400,
            }}
            className="pb-2 font-Poppins"
          >
            Recent Transaction
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
      <div className=" grid grid-cols-[45%,25%] mt-[-20px]">
        <div className="bg-[#111c43] w-[94%] mt-[30px] h-[60vh] shadow-sm m-auto ">
          <CourseanalyticsPieChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardeWidgets;
