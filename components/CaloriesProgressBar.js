import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Text as SVGText } from 'react-native-svg';

const CaloriesProgressBar = ({ remainingCalories, dailyCalories }) => {
    // calculate the percentage of calories remaining
    const percentageRemaining = (remainingCalories / dailyCalories) * 100;
  
    // calculate the stroke color based on the percentage remaining
    let strokeColor = "#00bfff"; // blue
    if (percentageRemaining <= 25) {
      strokeColor = "#ff4500"; // orange
    } else if (percentageRemaining <= 50) {
      strokeColor = "#ffd700"; // yellow
    }
  
    // calculate the circumference of the circle
    const circumference = 2 * Math.PI * 50;
    const radius = 100; // Change this value to increase or decrease the size of the progress bar
  
    // calculate the dash offset based on the percentage remaining
    const dashOffset = Math.round(
      circumference - (percentageRemaining / 100) * circumference
    );
  
    return (
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 5}
          strokeWidth={10}
          stroke="#f0f0f0"
          fill="none"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - 5}
          strokeWidth={10}
          stroke={strokeColor}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          fill="none"
        />
        <SVGText
          x={radius}
          y={radius}
          fill="#000"
          fontSize={18}
          fontWeight="bold"
          textAnchor="middle"
          alignmentBaseline="central"
        >
          {remainingCalories} remaining
        </SVGText>
      </Svg>
    );
  };

  export default CaloriesProgressBar;