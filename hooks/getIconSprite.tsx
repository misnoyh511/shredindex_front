import { gql } from '@apollo/client';

export const GET_ICON_SPRITE = gql`
  query GetIconSprite {
    iconSprite
  }
`;
