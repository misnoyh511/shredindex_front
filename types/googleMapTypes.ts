export interface Location {
  latitude: string;
  longitude: string;
}

export interface Resort {
  id: string;
  location: Location;
  [key: string]: unknown;
}

export interface ApiFilters {
  groupedType: string[];
  locationType: {
    mapArea?: {
      north: number;
      south: number;
      east: number;
      west: number;
    };
    countryId?: string[];
    continentId?: string[];
  };
}

export interface QueryResult {
  resorts?: {
    data: Resort[];
  };
}

export interface PixelOffset {
  x: number;
  y: number;
}
