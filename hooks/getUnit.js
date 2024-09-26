import { decodeJson } from 'serialize-query-params';

const getUnit = ({ unit }) => {
  const jString = decodeJson(unit);
  return jString?.format?.replace('%s', '') || null;
};

export default getUnit;
