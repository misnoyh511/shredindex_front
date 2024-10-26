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
export interface Image {
  id: string;
  name: string;
  alt: string;
  image: {
    path: string;
    content_type: string;
  };
}
