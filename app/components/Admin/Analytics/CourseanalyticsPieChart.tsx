import React from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

const colors: string[] = [
  "green",
  "#00C49F",
  "pink",
  "#FF8042",
  "darkred",
  "yellow",
  "#6495ED", // Cornflower blue
  "#20B2AA", // Light sea green
  "#9370DB", // Medium purple
  "#4682B4", // Steel blue
  "#FFA500", // Orange
  "#808000",
];

type Props = {
  isDashboard?: boolean;
};

const CourseanalyticsPieChart = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData = [
    { name: "May 2023", uv: 3 },
    { name: "Jun 2023", uv: 4 },
    { name: "July 2023", uv: 3 },
    { name: "Aug 2023", uv: 5 },
    { name: "Sept 2023", uv: 7 },
    { name: "Oct 2023", uv: 2 },
    { name: "Nov 2023", uv: 5 },
    { name: "Des 2023", uv: 7 },
    { name: "Jan 2024", uv: 3 },
    { name: "Feb 2024", uv: 4 },
    { name: "Mar 2024", uv: 3 },
    { name: "April 2024", uv: 5 },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#000"
        textAnchor="middle" // Center the text horizontally
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-[60vh]  flex flex-col justify-center items-center">
          <h1
            style={{ fontSize: "25px", color: "#fff" }}
            className={`${styles.title}`}
          >
            Courses Analytics
          </h1>
          <ResponsiveContainer width="100%" height="50%">
            <PieChart>
              <Pie
                data={analyticsData}
                dataKey="uv"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={renderCustomizedLabel}
              >
                {analyticsData.map((_: any, index: any) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default CourseanalyticsPieChart;
