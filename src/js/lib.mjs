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

import { getCurrentTimezonePosition } from "./timezonePosition.mjs";

/**
 * Retrieves the user's geolocation, either from `localStorage` or by requesting it from the browser.
 * If geolocation data is found in `localStorage` and is recent enough, it returns the stored location.
 * Otherwise, it attempts to retrieve the user's current geolocation using the browser's geolocation API.
 * The location is then stored in `localStorage` for future use.
 * 
 * This function returns a promise that resolves with an object containing:
 * - `latitude`: The latitude of the user's location.
 * - `longitude`: The longitude of the user's location.
 * - `timestamp`: The timestamp of when the geolocation data was recorded.
 * 
 * If geolocation is not available, or if there is an error retrieving the location, the promise is rejected.
 * In such cases, it will attempt to return the most recent valid geolocation data from `localStorage` if available.
 *
 * @returns {Promise<{latitude: number, longitude: number, timestamp: number}>} A promise that resolves with an object containing the user's latitude, longitude, and timestamp of the location data.
 * 
 * @throws {Error} If geolocation is not available and there is no stored location in `localStorage`.
 */
export function locateUser() {
  // Get the stringified object from localStorage
  const storedLocationRaw = localStorage.getItem('user-location');

  // Convert the string back into an object, or null if not available
  const storedLocation = storedLocationRaw ? JSON.parse(storedLocationRaw) : null;

  // Check if there is data stored in localStorage and if it is recent enough
  if (storedLocation) {
    // Set maximumAge to avoid hitting API rate limits, longer for desktop, shorter for mobile
    // TODO: Further investigate the appropriate maximum age to avoid hitting API rate limits
    const maximumAge = ((navigator.userAgentData && navigator.userAgentData.mobile) ? 1 : 24) * (60 * 60 * 1000);

    // Check if the stored location is within the maximum acceptable age (e.g., 1 hour for mobile, 1 day for desktop)
    if (storedLocation.timestamp >= (Date.now() - maximumAge)) {
      // Return stored location if it is valid (not too old)
      return Promise.resolve(storedLocation);
    }
  }

  // Check if geolocation API is supported by the browser
  if (!navigator.geolocation) {
    console.log('Geolocation is not available');

    // If geolocation is not available, return stored location if available, otherwise reject the promise
    if (storedLocation) {
      return Promise.resolve(storedLocation);
    }

    const timezonePosition = getCurrentTimezonePosition();

    if (timezonePosition) {
      return Promise.resolve(timezonePosition);
    }

    return Promise.reject(new Error('Geolocation is not available and no stored location data.'));
  }

  // Use the geolocation API to get the user's current location
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Construct a simplified position object containing only the necessary data
        const { timestamp, coords: { latitude, longitude } } = position;
        const simplifiedPosition = { timestamp, latitude, longitude };

        // Save the simplified position object to localStorage for future use
        localStorage.setItem('user-location', JSON.stringify(simplifiedPosition));

        // Resolve the promise with the simplified position data
        resolve(simplifiedPosition);
      },
      (error) => {
        console.log(`Unable to perform geolocation: ${error.message} (${error.code})`);

        // If there was an error getting the geolocation, attempt to return the stored location if available
        if (storedLocation) {
          resolve(storedLocation);
          return;
        }

        const timezonePosition = getCurrentTimezonePosition();
        if (timezonePosition) {
          resolve(timezonePosition);
          return;
        }

        reject(new Error('Failed to retrieve geolocation and no stored location data.'));
      },
      { // Geolocation options
        maximumAge: 60 * 60 * 1000, // Accept a cached position up to 1 hour old (in milliseconds)
                                    //   * Chromium 130 does not use a location cache
                                    //   * Firefox 132 caches geolocation data for at least 12 hours, possibly longer
        timeout: 5 * 60 * 1000      // Time to wait for location before timing out (5 minutes, in milliseconds)
      }
    );
  });
}
