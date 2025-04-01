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

import { clockView } from "./view.mjs";
import { getNaturalDay } from "./romanClock.mjs";
import { locateUser } from "./lib.mjs";
import { Temporal } from 'temporal-polyfill';

function runClock(position) {
  const now = Temporal.Now.zonedDateTimeISO();
  const naturalDay = getNaturalDay(position, now);

  const {isPolarPhenomenon} = naturalDay;

  const view = [];

  if (isPolarPhenomenon) {
    view.push('Phaenomenon polare eo die fit 🐧');
  } else {
    const {nextSunrise, calculateTimeWithin, durationUntilNextSecond} = naturalDay;
    const bedtime = nextSunrise.subtract({hours: 8, minutes: 20});
    const naturalBedtime = calculateTimeWithin(bedtime);

    view.push(...clockView({now, naturalDay, bedtime, naturalBedtime}));;

    setTimeout(() => {
      runClock(position);
    }, durationUntilNextSecond);
  }

  document.getElementById('time-display').innerHTML = view.join('');
}

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('details-toggle').addEventListener('click', function () {
    const detailsSection = document.getElementById('details-section');
    const isHidden = detailsSection.classList.contains('hidden');
    detailsSection.classList.toggle('hidden');
    this.textContent = isHidden ? 'Fold this description' : '🤷 Quid est hoc?';
  });

  locateUser()
    .then(
      (position) => {
        runClock(position);
      },
      (error) => {
        console.log('Error in locateUser().then()', error);
      }
    )
    .catch((error) => {
      console.log('Error in locateUser()', error);
    });
});
