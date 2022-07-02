import { gql } from '@apollo/client';

export const READ_TWEET = gql`
  mutation ($id: ID!) {
    markTweetRead(id: $id)
  }
`;
