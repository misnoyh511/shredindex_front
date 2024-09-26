const continents = [
  {
    name: 'Africa',
    code: 'AF',
    continent_id: 1,
  },
  {
    name: 'Antarctica',
    code: 'AN',
    continent_id: 2,
  },
  {
    name: 'Asia',
    code: 'AS',
    continent_id: 3,
  },
  {
    name: 'Oceania',
    code: 'OC',
    continent_id: 4,
  },
  {
    name: 'Europe',
    code: 'EU',
    continent_id: 5,
  },
  {
    name: 'North America',
    code: 'NA',
    continent_id: 6,
  },
  {
    name: 'South America',
    code: 'SA',
    continent_id: 7,
  },
];

const countryContinentMap = {
  // Africa
  DZ: 'AF',
  AO: 'AF',
  BJ: 'AF',
  BW: 'AF',
  BF: 'AF',
  BI: 'AF',
  CM: 'AF',
  CV: 'AF',
  CF: 'AF',
  TD: 'AF',
  KM: 'AF',
  CI: 'AF',
  CD: 'AF',
  DJ: 'AF',
  EG: 'AF',
  GQ: 'AF',
  ER: 'AF',
  ET: 'AF',
  GA: 'AF',
  GM: 'AF',
  GH: 'AF',
  GN: 'AF',
  GW: 'AF',
  KE: 'AF',
  LS: 'AF',
  LR: 'AF',
  LY: 'AF',
  MG: 'AF',
  MW: 'AF',
  ML: 'AF',
  MR: 'AF',
  MA: 'AF',
  MZ: 'AF',
  NA_: 'AF',
  NE: 'AF',
  NG: 'AF',
  RW: 'AF',
  SN: 'AF',
  SC: 'AF',
  SL: 'AF',
  SO: 'AF',
  ZA: 'AF',
  SS: 'AF',
  SD: 'AF',
  SZ: 'AF',
  TZ: 'AF',
  TG: 'AF',
  TN: 'AF',
  UG: 'AF',
  ZM: 'AF',
  ZW: 'AF',

  // Asia
  AF_: 'AS',
  AM: 'AS',
  AZ: 'AS',
  BH: 'AS',
  BD: 'AS',
  BT: 'AS',
  BN: 'AS',
  KH: 'AS',
  CN: 'AS',
  CY: 'AS',
  GE: 'AS',
  IN: 'AS',
  ID: 'AS',
  IR: 'AS',
  IQ: 'AS',
  IL: 'AS',
  JP: 'AS',
  JO: 'AS',
  KZ: 'AS',
  KW: 'AS',
  KG: 'AS',
  LA: 'AS',
  LB: 'AS',
  MY: 'AS',
  MV: 'AS',
  MN: 'AS',
  MM: 'AS',
  NP: 'AS',
  KP: 'AS',
  OM: 'AS',
  PK: 'AS',
  PS: 'AS',
  PH: 'AS',
  QA: 'AS',
  SA_: 'AS',
  SG: 'AS',
  KR: 'AS',
  LK: 'AS',
  SY: 'AS',
  TW: 'AS',
  TJ: 'AS',
  TH: 'AS',
  TL: 'AS',
  TR: 'AS',
  TM: 'AS',
  AE: 'AS',
  UZ: 'AS',
  VN: 'AS',
  YE: 'AS',

  // Europe
  AL: 'EU',
  AD: 'EU',
  AT: 'EU',
  BY: 'EU',
  BE: 'EU',
  BA: 'EU',
  BG: 'EU',
  HR: 'EU',
  CZ: 'EU',
  DK: 'EU',
  EE: 'EU',
  FI: 'EU',
  FR: 'EU',
  DE: 'EU',
  GR: 'EU',
  HU: 'EU',
  IS: 'EU',
  IE: 'EU',
  IT: 'EU',
  LV: 'EU',
  LI: 'EU',
  LT: 'EU',
  LU: 'EU',
  MT: 'EU',
  MD: 'EU',
  MC: 'EU',
  ME: 'EU',
  NL: 'EU',
  MK: 'EU',
  NO: 'EU',
  PL: 'EU',
  PT: 'EU',
  RO: 'EU',
  RU: 'EU',
  SM: 'EU',
  RS: 'EU',
  SK: 'EU',
  SI: 'EU',
  ES: 'EU',
  SE: 'EU',
  CH: 'EU',
  UA: 'EU',
  GB: 'EU',
  VA: 'EU',

  // North America
  AG: 'NA',
  BS: 'NA',
  BB: 'NA',
  BZ: 'NA',
  CA: 'NA',
  CR: 'NA',
  CU: 'NA',
  DM: 'NA',
  DO: 'NA',
  SV: 'NA',
  GD: 'NA',
  GT: 'NA',
  HT: 'NA',
  HN: 'NA',
  JM: 'NA',
  MX: 'NA',
  NI: 'NA',
  PA: 'NA',
  KN: 'NA',
  LC: 'NA',
  VC: 'NA',
  TT: 'NA',
  US: 'NA',

  // South America
  AR: 'SA',
  BO: 'SA',
  BR: 'SA',
  CL: 'SA',
  CO: 'SA',
  EC: 'SA',
  GY: 'SA',
  PY: 'SA',
  PE: 'SA',
  SR: 'SA',
  UY: 'SA',
  VE: 'SA',

  // Oceania
  AU: 'OC',
  FJ: 'OC',
  KI: 'OC',
  MH: 'OC',
  FM: 'OC',
  NR: 'OC',
  NZ: 'OC',
  PW: 'OC',
  PG: 'OC',
  WS: 'OC',
  SB: 'OC',
  TO: 'OC',
  TV: 'OC',
  VU: 'OC',

  // Antarctica
  AQ: 'AN',
};

export function getContinent(identifier) {
  if (typeof identifier !== 'string' && typeof identifier !== 'number') {
    return null;
  }

  // Normalize identifier to uppercase for case-insensitive search
  const normalizedIdentifier = String(identifier).toUpperCase();

  // Check if the identifier is a continent code or ID
  const continentMatch = continents.find((continent) => continent.code === normalizedIdentifier
    || continent.continent_id === Number(identifier));
  if (continentMatch) return continentMatch;

  // Check if the identifier is a country code
  let continentCode = countryContinentMap[normalizedIdentifier];

  // Handle special cases
  if (normalizedIdentifier === 'AF') continentCode = 'AS'; // Afghanistan
  if (normalizedIdentifier === 'NA') continentCode = 'AF'; // Namibia
  if (normalizedIdentifier === 'SA') continentCode = 'AS'; // Saudi Arabia

  if (continentCode) {
    return continents.find((continent) => continent.code === continentCode);
  }

  // Search for continent by name
  return continents.find((continent) => continent.name.toUpperCase() === normalizedIdentifier);
}

export function getAllContinents() {
  return continents;
}

export function getCountriesForContinent(continentCode) {
  return Object.keys(countryContinentMap).filter((countryCode) => {
    if (countryCode === 'AF' && continentCode === 'AS') return true; // Afghanistan
    if (countryCode === 'NA' && continentCode === 'AF') return true; // Namibia
    if (countryCode === 'SA' && continentCode === 'AS') return true; // Saudi Arabia
    return countryContinentMap[countryCode] === continentCode;
  });
}

export default getContinent;
