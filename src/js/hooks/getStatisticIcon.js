import { cilVerticalAlignBottom, cilTerrain, cilSnowflake } from '@coreui/icons';

const statisticToIcon = {
  'Average Annual Snowfall': cilSnowflake,
  'Vertical Drop': cilVerticalAlignBottom,
  'Skiable Terrain': cilTerrain,
};

const getStatisticIcon = (statisticName) => statisticToIcon[statisticName] || cilTerrain;

export default getStatisticIcon;
