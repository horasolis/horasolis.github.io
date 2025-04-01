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

/*
```js
Intl.supportedValuesOf('timeZone')
JSON.stringify(Intl.supportedValuesOf('timeZone'));

const firefox = [];
const chrome = [];

const uniqueArray = ([...new Set([...firefox, ...chrome])]).sort();
console.log(uniqueArray);
```
*/

const timeZoneLocations = {

/*
Given a JavaScript array of timezone names, generate a JavaScript object mapping each timezone name to its geographic coordinates as follows:

* If the timezone represents a city, town or settlement, determine the geographic coordinates of its center.
* If the timezone represents a geographic region rather than a specific city, identify the largest population center (city, town, settlement or station) within the most populated area of that timezone and use the geographic coordinates of its center.
* If no major population center exists, use the geographic center of the timezone instead.

Return the results as a JavaScript object literal where each key is a timezone name from the input array and each value is a two-element array containing the latitude and longitude coordinates.
Do not include any comments.
Each timezone should be listed on a separate line in the object.
The last element in the object should be followed by a comma.
*/

'Africa/Abidjan': [5.3167, -4.0333],
'Africa/Accra': [5.6037, -0.1870],
'Africa/Addis_Ababa': [8.9806, 38.7578],
'Africa/Algiers': [36.7538, 3.0588],
'Africa/Asmara': [15.3229, 38.9251],
'Africa/Asmera': [15.3229, 38.9251],
'Africa/Bamako': [12.6392, -8.0029],
'Africa/Bangui': [4.3947, 18.5582],
'Africa/Banjul': [13.4531, -16.5790],
'Africa/Bissau': [11.8633, -15.5977],
'Africa/Blantyre': [-15.7833, 35.0167],
'Africa/Brazzaville': [-4.2634, 15.2429],
'Africa/Bujumbura': [-3.3822, 29.3644],
'Africa/Cairo': [30.0444, 31.2357],
'Africa/Casablanca': [33.5731, -7.5898],
'Africa/Ceuta': [35.888, -5.319],
'Africa/Conakry': [9.6412, -13.5784],
'Africa/Dakar': [14.6928, -17.4467],
'Africa/Dar_es_Salaam': [-6.7924, 39.2083],
'Africa/Djibouti': [11.8251, 42.5903],
'Africa/Douala': [4.0511, 9.7679],
'Africa/El_Aaiun': [27.15, -13.20],
'Africa/Freetown': [8.4657, -13.2317],
'Africa/Gaborone': [-24.6282, 25.9231],
'Africa/Harare': [-17.8292, 31.0530],
'Africa/Johannesburg': [-26.2041, 28.0473],
'Africa/Juba': [4.8517, 31.5713],
'Africa/Kampala': [0.3476, 32.5825],
'Africa/Khartoum': [15.5007, 32.5599],
'Africa/Kigali': [-1.9577, 30.1127],
'Africa/Kinshasa': [-4.4419, 15.2663],
'Africa/Lagos': [6.5244, 3.3792],
'Africa/Libreville': [0.4162, 9.4673],
'Africa/Lome': [6.1725, 1.2314],
'Africa/Luanda': [-8.8390, 13.2894],
'Africa/Lubumbashi': [-11.687, 27.4806],
'Africa/Lusaka': [-15.3875, 28.3228],
'Africa/Malabo': [3.75, 8.7833],
'Africa/Maputo': [-25.9692, 32.5732],
'Africa/Maseru': [-29.3153, 27.4869],
'Africa/Mbabane': [-26.3054, 31.1367],
'Africa/Mogadishu': [2.0371, 45.3438],
'Africa/Monrovia': [6.3, -10.8],
'Africa/Nairobi': [-1.2921, 36.8219],
'Africa/Ndjamena': [12.1348, 15.0557],
'Africa/Niamey': [13.5136, 2.112],
'Africa/Nouakchott': [18.0858, -15.9785],
'Africa/Ouagadougou': [12.3714, -1.5197],
'Africa/Porto-Novo': [6.4969, 2.6289],
'Africa/Sao_Tome': [0.3365, 6.7273],
'Africa/Timbuktu': [16.7736, -3.0026],
'Africa/Tripoli': [32.8872, 13.1913],
'Africa/Tunis': [36.8065, 10.1815],
'Africa/Windhoek': [-22.5609, 17.0658],

'America/Adak': [51.88, -176.63],
'America/Anchorage': [61.2181, -149.9003],
'America/Anguilla': [18.2206, -63.0686],
'America/Antigua': [17.117, -61.85],
'America/Araguaina': [-7.21, -48.21],
'America/Argentina/Buenos_Aires': [-34.6037, -58.3816],
'America/Argentina/Catamarca': [-28.4683, -65.7808],
'America/Argentina/ComodRivadavia': [-45.87, -67.50],
'America/Argentina/Cordoba': [-31.4201, -64.1888],
'America/Argentina/Jujuy': [-24.194, -65.297],
'America/Argentina/La_Rioja': [-29.415, -66.862],
'America/Argentina/Mendoza': [-32.8895, -68.8458],
'America/Argentina/Rio_Gallegos': [-51.623, -69.217],
'America/Argentina/Salta': [-24.7859, -65.4232],
'America/Argentina/San_Juan': [-31.5375, -68.5368],
'America/Argentina/San_Luis': [-33.300, -66.350],
'America/Argentina/Tucuman': [-26.8083, -65.2176],
'America/Argentina/Ushuaia': [-54.8019, -68.3030],
'America/Aruba': [12.5167, -70.0333],
'America/Asuncion': [-25.2637, -57.5759],
'America/Atikokan': [48.75, -91.62],
'America/Bahia': [-12.9777, -38.5016],
'America/Bahia_Banderas': [20.6534, -105.2253],
'America/Barbados': [13.096, -59.6167],
'America/Belem': [-1.4558, -48.5024],
'America/Belize': [17.5046, -88.1962],
'America/Blanc-Sablon': [51.42, -57.08],
'America/Boa_Vista': [2.8235, -60.6750],
'America/Bogota': [4.711, -74.0721],
'America/Boise': [43.615, -116.2023],
'America/Buenos_Aires': [-34.6037, -58.3816],
'America/Cambridge_Bay': [69.1167, -105.0333],
'America/Campo_Grande': [-20.4697, -54.6204],
'America/Cancun': [21.1619, -86.8515],
'America/Caracas': [10.4806, -66.9036],
'America/Catamarca': [-28.4683, -65.7808],
'America/Cayenne': [4.9224, -52.3135],
'America/Cayman': [19.3133, -81.2546],
'America/Chicago': [41.8781, -87.6298],
'America/Chihuahua': [28.6353, -106.0889],
'America/Ciudad_Juarez': [31.6904, -106.4245],
'America/Coral_Harbour': [63.75, -89.1333],
'America/Cordoba': [-31.4201, -64.1888],
'America/Costa_Rica': [9.9281, -84.0907],
'America/Creston': [49.1167, -117.5167],
'America/Cuiaba': [-15.6014, -56.0979],
'America/Curacao': [12.1696, -68.99],
'America/Danmarkshavn': [76.7667, -18.6667],
'America/Dawson': [64.0611, -139.6699],
'America/Dawson_Creek': [55.7617, -120.236],
'America/Denver': [39.7392, -104.9903],
'America/Detroit': [42.3314, -83.0458],
'America/Dominica': [15.301, -61.3883],
'America/Edmonton': [53.5461, -113.4938],
'America/Eirunepe': [-6.6422, -69.8839],
'America/El_Salvador': [13.6929, -89.2182],
'America/Ensenada': [31.8667, -116.6167],
'America/Fort_Nelson': [58.8056, -122.6],
'America/Fortaleza': [-3.7172, -38.5434],
'America/Glace_Bay': [46.1944, -59.9714],
'America/Godthab': [64.1833, -51.7214],
'America/Goose_Bay': [53.3194, -60.4614],
'America/Grand_Turk': [21.4667, -71.1333],
'America/Grenada': [12.0561, -61.7483],
'America/Guadeloupe': [16.2417, -61.5333],
'America/Guatemala': [14.6349, -90.5069],
'America/Guayaquil': [-2.17, -79.92],
'America/Guyana': [6.8013, -58.1551],
'America/Halifax': [44.6488, -63.5752],
'America/Havana': [23.1136, -82.3666],
'America/Hermosillo': [29.072967, -110.9559],
'America/Indiana/Indianapolis': [39.7684, -86.1581],
'America/Indiana/Knox': [38.683, -87.533],
'America/Indiana/Marengo': [38.75, -86.8],
'America/Indiana/Petersburg': [38.2833, -87.1333],
'America/Indiana/Tell_City': [37.95, -86.6833],
'America/Indiana/Vevay': [38.75, -85.4],
'America/Indiana/Vincennes': [38.6773, -87.5281],
'America/Indiana/Winamac': [41.0667, -86.9167],
'America/Indianapolis': [39.7684, -86.1581],
'America/Inuvik': [68.3607, -133.7233],
'America/Iqaluit': [63.7467, -68.5167],
'America/Jamaica': [17.9714, -76.7936],
'America/Jujuy': [24.1856, -65.2999],
'America/Juneau': [58.3019, -134.4197],
'America/Kentucky/Louisville': [38.2527, -85.7585],
'America/Kentucky/Monticello': [36.8401, -83.305],
'America/Kralendijk': [12.15, -68.27],
'America/La_Paz': [-16.4897, -68.1193],
'America/Lima': [-12.0464, -77.0428],
'America/Los_Angeles': [34.0522, -118.2437],
'America/Louisville': [38.2527, -85.7585],
'America/Lower_Princes': [17.5, -62.9833],
'America/Maceio': [-9.6658, -35.735],
'America/Managua': [12.1364, -86.2514],
'America/Manaus': [-3.119, -60.0217],
'America/Marigot': [18.0667, -63.0833],
'America/Martinique': [14.6167, -61],
'America/Matamoros': [25.87, -97.5],
'America/Mazatlan': [23.2494, -106.4111],
'America/Mendoza': [-32.8895, -68.8458],
'America/Menominee': [45.1077, -87.6346],
'America/Merida': [20.9674, -89.5926],
'America/Metlakatla': [55.22, -131.5311],
'America/Mexico_City': [19.4326, -99.1332],
'America/Miquelon': [47.0667, -56.3333],
'America/Moncton': [46.0878, -64.7782],
'America/Monterrey': [25.6866, -100.3161],
'America/Montevideo': [-34.9011, -56.1645],
'America/Montreal': [45.5017, -73.5673],
'America/Montserrat': [16.7425, -62.1875],
'America/Nassau': [25.0343, -77.3963],
'America/New_York': [40.7128, -74.006],
'America/Nipigon': [49.0167, -88.5833],
'America/Nome': [64.5011, -165.4064],
'America/Noronha': [-3.857, -32.431],
'America/North_Dakota/Beulah': [47.2833, -101.8167],
'America/North_Dakota/Center': [46.9333, -100.75],
'America/North_Dakota/New_Salem': [46.85, -100.0],
'America/Nuuk': [64.1833, -51.7214],
'America/Ojinaga': [29.5833, -104.2833],
'America/Panama': [8.9833, -79.5167],
'America/Pangnirtung': [66.1333, -65.7167],
'America/Paramaribo': [5.8667, -55.1667],
'America/Phoenix': [33.4484, -112.074],
'America/Port-au-Prince': [18.5392, -72.336],
'America/Port_of_Spain': [10.6667, -61.5167],
'America/Porto_Velho': [-8.7612, -63.9039],
'America/Puerto_Rico': [18.4655, -66.1057],
'America/Punta_Arenas': [-53.1638, -70.9171],
'America/Rainy_River': [48.7667, -94.5],
'America/Rankin_Inlet': [62.8167, -92.0833],
'America/Recife': [-8.0476, -34.877],
'America/Regina': [50.4452, -104.6189],
'America/Resolute': [74.7167, -94.9667],
'America/Rio_Branco': [-9.975, -67.824],
'America/Rosario': [-32.9468, -60.6393],
'America/Santarem': [-2.4381, -54.6996],
'America/Santiago': [-33.4489, -70.6693],
'America/Santo_Domingo': [18.4861, -69.9312],
'America/Sao_Paulo': [-23.5505, -46.6333],
'America/Scoresbysund': [70.4833, -21.9667],
'America/Sitka': [57.0531, -135.33],
'America/St_Barthelemy': [17.9, -62.8333],
'America/St_Johns': [47.5615, -52.7126],
'America/St_Kitts': [17.3, -62.717],
'America/St_Lucia': [14.0101, -61.009],
'America/St_Thomas': [18.3358, -64.8963],
'America/St_Vincent': [13.1567, -61.2248],
'America/Swift_Current': [50.2833, -107.8],
'America/Tegucigalpa': [14.0723, -87.1921],
'America/Thule': [76.5311, -68.7031],
'America/Thunder_Bay': [48.3809, -89.2477],
'America/Tijuana': [32.5149, -117.0382],
'America/Toronto': [43.65107, -79.347015],
'America/Tortola': [18.4167, -64.6167],
'America/Vancouver': [49.2827, -123.1207],
'America/Whitehorse': [60.7167, -135.05],
'America/Winnipeg': [49.8951, -97.1384],
'America/Yakutat': [59.5461, -139.7278],
'America/Yellowknife': [62.454, -114.3718],

'Asia/Aden': [12.785, 45.0186],
'Asia/Almaty': [43.238949, 76.889709],
'Asia/Amman': [31.9539, 35.9106],
'Asia/Anadyr': [64.7333, 177.5167],
'Asia/Aqtau': [44.843, 50.9761],
'Asia/Aqtobe': [50.2833, 57.1667],
'Asia/Ashgabat': [37.9601, 58.3261],
'Asia/Atyrau': [47.1167, 51.9333],
'Asia/Baghdad': [33.3128, 44.3615],
'Asia/Bahrain': [26.0667, 50.5577],
'Asia/Baku': [40.4093, 49.8671],
'Asia/Bangkok': [13.7563, 100.5018],
'Asia/Barnaul': [53.3479, 83.7784],
'Asia/Beirut': [33.8938, 35.5018],
'Asia/Bishkek': [42.8746, 74.6122],
'Asia/Brunei': [4.9031, 114.9398],
'Asia/Calcutta': [22.5726, 88.3639],
'Asia/Chita': [52.0333, 113.4667],
'Asia/Choibalsan': [48.0667, 114.5],
'Asia/Chongqing': [29.563, 106.5516],
'Asia/Colombo': [6.9271, 79.8612],
'Asia/Damascus': [33.5138, 36.2765],
'Asia/Dhaka': [23.8103, 90.4125],
'Asia/Dili': [-8.5569, 125.5603],
'Asia/Dubai': [25.2048, 55.2708],
'Asia/Dushanbe': [38.5598, 68.787],
'Asia/Famagusta': [35.1264, 33.4299],
'Asia/Gaza': [31.5018, 34.4669],
'Asia/Harbin': [45.8038, 126.5349],
'Asia/Hebron': [31.532, 35.0998],
'Asia/Ho_Chi_Minh': [10.8231, 106.6297],
'Asia/Hong_Kong': [22.3193, 114.1694],
'Asia/Hovd': [48.006, 91.667],
'Asia/Irkutsk': [52.2833, 104.2833],
'Asia/Jakarta': [-6.2088, 106.8456],
'Asia/Jayapura': [-2.5333, 140.7167],
'Asia/Jerusalem': [31.7683, 35.2137],
'Asia/Kabul': [34.5553, 69.2075],
'Asia/Kamchatka': [53.0167, 158.65],
'Asia/Karachi': [24.8607, 67.0011],
'Asia/Kashgar': [39.4704, 75.9898],
'Asia/Kathmandu': [27.7172, 85.324],
'Asia/Katmandu': [27.7172, 85.324],
'Asia/Khandyga': [62.0, 135.0],
'Asia/Kolkata': [22.5726, 88.3639],
'Asia/Krasnoyarsk': [56.0153, 92.8932],
'Asia/Kuala_Lumpur': [3.139, 101.6869],
'Asia/Kuching': [1.5491, 110.3639],
'Asia/Kuwait': [29.3759, 47.9774],
'Asia/Macau': [22.1987, 113.5439],
'Asia/Magadan': [59.5613, 150.8081],
'Asia/Makassar': [-5.1477, 119.4327],
'Asia/Manila': [14.5995, 120.9842],
'Asia/Muscat': [23.5859, 58.4059],
'Asia/Nicosia': [35.1856, 33.3823],
'Asia/Novokuznetsk': [53.75, 87.1167],
'Asia/Novosibirsk': [55.0084, 82.9357],
'Asia/Omsk': [54.9885, 73.3242],
'Asia/Oral': [51.2172, 51.375],
'Asia/Phnom_Penh': [11.5564, 104.9282],
'Asia/Pontianak': [-0.03, 109.3333],
'Asia/Pyongyang': [39.0194, 125.7548],
'Asia/Qatar': [25.2854, 51.441],
'Asia/Qostanay': [53.2, 63.6167],
'Asia/Qyzylorda': [44.8486, 65.5],
'Asia/Rangoon': [16.8661, 96.1951],
'Asia/Riyadh': [24.7136, 46.6753],
'Asia/Saigon': [10.8231, 106.6297],
'Asia/Sakhalin': [50.75, 142.8333],
'Asia/Samarkand': [39.6542, 66.9597],
'Asia/Seoul': [37.5665, 126.978],
'Asia/Shanghai': [31.2304, 121.4737],
'Asia/Singapore': [1.3521, 103.8198],
'Asia/Srednekolymsk': [66.5333, 152.1333],
'Asia/Taipei': [25.033, 121.5654],
'Asia/Tashkent': [41.2995, 69.2401],
'Asia/Tbilisi': [41.7151, 44.8271],
'Asia/Tehran': [35.6892, 51.389],
'Asia/Tel_Aviv': [32.0853, 34.7818],
'Asia/Thimphu': [27.4728, 89.639],
'Asia/Tokyo': [35.6895, 139.6917],
'Asia/Tomsk': [56.4977, 84.9744],
'Asia/Ulaanbaatar': [47.8864, 106.9057],
'Asia/Urumqi': [43.8256, 87.6168],
'Asia/Ust-Nera': [64.6667, 143.2],
'Asia/Vientiane': [17.9757, 102.6331],
'Asia/Vladivostok': [43.1155, 131.8855],
'Asia/Yakutsk': [62.0355, 129.6755],
'Asia/Yangon': [16.8409, 96.1735],
'Asia/Yekaterinburg': [56.8389, 60.6057],
'Asia/Yerevan': [40.1792, 44.4991],

'Atlantic/Azores': [37.74, -25.67],
'Atlantic/Bermuda': [32.293, -64.781],
'Atlantic/Canary': [28.123, -15.436],
'Atlantic/Cape_Verde': [14.933, -23.5133],
'Atlantic/Faeroe': [62.0079, -6.787],
'Atlantic/Faroe': [62.0079, -6.787],
'Atlantic/Jan_Mayen': [70.9333, -8.6833],
'Atlantic/Madeira': [32.6669, -16.9093],
'Atlantic/Reykjavik': [64.1466, -21.9426],
'Atlantic/South_Georgia': [-54.2833, -36.55],
'Atlantic/St_Helena': [-15.965, -5.708],
'Atlantic/Stanley': [-51.6985, -57.8512],

'Australia/Adelaide': [-34.9285, 138.6007],
'Australia/Brisbane': [-27.4698, 153.0251],
'Australia/Broken_Hill': [-31.9533, 141.456],
'Australia/Currie': [-39.8333, 143.9667],
'Australia/Darwin': [-12.4634, 130.8456],
'Australia/Eucla': [-31.7, 128.87],
'Australia/Hobart': [-42.8821, 147.3272],
'Australia/Lindeman': [-20.267, 148.716],
'Australia/Lord_Howe': [-31.532, 159.078],
'Australia/Melbourne': [-37.8136, 144.9631],
'Australia/Perth': [-31.9505, 115.8605],
'Australia/Sydney': [-33.8688, 151.2093],

'Europe/Amsterdam': [52.3676, 4.9041],
'Europe/Andorra': [42.5063, 1.5218],
'Europe/Astrakhan': [46.3499, 48.0333],
'Europe/Athens': [37.9838, 23.7275],
'Europe/Belfast': [54.5973, -5.9301],
'Europe/Belgrade': [44.7866, 20.4489],
'Europe/Berlin': [52.5200, 13.4050],
'Europe/Bratislava': [48.1486, 17.1077],
'Europe/Brussels': [50.8503, 4.3517],
'Europe/Bucharest': [44.4268, 26.1025],
'Europe/Budapest': [47.4979, 19.0402],
'Europe/Busingen': [47.67, 8.62],
'Europe/Chisinau': [47.0105, 28.8638],
'Europe/Copenhagen': [55.6761, 12.5683],
'Europe/Dublin': [53.3498, -6.2603],
'Europe/Gibraltar': [36.1408, -5.3536],
'Europe/Guernsey': [49.45, -2.5333],
'Europe/Helsinki': [60.1699, 24.9384],
'Europe/Isle_of_Man': [54.15, -4.48],
'Europe/Istanbul': [41.0082, 28.9784],
'Europe/Jersey': [49.1875, -2.1039],
'Europe/Kaliningrad': [54.7104, 20.4522],
'Europe/Kiev': [50.4501, 30.5234],
'Europe/Kirov': [58.6036, 49.6686],
'Europe/Kyiv': [50.4501, 30.5234],
'Europe/Lisbon': [38.7223, -9.1393],
'Europe/Ljubljana': [46.0569, 14.5058],
'Europe/London': [51.5074, -0.1278],
'Europe/Luxembourg': [49.6116, 6.1319],
'Europe/Madrid': [40.4168, -3.7038],
'Europe/Malta': [35.8997, 14.5147],
'Europe/Mariehamn': [60.0979, 19.9346],
'Europe/Minsk': [53.9, 27.5667],
'Europe/Monaco': [43.7384, 7.4246],
'Europe/Moscow': [55.7558, 37.6173],
'Europe/Oslo': [59.9139, 10.7522],
'Europe/Paris': [48.8566, 2.3522],
'Europe/Podgorica': [42.441, 19.2636],
'Europe/Prague': [50.0755, 14.4378],
'Europe/Riga': [56.9496, 24.1052],
'Europe/Rome': [41.9028, 12.4964],
'Europe/Samara': [53.1959, 50.1008],
'Europe/San_Marino': [43.9424, 12.4578],
'Europe/Sarajevo': [43.8563, 18.4131],
'Europe/Saratov': [51.5333, 46.0333],
'Europe/Simferopol': [44.9521, 34.1024],
'Europe/Skopje': [41.9981, 21.4254],
'Europe/Sofia': [42.6977, 23.3219],
'Europe/Stockholm': [59.3293, 18.0686],
'Europe/Tallinn': [59.437, 24.7536],
'Europe/Tirane': [41.3275, 19.8187],
'Europe/Tiraspol': [46.8378, 29.647],
'Europe/Ulyanovsk': [54.3167, 48.4],
'Europe/Uzhgorod': [48.6208, 22.2879],
'Europe/Vaduz': [47.141, 9.5215],
'Europe/Vatican': [41.9029, 12.4534],
'Europe/Vienna': [48.2082, 16.3738],
'Europe/Vilnius': [54.6872, 25.2797],
'Europe/Volgograd': [48.708, 44.5133],
'Europe/Warsaw': [52.2297, 21.0122],
'Europe/Zagreb': [45.815, 15.9819],
'Europe/Zaporozhye': [47.8388, 35.1396],
'Europe/Zurich': [47.3769, 8.5417],

'Indian/Antananarivo': [-18.8792, 47.5079],
'Indian/Chagos': [-7.3, 72.4],
'Indian/Christmas': [-10.45, 105.69],
'Indian/Cocos': [-12.1167, 96.8833],
'Indian/Comoro': [-11.7, 43.2333],
'Indian/Kerguelen': [-49.35, 70.18],
'Indian/Mahe': [-4.6167, 55.45],
'Indian/Maldives': [4.1753, 73.5093],
'Indian/Mauritius': [20.1667, 57.5],
'Indian/Mayotte': [-12.7825, 45.2272],
'Indian/Reunion': [-20.8821, 55.45],

'Pacific/Apia': [-13.8333, -171.7500],
'Pacific/Auckland': [-36.8485, 174.7633],
'Pacific/Bougainville': [-4.2500, 154.0167],
'Pacific/Chatham': [-43.95, -176.55],
'Pacific/Chuuk': [7.5, 151.8],
'Pacific/Easter': [-27.1127, -109.3497],
'Pacific/Efate': [-17.7333, 168.3167],
'Pacific/Enderbury': [-3.2667, -171.9167],
'Pacific/Fakaofo': [-9.2333, -171.7667],
'Pacific/Fiji': [-18.1248, 178.4501],
'Pacific/Funafuti': [-8.5167, 179.2167],
'Pacific/Galapagos': [-0.6667, -90.3333],
'Pacific/Gambier': [-23.0333, -134.9833],
'Pacific/Guadalcanal': [-9.4333, 159.95],
'Pacific/Guam': [13.4667, 144.7333],
'Pacific/Honolulu': [21.3069, -157.8583],
'Pacific/Johnston': [16.7286, -169.5333],
'Pacific/Kanton': [-2.767, -171.883],
'Pacific/Kiritimati': [1.8721, -157.4278],
'Pacific/Kosrae': [5.3167, 162.9833],
'Pacific/Kwajalein': [8.7167, 167.7333],
'Pacific/Majuro': [7.1167, 171.3833],
'Pacific/Marquesas': [8.780, -139.280],
'Pacific/Midway': [28.2000, -177.3500],
'Pacific/Nauru': [-0.5333, 166.9167],
'Pacific/Niue': [-19.0544, -169.8670],
'Pacific/Norfolk': [-29.04, 167.96],
'Pacific/Noumea': [-22.2558, 166.4505],
'Pacific/Pago_Pago': [-14.2756, -170.7020],
'Pacific/Palau': [7.3333, 134.4833],
'Pacific/Pitcairn': [-25.0667, -130.1000],
'Pacific/Pohnpei': [6.9667, 158.2167],
'Pacific/Ponape': [6.9667, 158.2167],
'Pacific/Port_Moresby': [-9.4438, 147.1841],
'Pacific/Rarotonga': [-21.2000, -159.7667],
'Pacific/Saipan': [15.1778, 145.7500],
'Pacific/Tahiti': [-17.5333, -149.5667],
'Pacific/Tarawa': [1.3292, 173.0000],
'Pacific/Tongatapu': [-21.1394, -175.2018],
'Pacific/Truk': [7.5, 151.8],
'Pacific/Wake': [19.2833, 166.6000],
'Pacific/Wallis': [-13.2850, -176.1825],

/*
Given a JavaScript array of timezone names, generate a JavaScript object mapping each timezone name to its geographic coordinates as follows:

* If the timezone represents a city, town or settlement, determine the geographic coordinates of its center.
* If the timezone represents a geographic region rather than a specific city, identify the largest population center (city, town, settlement or station) within the most populated area of that timezone and use the geographic coordinates of its center.
* If no major population center exists, use the geographic center of the timezone instead.

Return the results as a JavaScript object literal where each key is a timezone name from the input array and each value is a two-element array containing the latitude and longitude coordinates.
Include a comment for each entry indicating the name of the location used and its country.
Each timezone should be listed on a separate line in the object.
The last element in the object should be followed by a comma.
*/

'Antarctica/Casey': [-66.283, 110.517], // Casey Station, Australia
'Antarctica/Davis': [-68.5769, 77.9675], // Davis Station, Australia
'Antarctica/DumontDUrville': [-66.667, 140.017], // Dumont d'Urville Station, France
'Antarctica/Macquarie': [-54.5, 158.95], // Macquarie Island, Australia
'Antarctica/Mawson': [-67.600, 62.867], // Mawson Station, Australia
'Antarctica/McMurdo': [-77.8419, 166.6863], // McMurdo Station, USA
'Antarctica/Palmer': [-64.772, -64.053], // Palmer Station, USA
'Antarctica/Rothera': [-67.568, -68.122], // Rothera Research Station, United Kingdom
'Antarctica/Syowa': [-69.000, 39.5833], // Syowa Station, Japan
'Antarctica/Troll': [-72.017, 2.533], // Troll Station, Norway
'Antarctica/Vostok': [-78.450, 106.867], // Vostok Station, Russia
'Arctic/Longyearbyen': [78.2232, 15.6469], // Longyearbyen, Norway

'CET': [48.8566, 2.3522], // Paris, France
'CST6CDT': [41.8781, -87.6298], // Chicago, USA
'EET': [30.0444, 31.2357], // Cairo, Egypt
'EST': [40.7128, -74.0060], // New York City, USA
'EST5EDT': [40.7128, -74.0060], // New York City, USA
'Factory': [51.4779, -0.0015], // Royal Observatory, Greenwich
'HST': [21.3069, -157.8583], // Honolulu, USA
'MET': [52.5200, 13.4050], // Berlin, Germany
'MST': [33.4484, -112.0740], // Phoenix, USA
'MST7MDT': [39.7392, -104.9903], // Denver, USA
'PST8PDT': [34.0522, -118.2437], // Los Angeles, USA
'UTC': [51.5074, -0.1278], // London, United Kingdom
'WET': [38.7223, -9.1393], // Lisbon, Portugal

'Etc/GMT-1': [6.5244, 3.3792], // Lagos, Nigeria
'Etc/GMT-2': [30.0444, 31.2357], // Cairo, Egypt
'Etc/GMT-3': [55.7558, 37.6173], // Moscow, Russia
'Etc/GMT-4': [25.2048, 55.2708], // Dubai, United Arab Emirates
'Etc/GMT-5': [24.8607, 67.0011], // Karachi, Pakistan
'Etc/GMT-6': [23.8103, 90.4125], // Dhaka, Bangladesh
'Etc/GMT-7': [-6.2088, 106.8456], // Jakarta, Indonesia
'Etc/GMT-8': [39.9042, 116.4074], // Beijing, China
'Etc/GMT-9': [35.6895, 139.6917], // Tokyo, Japan
'Etc/GMT-10': [-33.8688, 151.2093], // Sydney, Australia
'Etc/GMT-11': [-9.4456, 160.1562], // Honiara, Solomon Islands
'Etc/GMT-12': [-36.8485, 174.7633], // Auckland, New Zealand
'Etc/GMT-13': [-13.8333, -171.7500], // Apia, Samoa
'Etc/GMT-14': [1.8721, -157.4278], // Kiritimati, Kiribati

'Etc/GMT+1': [14.9330, -23.5133], // Praia, Cape Verde
'Etc/GMT+2': [-3.857, -32.431], // Fernando de Noronha, Brazil
'Etc/GMT+3': [-23.5505, -46.6333], // Sao Paulo, Brazil
'Etc/GMT+4': [10.4806, -66.9036], // Caracas, Venezuela
'Etc/GMT+5': [40.7128, -74.0060], // New York, USA
'Etc/GMT+6': [19.4326, -99.1332], // Mexico City, Mexico
'Etc/GMT+7': [33.4484, -112.0740], // Phoenix, USA
'Etc/GMT+8': [34.0522, -118.2437], // Los Angeles, USA
'Etc/GMT+9': [61.2181, -149.9003], // Anchorage, USA
'Etc/GMT+10': [21.3069, -157.8583], // Honolulu, USA
'Etc/GMT+11': [-14.2756, -170.7020], // Pago Pago, American Samoa
'Etc/GMT+12': [0.193, -176.476], // Baker Island, USA
};

export function getCurrentTimezonePosition() {
  const location = timeZoneLocations[Intl.DateTimeFormat().resolvedOptions().timeZone];
  if (location) {
    return {
      latitude: location[0],
      longitude: location[1],
      isTimeZoneDerivedPosition: true 
    };
  }
  return null;
}
