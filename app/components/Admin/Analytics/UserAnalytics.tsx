import React from "react";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";

type Props = {
  isDashboard?: boolean;
};
// const analyticsData = [
//   { name: "Jan 2023", count: 400 },
//   { name: "Feb 2023", count: 8250 },
//   { name: "Mar 2023", count: 4300 },
//   { name: "Apr 2023", count: 4550 },
//   { name: "May 2023", count: 2000 },
//   { name: "Jun 2023", count: 3450 },
//   { name: "Jul 2023", count: 356 },
//   { name: "Aug 2023", count: 5667 },
//   { name: "Sep 2023", count: 2225 },
//   { name: "Oct 2023", count: 5428 },
//   { name: "Nov 2023", count: 3685 },
//   { name: "Dec 2023", count: 5 },
// ];

const UserAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      const [month, date, year] = item.month.split(" ");
      analyticsData.push({ name: `${date} ${year}`, count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] shadow-sm pb-5 rounded-sm  bg-[#111C43]"
          }`}
        >
          <div className={`${!isDashboard ? "!ml-8 mb-5" : ""} `}>
            <h1
              style={{ fontSize: "25px", fontWeight: 500 }}
              className={`${styles.title} ${
                !isDashboard ? "text-20px" : ""
              } px-5 text-start`}
            >
              User Analytics
            </h1>

            {!isDashboard && (
              <p
                style={{ fontSize: "25px", fontWeight: 500 }}
                className={`${styles.lable} px-5 text-center`}
              >
                Last 12 Month analytics data{""}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[40vh]" : "h-screen "
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4dd6b2"
                  fill="#4dd6b2"
                />
                {!isDashboard && <Legend />}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UserAnalytics;
