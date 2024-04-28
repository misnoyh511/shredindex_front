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

export default function getContinent(identifier) {
  // Normalize identifier to lowercase for case-insensitive search
  const normalizedIdentifier = identifier.toLowerCase();

  // Search for continent by name, code, or ID
  return continents.find((continent) => (
    continent.name.toLowerCase() === normalizedIdentifier
      || continent.code.toLowerCase() === normalizedIdentifier
      || continent.continent_id === Number(identifier) // Convert ID to number for comparison
  ));
}
