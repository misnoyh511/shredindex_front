import { cilVerticalAlignBottom, cilTerrain, cilSnowflake } from '@coreui/icons';

const getStatisticIcon = (statisticName) => {
  if (statisticName === 'Average Annual Snowfall') {
    return cilSnowflake;
  }
  else if (statisticName === 'Vertical Drop') {
    return cilVerticalAlignBottom;
  }
  else if (statisticName === 'Skiable Terrain') {
    return cilTerrain;
  } else cilTerrain ;
}

export default getStatisticIcon;
