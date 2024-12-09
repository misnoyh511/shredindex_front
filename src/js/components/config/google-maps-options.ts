import { googleMapStyles } from '@/RankedResortMap/GoogleMapStyles';

export const googleMapsOptions = {
  disableDefaultUI: true,
  disableDoubleClickZoom: true,
  zoomControl: false,
  clickableIcons: false,
  minZoom: 2,
  maxZoom: 15,
  gestureHandling: 'greedy',
  restriction: {
    latLngBounds: {
      north: 85,
      south: -85,
      west: -180,
      east: 180,
    },
    strictBounds: true,
  },
  styles: googleMapStyles,
};
