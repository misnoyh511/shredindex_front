/**
 * Get the resort country flag
 *
 * @param {string | null} countryCode
 * @return {string}
 */
const useResortFlagImage = (countryCode: string | null): string =>
  countryCode
    ? `https://flagcdn.com/${countryCode.toLowerCase()}.svg`
    : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/International_Flag_of_Planet_Earth.svg/320px-International_Flag_of_Planet_Earth.svg.png';

export default useResortFlagImage;
