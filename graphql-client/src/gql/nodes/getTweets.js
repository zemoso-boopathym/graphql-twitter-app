import { gql } from '@apollo/client';

export const GET_TWEETS = gql`
  query GET_TWEETS {
    Tweets {
      body
      date
      id
      Author {
        id
        username
        full_name
        avatar_url
      }
      Stat {
        likes
        responses
        retweets
        views
      }
    }
  }
`;
