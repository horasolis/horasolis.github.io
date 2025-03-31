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

import http from 'http';
import path from 'path';
import fs from 'fs';
import mime from 'mime'; // For serving the correct MIME types
import open from 'open'; // Import the open module
import os from 'os'; // For getting network interfaces

const port = 3000;

// Function to list IP addresses (IPv4 and IPv6) excluding link-local IPv6 addresses
function getIPAddresses() {
  const interfaces = os.networkInterfaces();
  const ipAddresses = [];

  for (const iface of Object.values(interfaces)) {
    for (const alias of iface) {
      if (!alias.internal) {
        // Filter for IPv4 and IPv6 addresses, excluding link-local IPv6 (fe80::/10)
        if (alias.family === 'IPv4' || (alias.family === 'IPv6' && !alias.address.startsWith('fe80'))) {
          const {address, family} = alias
          ipAddresses.push({address, family});
        }
      }
    }
  }

  return ipAddresses;
}

// Create the server
const server = http.createServer((req, res) => {
  // Construct the full file path by appending the requested URL to the 'docs' folder
  const filePath = path.join(process.cwd(), 'docs', req.url === '/' ? 'index.html' : req.url);

  // Read the file and check if it exists inside the callback
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // If file doesn't exist or any other error, send a 404
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    // Get the file's MIME type based on its extension
    const mimeType = mime.getType(filePath) || 'application/octet-stream';

    // Disable caching by setting cache-related headers
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    // Send the file content with the correct MIME type
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(data);
  });
});

// Start the server listening on all interfaces
server.listen(port, '0.0.0.0', () => {
  // Log the IP addresses and port to the console
  console.log(`Server is running and listening on on the following IP addresses and port:`);
  console.log(`Loopback - http://localhost:${port}/`);

  const ipAddresses = getIPAddresses();
  ipAddresses.forEach(({address, family}) => { console.log(`    ${family} - http://${family === 'IPv6' ? `[${address}]` : address}:${port}/`) });

  // Automatically open the web browser to the server URL
  open(`http://localhost:${port}`);
});
