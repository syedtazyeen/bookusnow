// CircularLoading.js

import React from "react";

const CircularLoading = ({ size = 20, strokeWidth = 1.5 }) => {
  const radius = (size - strokeWidth) / 3;
  const viewBox = `0 0 ${size} ${size}`;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - circumference * 0.75;

  return (
    <svg
      className="animate-spin mx-auto h-10 w-10 text-red-500"
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="stroke-current"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="none"
      />
    </svg>
  );
};

export default CircularLoading;
