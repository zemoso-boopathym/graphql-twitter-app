import { gql } from '@apollo/client';

export const DELETE_TWEET = gql`
  mutation ($id: ID!) {
    deleteTweet(id: $id) {
      body
      date
      id
      Author {
        full_name
      }
    }
  }
`;
