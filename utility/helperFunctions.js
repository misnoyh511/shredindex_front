const isNumber = (value) => typeof value === 'number';

export const convertToLabel = (snakeCase) => {
  // Handle empty or undefined input
  if (!snakeCase) return '';

  // Split by underscore, capitalize first letter, join with space
  return snakeCase
    .split('_')
    .map((word, index) =>
      index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join(' ');
};

export default isNumber;
