/*
  Copyright 2024-2025 Hora Solis project contributors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {numbersLatin} from './locale.mjs';

export function getHoursMinutesText(milliseconds) {
  // Convert milliseconds to seconds
  const seconds = milliseconds / 1000;

  // Calculate hours
  const hours = Math.floor(seconds / 3600);

  // Calculate remaining seconds after extracting hours
  const minutes = Math.floor((seconds % 3600) / 60);
    
  // Return formatted as "h:m"
  return `${hours}h ${minutes}m`;
}

export function getTimeText(i, hour, minute, second, isCurrentInterval) {
  const hourNumber = numbersLatin[i];

  if (isCurrentInterval && i === hour)
    return `${hourNumber} : ${minute.toString().padStart(2, '0')} : ${second.toString().padStart(2, '0')}`

  return hourNumber;
}

export function getClockSpeedText(romanSecond) {
  const modernSecond = 1000; // ms
  const speedScale = ((romanSecond - modernSecond) / modernSecond) * 100;

  if (speedScale > 0) {
    // slower than a modern second
    return `Cursus horologii 🐌&nbsp;${Math.round(speedScale)} centesimis tardius`;
  } else {
    // faster than a modern second
    return `Cursus horologii 🐇&nbsp;${Math.round(Math.abs(speedScale))} centesimis celerius`;
  }
}

export function getClockSpeedFractionsText(romanSecond) {
  const modernSecond = 1000; // ms
  const speedScale = ((romanSecond - modernSecond) / modernSecond);

  const closestFraction = findClosestFraction(Math.abs(speedScale));

  if (speedScale > 0) {
    // slower than a modern second
    return `Cursus horologii 🐌&nbsp;${fractionNames.get(closestFraction)} (${closestFraction}) tardius`;
  } else {
    // faster than a modern second
    return `Cursus horologii 🐇&nbsp;${fractionNames.get(closestFraction)} (${closestFraction}) celerius`;
  }
}

const fractionNames = new Map([
  ["1/24", "Semuncia"],
  ["1/16", "Sextula"],
  ["1/12", "Uncia"],
  ["1/8", "Octava"],
  ["1/6", "Sextante"],
  ["1/4", "Quadrante"],
  ["1/3", "Triente"],
  ["5/12", "Quincunce"],
  ["1/2", "Semisse"],
  ["7/12", "Septunce"],
  ["2/3", "Bisse"],
  ["3/4", "Dodrante"],
  ["5/6", "Dextante"],
  ["11/12", "Deunce"],
]);

// Initialize the fractions map
const fractionDecimalValues = new Map(
  fractionNames.keys().map((i) => {
      const [a, b] = i.split('/');
      return [a / b, i];
    })
);

// Function to find the closest key and return its value
function findClosestFraction(n) {
  let closestKey = null;
  let smallestDifference = Infinity;

  // Iterate over the Map's keys
  for (const key of fractionDecimalValues.keys()) {
    const difference = Math.abs(key - n); // Calculate the absolute difference
    if (difference < smallestDifference) {
      smallestDifference = difference; // Update smallest difference
      closestKey = key; // Update closest key
    }
  }

  // Return the value associated with the closest key
  return fractionDecimalValues.get(closestKey);
}

export function calculateDayHourProgress(line, hour, minute, second) {
  // If line has already passed
  if (line <  hour)
    return 100;

  // If line is current
  if (line === hour) {
    const elapsedSeconds = minute * 60 + second;
    const totalSeconds = 3600; // Total seconds in 1 hour

    const progress = (elapsedSeconds / totalSeconds) * 100;
    return Math.min(100, Math.max(0, progress)).toFixed(3); // Clamp to valid range
  }
  
  // If line hasn't started
  return 0;
}

export function calculateNightVigiliaProgress(vigiliaLine, vigilia, hour, minute, second) {
  // If vigiliaLine has already passed
  if (vigiliaLine < vigilia) return 100;

  // If vigiliaLine is current
  if (vigiliaLine === vigilia) {
    // Check for invalid input scenario
    if (hour < vigilia * 3)
      throw new Error('The hour is earlier than the vigilia start');

    const elapsedSeconds = (hour - vigilia * 3) * 3600 + minute * 60 + second;
    const totalSeconds = 3600 * 3; // Total seconds in 3 hours
    const progress = (elapsedSeconds / totalSeconds) * 100;
    return Math.min(100, Math.max(0, progress)).toFixed(3); // Clamp to valid range
  }
  
  // If vigiliaLine hasn't started
  return 0;
}

/**
 * Calculate the height percentage for bedtime progress during the day.
 *
 * @param {number} line - The current time "line" (hour) to compare against.
 * @param {Object} time - An object containing the current hour, minute, and second.
 * @param {number} time.hour - The current hour of the day (0-23).
 * @param {number} time.minute - The current minute of the hour (0-59).
 * @param {number} time.second - The current second of the minute (0-59).
 * @returns {number} - The height percentage (0-100).
 */
export function calculateDayBedtimeHeight(line, { hour, minute, second, isDay }) {
  if (!isDay)
    return 0;

  // If the current line (hour) is later than the specified hour, return 100%.
  if (line > hour) 
    return 100;

  // If the current line (hour) matches the specified hour, calculate the percentage of the hour completed.
  if (line === hour) {
    const totalSeconds = 3600; // Total seconds in an hour
    const elapsedSeconds = (minute * 60) + second; // Convert minutes and seconds to total elapsed seconds
    const percentageCompleted = (elapsedSeconds / totalSeconds) * 100;
    
    const remainingPercentage = 100 - percentageCompleted; // Remaining percentage for the hour
    return Math.min(100, Math.max(0, remainingPercentage)).toFixed(3); // Clamp to valid range
  }

  // If the current line (hour) is earlier than the specified hour, return 0%.
  return 0;
}

export function calculateNightBedtimeHeight(vigiliaLine, {vigilia, hour, minute, second, isDay}) {
  if (isDay)
    return 100;

  // If the current vigiliaLine is later than the specified vigilia, return 100%.
  if (vigiliaLine > vigilia)
    return 100;

  // If vigiliaLine is current
  if (vigiliaLine === vigilia) {
    // Check for invalid input scenario
    if (hour < vigilia * 3)
      throw new Error('The hour is earlier than the vigilia start');

    const totalSeconds = 3600 * 3; // Total seconds in 1 vigilia
    const elapsedSeconds = (hour - vigilia * 3) * 3600 + minute * 60 + second;
    const percentageCompleted = (elapsedSeconds / totalSeconds) * 100;

    const remainingPercentage = 100 - percentageCompleted; // Remaining percentage for the vigilia
    return Math.min(100, Math.max(0, remainingPercentage)).toFixed(3); // Clamp to valid range
  }

  // If the current vigiliaLine is earlier than the specified vigilia, return 0%.
  return 0;
}
