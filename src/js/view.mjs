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

const numbersLatin = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"];
const numbersText = ["Prima", "Secunda", "Tertia", "Quarta", "Quinta", "Sexta", "Septima", "Octava", "Nona", "Decima", "Undecima", "Duodecima"];

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
    return `Cursus horologii <span class="whitespace-nowrap">🐌 ${Math.round(speedScale)}</span> centesimis tardius`;
  } else {
    // faster than a modern second
    return `Cursus horologii <span class="whitespace-nowrap">🐇 ${Math.round(Math.abs(speedScale))}</span> centesimis celerius`;
  }
}

export function getClockSpeedFractionsText(romanSecond) {
  const modernSecond = 1000; // ms
  const speedScale = ((romanSecond - modernSecond) / modernSecond);

  const closestFraction = findClosestFraction(Math.abs(speedScale));

  if (speedScale > 0) {
    // slower than a modern second
    return `Cursus horologii ${fractionNames.get(closestFraction)} (${closestFraction}) parte <span class="whitespace-nowrap">🐌 tardior</span> est`;
  } else {
    // faster than a modern second
    return `Cursus horologii ${fractionNames.get(closestFraction)} (${closestFraction}) parte <span class="whitespace-nowrap">🐇 celerior</span> est`;
  }
}

const fractionNames = new Map([
  ["1/24", "semunciā"],
  ["1/16", "sextulā"],
  ["1/12", "unciā"],
  ["1/8", "octavā"],
  ["1/6", "sextante"],
  ["1/4", "quadrante"],
  ["1/3", "triente"],
  ["5/12", "quincunce"],
  ["1/2", "semisse"],
  ["7/12", "septunce"],
  ["2/3", "besse"],
  ["3/4", "dodrante"],
  ["5/6", "dextante"],
  ["11/12", "deunce"],
]);

// Initialize the fractions map
const fractionDecimalValues = new Map(
  Array.from(fractionNames.keys()).map((i) => {
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

export function polarPhenomenonView() {
  return ['<div class="container mx-auto mt-4 px-3 text-center text-black sm:px-4 dark:text-stone-50">Phaenomenon polare eo die fit 🐧</div>'];
}

export function clockView(clockViewData) {
  const view = [];

  view.push(`<div class="container mx-auto sm:px-4">`);

  view.push(...naturalDayView(clockViewData));
  view.push(...statusLinesView(clockViewData));

  view.push(`</div>`);

  return view;
}

function naturalDayView({naturalDay, naturalBedtime}) {
  const view = []

  view.push(`
    <div class="mt-4 grid grid-cols-2 place-items-center text-center text-xs font-bold tracking-widest sm:mt-6 sm:text-sm lg:mt-8 lg:text-base">
      <div class="text-amber-500 dark:text-yellow-100">TEMPUS 🌞 DIURNUM</div>
      <div class="text-indigo-500 dark:text-purple-100">TEMPUS 🌚 NOCTURNUM</div>
    </div>
  `);

  view.push(`<div class="mt-1 grid grid-cols-2 gap-x-1 sm:mt-2 sm:gap-x-2 lg:gap-x-3">`);

  view.push(...dayTimeColumnView(naturalDay, naturalBedtime));
  view.push(...nightTimeColumnView(naturalDay, naturalBedtime));

  view.push(`</div>`);

  view.push(...dayDurationView(naturalDay));

  return view;
}

function dayTimeColumnView({hour, minute, second, isDay}, naturalBedtime) {
  const view = []

  // column start
  view.push(`<div>`);

  for (let line = 0; line < 12; line++) {
    // Hour line start
    view.push(`<div class="relative h-[48px] border-b-4 border-white bg-amber-200 lg:h-[56px] dark:border-stone-600 dark:bg-yellow-400">`);

    // Day progress
    if (isDay) {
      const height = calculateDayHourProgress(line, hour, minute, second);
      view.push(`<div class="absolute top-0 z-10 w-full bg-amber-400 dark:bg-yellow-600" style="height: ${height}%"></div>`);
    } else {
      view.push(`<div class="absolute inset-0 top-0 z-10 bg-amber-400 dark:bg-yellow-600"></div>`);
    }

    // Possible bedtime
    const bedtimeHeight = calculateDayBedtimeHeight(line, naturalBedtime);

    if (bedtimeHeight > 0) {
      view.push(`<div class="absolute inset-x-10 bottom-0 z-20 bg-fuchsia-400/40 sm:inset-x-16 lg:inset-x-28 dark:bg-pink-400/40" style="height: ${bedtimeHeight}%">`);

      if (bedtimeHeight >= 45)
        view.push(`
          <div class="absolute inset-x-3 inset-y-0 z-30 flex items-center justify-center text-center text-xs font-bold leading-none tracking-widest text-fuchsia-50 sm:text-sm dark:text-pink-50 ${(isDay && line === hour) ? 'max-md:hidden' : ''}">
            TEMPUS SOMNI
          </div>
        `);

      view.push(`</div>`);
    }

    // Time text
    const timeText = getTimeText(line, hour, minute, second, isDay);
    view.push(`<div class="absolute inset-x-4 inset-y-0 z-40 flex items-center font-bold text-gray-800 sm:inset-x-3 lg:text-lg dark:text-yellow-50">${timeText}</div>`);
  
    // Hour line end
    view.push(`</div>`);
  }

  // column end
  view.push(`</div>`);

  return view;
}

function nightTimeColumnView({vigilia, hour, minute, second, isDay}, naturalBedtime) {
  const view = []

  // column start
  view.push(`<div>`);

  for (let vigiliaLine = 0; vigiliaLine < 4; vigiliaLine++) {
    // 48*3 = 144, 56*3 = 168
    view.push(`<div class="relative h-[144px] border-b-4 border-white bg-indigo-200 sm:mx-1 lg:h-[168px] dark:border-stone-600 dark:bg-purple-300">`);

    // Night progress
    if (!isDay) {
      const height = calculateNightVigiliaProgress(vigiliaLine, vigilia, hour, minute, second);
      view.push(`<div class="absolute top-0 z-10 w-full bg-indigo-400 dark:bg-purple-500" style="height: ${height}%"></div>`);
    }

    // Possible bedtime
    const bedtimeHeight = calculateNightBedtimeHeight(vigiliaLine, naturalBedtime);

    if (bedtimeHeight > 0) {
      view.push(`<div class="absolute inset-x-12 bottom-0 z-20 bg-fuchsia-300/40 sm:inset-x-16 lg:inset-x-28 dark:bg-rose-300/40" style="height: ${bedtimeHeight}%">`);

      if ((bedtimeHeight >= 22 && bedtimeHeight <= 44) || bedtimeHeight >= 88) {
        const perhapsHide = !isDay && hour >= vigiliaLine * 3 && hour <= (vigiliaLine + 1) * 3 && (((bedtimeHeight >= 22 && bedtimeHeight <= 44) && hour === vigiliaLine * 3 + 2) || (bedtimeHeight >= 88 && hour === vigiliaLine * 3 + 1));
        view.push(`
          <div class="absolute inset-x-3 inset-y-0 z-30 flex items-center justify-center text-center text-xs font-bold leading-none tracking-widest text-fuchsia-50 sm:text-sm dark:text-rose-50 ${perhapsHide ? 'max-md:hidden' : ''}">
            TEMPUS SOMNI
          </div>
        `);
      }

      view.push(`</div>`);
    } // end of bedtime

    // vigilia right side label
    view.push(`
      <div class="absolute inset-x-3 inset-y-0 z-30 text-center text-xs font-extrabold leading-none tracking-widest text-gray-50 sm:inset-x-2 lg:text-sm dark:text-purple-50" style="writing-mode: vertical-rl; text-orientation: sideways;">
        VIGILIA&ensp;${numbersText[vigiliaLine].toUpperCase()}
      </div>
    `);

    // Hour blocks
    for (let line = 0; line < 3; line++) {
      // Hour line start
      view.push(`<div class="relative z-40 mr-9 sm:mr-8 h-[48px] border-b-4 ${line < 2 ? 'border-dashed border-white dark:border-stone-600' : 'border-transparent'} lg:h-[56px]">`);

      // Time text
      const timeText = getTimeText(vigiliaLine * 3 + line, hour, minute, second, !isDay);
      view.push(`<div class="absolute inset-x-4 inset-y-0 z-50 flex items-center font-bold text-gray-800 sm:inset-x-3 lg:text-lg dark:text-purple-50">${timeText}</div>`);
    
      // Hour line end
      view.push(`</div>`);
    }

    view.push(`</div>`); // end of vigilia block
  }

  view.push(`</div>`); // end of column

  return view;
}

function dayDurationView({dayMilliseconds, nightMilliseconds, isDay}) {
  const totalDuration = dayMilliseconds + nightMilliseconds;
  const percentDay = Math.min(100, Math.max(0, (dayMilliseconds / totalDuration) * 100)).toFixed(3); // Clamp to valid range

  // Margin reduced by 4px because of the hours list in the previous block
  return [`
    <div class="mt-3 text-center text-xs font-bold tracking-widest text-gray-600 sm:mt-5 sm:text-sm lg:mt-7 lg:text-base dark:text-stone-100">
      LONGITUDO <span class="text-amber-500 dark:text-yellow-100">🌞 DIEI</span> ET <span class="text-indigo-500 dark:text-purple-100">🌚 NOCTIS</span>
    </div>

    <div class="mt-1 flex items-center justify-center text-center text-sm font-bold text-gray-600 sm:mt-2 sm:text-base lg:text-lg">
      <div class="relative h-10 w-full bg-indigo-200 sm:w-1/2 lg:h-12 dark:bg-purple-300">
        <div class="absolute left-0 flex h-full items-center justify-center ${isDay ? 'bg-amber-200 dark:bg-yellow-400' : 'bg-amber-400 dark:bg-yellow-600'} dark:text-purple-50" style="width: ${percentDay}%">
          ${getHoursMinutesText(dayMilliseconds)}<br>
        </div>
        <div class="absolute right-0 flex h-full items-center justify-center dark:text-yellow-50" style="width: ${100 - percentDay}%">
          ${getHoursMinutesText(nightMilliseconds)}<br>
        </div>
      </div>
    </div>
  `];
}

function statusLinesView({now, naturalDay, bedtime}) {
  const {sunrise, sunset, nextSunrise, secondDuration} = naturalDay;
  
  return [`
    <div class="mt-4 text-center text-sm text-black sm:mt-5 sm:text-lg lg:mt-6 lg:text-xl dark:text-stone-50">

      <div class="mt-1 lg:mt-2">
        Dies civilis 🏛️&nbsp;${now.toLocaleString(navigator.languages, {dateStyle: 'medium', timeStyle: 'short'})}
      </div>

      <div>
        <div class="mt-1 block sm:inline-block sm:px-1 lg:mt-2">
           Ortus solis 🌅&nbsp;${sunrise.toLocaleString(navigator.languages, {timeStyle: 'short'})}
        </div>

        <div class="mt-1 block sm:inline-block sm:px-1 lg:mt-2">
          Occasus solis 🌇&nbsp;${sunset.toLocaleString(navigator.languages, {timeStyle: 'short'})}
        </div>
      </div>

      <div class="mt-1 lg:mt-2">
        Tempus ad somnum capiendum 🛏️&nbsp;${bedtime.toLocaleString(navigator.languages, {timeStyle: 'short'})}
      </div>

      <div class="mt-1 lg:mt-2">
        Ortus solis die sequenti ⏭️&thinsp;🌅&nbsp;${nextSunrise.toLocaleString(navigator.languages, {timeStyle: 'short'})}
      </div>

      <div class="mt-1 lg:mt-2">
        ${getClockSpeedFractionsText(secondDuration)}
      </div>

    </div>
  `];
}
