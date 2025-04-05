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

import { calculateSolarEvents } from "./solarCalculation.mjs";
import { Temporal } from 'temporal-polyfill';

/**
 * Checks if a given event time signifies a polar phenomenon by comparing 
 * its date with a specified target time.
 *
 * A polar phenomenon, such as polar night or polar day, occurs when the event 
 * time represents a date that is different from the target date, or when 
 * the event time is a plain date (which inherently indicates a polar phenomenon).
 *
 * @param {Temporal.ZonedDateTime | Temporal.PlainDate} eventTime - The time of the solar event to evaluate.
 * @param {Temporal.ZonedDateTime} targetTime - The reference time for date comparison.
 * 
 * @returns {boolean} Returns true if the event time indicates a polar phenomenon; otherwise, returns false.
 */
function checkIfPolarPhenomenon(eventTime, targetTime) {
  // Check if eventTime is a PlainDate, which always indicates a polar phenomenon
  if (eventTime instanceof Temporal.PlainDate)
    return true;

  // Convert the event and target times to PlainDate objects for comparison
  const eventDate = eventTime.toPlainDate();
  const targetDate = targetTime.toPlainDate();

  // Return true if the event date is not equal to the target date
  return !eventDate.equals(targetDate);
}

/**
 * Calculates solar event times and checks for polar phenomena based on the given position and time.
 *
 * @param {Object} position - The geographical position.
 * @param {number} position.latitude - The latitude of the location.
 * @param {number} position.longitude - The longitude of the location.
 * @param {Temporal.ZonedDateTime} now - The current time in ISO format as a Temporal ZonedDateTime.
 * 
 * @returns {Object} An object containing solar event information or indicating a polar phenomenon.
 * @returns {boolean} [returns.isPolarPhenomenon] - Indicates if a polar phenomenon occurs.
 * @returns {Temporal.ZonedDateTime} [returns.sunrise] - The time of sunrise at the given position.
 * @returns {Temporal.ZonedDateTime} [returns.sunset] - The time of sunset at the given position.
 * @returns {Temporal.ZonedDateTime} [returns.nextSunrise] - The time of the next sunrise after the current time.
 */
function getSolarEvents(position, now) {
  // Calculate the sunrise and sunset times for the current time
  const {sunrise, sunset} = calculateSolarEvents(position, now);

  // Check if either sunrise or sunset indicates a polar phenomenon
  if (checkIfPolarPhenomenon(sunrise, now) || checkIfPolarPhenomenon(sunset, now))
    return {isPolarPhenomenon: true};

  // Check if the current time is earlier than sunrise
  if (Temporal.ZonedDateTime.compare(now, sunrise) === -1) { // now < sunrise
    // If so, retrieve the solar events for the previous day
    const yesterday = now.subtract({days: 1});
    const {sunrise: prevSunrise, sunset: prevSunset} = calculateSolarEvents(position, yesterday);

    // Check for polar phenomena on the previous day's sunrise or sunset
    // This also ensures that the current time is not earlier than yesterday's sunrise.
    if (checkIfPolarPhenomenon(prevSunrise, yesterday) || checkIfPolarPhenomenon(prevSunset, yesterday))
      return {isPolarPhenomenon: true};

    // Return the previous day's sunrise and sunset, along with the current day's sunrise
    return {sunrise: prevSunrise, sunset: prevSunset, nextSunrise: sunrise};

  } else { // Now is later than or equal to sunrise

    // Calculate the solar events for the next day
    const tomorrow = now.add({days: 1});
    const {sunrise: nextSunrise} = calculateSolarEvents(position, tomorrow);

    // Check if the next day's sunrise indicates a polar phenomenon
    // This also ensures that the current time is not later than or equal to tomorrow's sunrise.
    if (checkIfPolarPhenomenon(nextSunrise, tomorrow))
      return {isPolarPhenomenon: true};

    // Return the current day's sunrise, sunset, and the next day's sunrise
    return {sunrise, sunset, nextSunrise};
  }
}

function calculateTime(from, to, now) {
  const intervalDuration = to.epochMilliseconds - from.epochMilliseconds; // Total milliseconds in the day/night
  const elapsedTime = now.epochMilliseconds - from.epochMilliseconds; // Elapsed milliseconds since start of day/night

  const secondDuration = intervalDuration / 43200; // 12 * 60 * 60 = 43200
  const minuteDuration = 60 * secondDuration;
  const hourDuration = 3600 * secondDuration; // 60 * 60 = 3600

  // Calculate the hour
  const hour = Math.floor(elapsedTime / hourDuration);
  const fullHoursMilliseconds = hour * hourDuration;

  // Calculate the remaining minutes (after removing full hours)
  const minute = Math.floor((elapsedTime - fullHoursMilliseconds) / minuteDuration);

  // Calculate the remaining seconds (after removing full minutes)
  const second = Math.floor((elapsedTime - fullHoursMilliseconds - minute * minuteDuration) / secondDuration);

  // Calculate the milliseconds remaining until the next second starts
  const elapsedMilliseconds = fullHoursMilliseconds + minute * minuteDuration + second * secondDuration;
  const durationUntilNextSecond = secondDuration - (now.epochMilliseconds - (from.epochMilliseconds + elapsedMilliseconds));

  return { hour, minute, second, secondDuration, durationUntilNextSecond };
}

function calculateIntervalDuration(from, to) {
  return to.epochMilliseconds - from.epochMilliseconds; // Total milliseconds in the day/night
}

export function getNaturalDay(position, now) {

  const {sunrise, sunset, nextSunrise, isPolarPhenomenon} = getSolarEvents(position, now);

  if (isPolarPhenomenon)
    return {isPolarPhenomenon, durationUntilNextSecond: 5 * 1000}; // Let's save some batteries for the polar explorers.

  const isDay = Temporal.ZonedDateTime.compare(now, sunset) === -1 // now < sunset

  const {hour, minute, second, secondDuration, durationUntilNextSecond} =  (isDay)
    ? calculateTime(sunrise, sunset, now) 
    : calculateTime(sunset, nextSunrise, now);

  const dayMilliseconds = calculateIntervalDuration(sunrise, sunset);
  const nightMilliseconds = calculateIntervalDuration(sunset, nextSunrise);

  // const daySecondDuration = dayMilliseconds / 43200; // 12 * 60 * 60 = 43200
  // const nightSecondDuration = nightMilliseconds / 43200; // 12 * 60 * 60 = 43200

  const calculateTimeWithin = (point) => {
    if (Temporal.ZonedDateTime.compare(point, sunrise) === -1 || // point < sunrise
        Temporal.ZonedDateTime.compare(point, nextSunrise) >= 0) { // point >= nextSunrise
      throw new Error('Time point is outside of sunrise..nextSunrise range, excluding nextSunrise');
    }

    const isDay = Temporal.ZonedDateTime.compare(point, sunset) === -1 // point < sunset

    const {hour, minute, second} = (isDay) 
      ? calculateTime(sunrise, sunset, point)
      : calculateTime(sunset, nextSunrise, point);

    return {
      isDay,
      hour,
      minute,
      second,
      vigilia: (isDay) ? null : Math.floor(hour / 3)
    };
  }

  const vigilia = (isDay) ? null : Math.floor(hour / 3);

  return {
    sunrise,
    sunset,
    nextSunrise,
    isPolarPhenomenon,
    isDay,
    hour,
    minute,
    second,
    secondDuration,
    durationUntilNextSecond,
    dayMilliseconds,
    nightMilliseconds,
    // daySecondDuration,
    // nightSecondDuration,
    vigilia,
    calculateTimeWithin
  };
}
