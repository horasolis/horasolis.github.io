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

import {
  getHoursMinutesText,
  getClockSpeedFractionsText,
  getTimeText,
  calculateDayHourProgress,
  calculateNightVigiliaProgress,
  calculateDayBedtimeHeight,
  calculateNightBedtimeHeight
} from './viewHelpers.mjs';

import {numbersText} from './locale.mjs';

export function clockView(clockViewData) {
  const view = [];

  view.push(`<div class="container mx-auto mb-4 sm:px-4">`);

  view.push(...naturalDayView(clockViewData));
  view.push(...statusLinesView(clockViewData));

  view.push(`</div>`);

  return view;
}

function naturalDayView({naturalDay, naturalBedtime}) {
  const view = []

  view.push(`
    <div class="mt-4 grid grid-cols-2 place-items-center text-center text-xs font-bold tracking-widest sm:mt-6 sm:text-sm lg:mt-8 lg:text-base">
      <div class="text-amber-500 dark:text-yellow-100">TEMPUS 🌞 DIEI</div>
      <div class="text-indigo-500 dark:text-purple-100">TEMPUS 🌚 NOCTIS</div>
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
    view.push(`<div class="absolute inset-x-3 inset-y-0 z-40 flex items-center font-bold text-gray-800 lg:text-lg dark:text-yellow-50">${timeText}</div>`);
  
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
      view.push(`<div class="absolute inset-x-10 bottom-0 z-20 bg-fuchsia-300/40 sm:inset-x-16 lg:inset-x-28 dark:bg-rose-300/40" style="height: ${bedtimeHeight}%">`);

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
      <div class="absolute inset-x-2 inset-y-0 z-30 text-center text-xs font-extrabold leading-none tracking-widest text-gray-50 lg:text-sm dark:text-purple-50" style="writing-mode: vertical-rl; text-orientation: sideways;">
        VIGILIA&ensp;${numbersText[vigiliaLine].toUpperCase()}
      </div>
    `);

    // Hour blocks
    for (let line = 0; line < 3; line++) {
      // Hour line start
      view.push(`<div class="relative z-40 mr-8 h-[48px] border-b-4 ${line < 2 ? 'border-dashed border-white dark:border-stone-600' : 'border-transparent'} lg:h-[56px]">`);

      // Time text
      const timeText = getTimeText(vigiliaLine * 3 + line, hour, minute, second, !isDay);
      view.push(`<div class="absolute inset-x-3 inset-y-0 z-50 flex items-center font-bold text-gray-800 lg:text-lg dark:text-purple-50">${timeText}</div>`);
    
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
      <span class="text-amber-500 dark:text-yellow-100">DIU 🌞</span> ET <span class="text-indigo-500 dark:text-purple-100">NOX 🌚</span> DURATIO
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
        Tempus ad somnum quaerendum 🛏️&nbsp;${bedtime.toLocaleString(navigator.languages, {timeStyle: 'short'})}
      </div>

      <div class="mt-1 lg:mt-2">
        Ortus solis diei sequentis ⏭️🌅&nbsp;${nextSunrise.toLocaleString(navigator.languages, {timeStyle: 'short'})}
      </div>

      <div class="mt-1 lg:mt-2">
        ${getClockSpeedFractionsText(secondDuration)}
      </div>

    </div>
  `];
}
