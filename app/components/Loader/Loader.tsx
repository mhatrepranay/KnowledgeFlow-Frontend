// Loader.tsx
"use client";
import React from "react";

const Loader = () => {
  // const loaderStyle = {
  //   border: "5px solid #f3f3f3",
  //   borderRadius: "50%",
  //   borderTop: "5px solid #3498db",
  //   width: "60px",
  //   height: "60px",
  //   WebkitAnimation: "spin 2s linear infinite", // For Safari
  //   animation: "spin 2s linear infinite",
  // };

  // const spinKeyframes = {
  //   "0%": { transform: "rotate(0deg)" },
  //   "100%": { transform: "rotate(360deg)" },
  // };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    </>
    // <div className="flex justify-center items-center h-screen">
    //   <div style={loaderStyle}>
    //     <style>
    //       {`
    //         @keyframes spin {
    //           0% { transform: rotate(0deg); }
    //           100% { transform: rotate(360deg); }
    //         }
    //         @-webkit-keyframes spin {
    //           0% { -webkit-transform: rotate(0deg); }
    //           100% { -webkit-transform: rotate(360deg); }
    //         }
    //       `}
    //     </style>
    //   </div>
    // </div>
  );
};

export default Loader;
