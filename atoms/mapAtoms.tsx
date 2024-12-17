import { atom, selector } from 'recoil';
import { Resort, ApiFilters } from '../types/googleMapTypes';

interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

interface MapState {
  bounds: MapBounds | null;
  zoom: number;
}

interface ResortsStateType {
  resorts: Resort[];
  isLoading: boolean;
  previousResorts: Resort[];
}

export const resortsState = atom<ResortsStateType>({
  key: 'resortsState',
  default: {
    resorts: [],
    isLoading: false,
    previousResorts: [],
  },
});

export const mapState = atom<MapState>({
  key: 'mapState',
  default: {
    bounds: null,
    zoom: 2,
  },
});

export const apiFiltersState = atom<ApiFilters>({
  key: 'apiFiltersState',
  default: { groupedType: [], locationType: {} },
});

export const displayResortsSelector = selector({
  key: 'displayResortsSelector',
  get: ({ get }) => {
    const { resorts, isLoading, previousResorts } = get(resortsState);
    const { bounds, zoom } = get(mapState);

    // Use previous resorts while loading
    const currentResorts = isLoading ? previousResorts : resorts;

    // If zoom is less than or equal to 3, show all resorts (global view)
    if (!bounds || zoom <= 3) return currentResorts;

    // Filter resorts based on bounds for higher zoom levels
    return currentResorts?.filter(resort => {
      const lat = parseFloat(resort.location.latitude);
      const lng = parseFloat(resort.location.longitude);

      // Handle date line crossing
      if (bounds.west > bounds.east) {
        return (
          lat >= bounds.south &&
          lat <= bounds.north &&
          (lng >= bounds.west || lng <= bounds.east)
        );
      }

      return (
        lat >= bounds.south &&
        lat <= bounds.north &&
        lng >= bounds.west &&
        lng <= bounds.east
      );
    });
  },
});
