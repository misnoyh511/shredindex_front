export interface ResortAttribute {
  id?: string;
  name?: string;
  title: string;
  type?: string;
  value: number | string | undefined;
}

export interface Comment {
  id?: string;
  author: string;
  comment: string;
}

export interface CountryState {
  id?: string;
  code: string;
  name: string;
}

export interface Location {
  id?: string;
  city: string;
  country: CountryState;
  state?: CountryState;
}

export interface Image {
  id: string;
  name: string;
  alt: string;
  image: {
    path: string;
    content_type: string;
  };
}

export interface Resort {
  description: string;
  location: Location;
  highlights: ResortAttribute[];
  lowlights: ResortAttribute[];
  comments: Comment[];
  resort_images: Image[];
}
