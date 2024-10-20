// types/resortTypes.ts

export interface Country {
  id: string;
  code: string;
  name: string;
}

export interface State {
  id?: string;
  code: string | null;
  name: string | null;
}

export interface Location {
  id?: string;
  city?: string | null;
  country?: Country;
  state?: State | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
}

export interface Score {
  id: string;
  name: string;
  title: string;
  value: number;
}

export interface Generic {
  id: string;
  name: string;
  title: string;
  value: number;
}

export interface RatingScore extends Score {
  name: string;
}

export interface NumericType {
  name: string;
  unit: string;
  max_value: number;
}

export interface Numeric extends Score {
  name: string;
  type: NumericType;
}

export interface Image {
  id: string;
  name: string;
  alt: string;
  sort_order: number;
  image: {
    path: string;
    content_type: string;
  };
}

export interface Comment {
  id: string;
  comment: string;
  author: string;
}

export interface Resort {
  id: string;
  title: string;
  url_segment: string;
  url: string;
  affiliate_url: string;
  description: string;
  location: Location;
  total_score: Score;
  ratingScores: RatingScore[];
  numerics: Numeric[];
  generics: Generic[];
  highlights: Score[];
  lowlights: Score[];
  resort_images: Image[];
  comments: Comment[];
}

export interface AffiliateUrl {
  affiliateUrl: string;
}
