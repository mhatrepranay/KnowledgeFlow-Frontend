import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Label,
  YAxis,
  LabelList,
  Cell,
  Legend,
} from "recharts";
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

// interface TriangleBarProps {
//   fill?: string;
//   x?: number;
//   y?: number;
//   width?: number;
//   height?: number;
// }

// const TriangleBar: React.FC<TriangleBarProps> = ({
//   fill = "#8884d8",
//   x = 0,
//   y = 0,
//   width = 0,
//   height = 0,
// }) => {
//   const getPath = (
//     x: number,
//     y: number,
//     width: number,
//     height: number
//   ): string => {
//     return `M${x},${y + height}C${x + width / 3},${y + height} ${
//       x + width / 2
//     },${y + height / 3}
//     ${x + width / 2},${y}
//     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
//       x + width
//     },${y + height}
//     Z`;
//   };
//   return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
// };

type Props = {
  isDashboard?: boolean;
};

const CourseAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData = [
    { name: "May 2023", uv: 3 },
    { name: "Jun 2023", uv: 4 },
    { name: "July 2023", uv: 2 },
    { name: "Aug 2023", uv: 5 },
    { name: "Sept 2023", uv: 7 },
    { name: "Oct 2023", uv: 2 },
    { name: "Nov 2023", uv: 5 },
    { name: "Des 2023", uv: 7 },
    { name: "Jan 2024", uv: 3 },
    { name: "Feb 2024", uv: 4 },
    { name: "Mar 2024", uv: 2 },
    { name: "April 2024", uv: 5 },
  ];

  // const analyticsData: any = [];

  // data &&
  //   data.courses.last12Months.forEach((item: any) => {
  //     const [month, date, year] = item.month.split(" ");
  //     analyticsData.push({ name: `${date} ${year}`, uv: item.count });
  //   });

  const minValue: number = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen overflow-auto">
          <div className="mt-[50px] ">
            <h1
              style={{ fontSize: "25px" }}
              className={`${styles.title} px-5 !text-start`}
            >
              Courses Analytics
            </h1>
            <p
              style={{ fontSize: "25px" }}
              className={`${styles.title} px-5  `}
            >
              Last 12 months analytics data{""}
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center ">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name" tick={{ fontSize: "14px", fill: "#333" }}>
                  <Label offset={0} position={"insideBottom"} />
                </XAxis>
                <YAxis
                  tick={{ fontSize: "14px", fill: "#333" }}
                  domain={[minValue, "auto"]}
                />
                <Bar dataKey="uv" label={{ position: "top", fill: "#333" }}>
                  {analyticsData.map((entry: any, index: any) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
