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

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * Calculates the SHA-256 hash of a file and returns the first 8 characters.
 * Returns null if the file cannot be read.
 *
 * @param {string} filePath - The path to the file to be hashed.
 * @returns {string | null} The first 8 characters of the file's hash, or null on error.
 */
function calculateFileHash(filePath) {
  try {
    // Read file content as a Buffer.
    const fileContent = fs.readFileSync(filePath);

    // Create the SHA-256 hash and convert to hexadecimal string.
    const hash = crypto.createHash('sha256').update(fileContent).digest('hex');

    return hash.substring(0, 8);

  } catch (error) {
    console.error(`Failed to calculate hash: Error reading file "${filePath}": ${error.message}`);
    return null;
  }
}

/**
 * Updates asset version parameters in an HTML file by appending SHA-256 hash values.
 * This process helps with cache busting for assets referenced in script and link tags.
 *
 * @param {string} htmlFilePath - The path to the HTML file.
 * @param {string} basePath - Base directory for resolving relative asset URLs.
 */
function updateAssetVersions(htmlFilePath, basePath) {
  try {
    // Read the HTML file content using UTF-8 encoding.
    const fileContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Regex explanation:
    // * Matches <script> or <link> tags with src or href attributes that include a version parameter (?v)
    // * Uses named capture groups to extract parts of the tag: pre, url, and post.
    const regex = /(?<pre><(?:script|link)(?= )[^>]*(?<= )(?:src|href) *= *(?<quote>["']))(?<url>.+?)\?v(?:=[A-Za-z0-9]*)?(?<post>\k<quote>(?=[ >]).*?>)/gi;
    
    // Replace each asset URL with an updated version that includes a new hash.
    const updatedContent = fileContent.replace(regex, (match, ...args) => {
      // The last argument contains the named capture groups.
      const { pre, url, post } = args.at(-1);

      // Skip processing for external URLs (e.g., starting with http:// or https://).
      if (/^(https?:)?\/\//i.test(url)) {
        return match;
      }
      
      // Construct the full path to the asset.
      const fullPath = path.join(basePath, url);
      const hash = calculateFileHash(fullPath);
      
      if (hash) {
        console.log(`Asset "${url}" version determined as "?v=${hash}"`);
        return `${pre}${url}?v=${hash}${post}`;
      }
      
      // If no hash was generated, leave the tag unchanged.
      return match;
    });
    
    // Write the updated content back to the HTML file if any changes were made.
    if (fileContent === updatedContent) {
      console.log(`No asset updates were necessary in "${htmlFilePath}".`);
      return;
    }

    try {
      fs.writeFileSync(htmlFilePath, updatedContent, 'utf8');
      console.log(`HTML file "${htmlFilePath}" has been successfully updated.`);
    } catch (error) {
      console.error(`Failed to write updated HTML file "${htmlFilePath}": ${error.message}`);
    }
    
  } catch (error) {
    console.error(`Error processing HTML file "${htmlFilePath}": ${error.message}`);
  }
}

/**
 * Entry point: Validates CLI arguments and starts processing the HTML file.
 */

// Validate command line arguments.
if (process.argv.length < 3) {
  console.error('Usage: node html-assets-hash.mjs <html-file-path> [base-path]');
  process.exit(1);
}

const htmlFilePath = process.argv[2];

// Use the directory of the HTML file as the default base path if none is provided.
const basePath = process.argv[3] || path.dirname(htmlFilePath);

console.log(`Starting processing for HTML file: "${htmlFilePath}"`);
console.log(`Resolving asset paths using base directory: "${basePath}"`);

updateAssetVersions(htmlFilePath, basePath);
