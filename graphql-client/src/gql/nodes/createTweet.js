import { gql } from '@apollo/client';

export const CREATE_TWEET = gql`
  mutation ($body: String) {
    createTweet(body: $body) {
      id
      body
      Author {
        full_name
      }
      date
    }
  }
`;
