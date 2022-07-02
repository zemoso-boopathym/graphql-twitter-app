const { gql } = require('apollo-server');

exports.typeDefs = gql`
  scalar Date
  scalar Url
  type Query {
    Tweet(id: ID!): Tweet
    Tweets(
      limit: Int
      skip: Int
      sort_field: String
      sort_order: String
    ): [Tweet]
    TweetsMeta: Meta
    User(id: ID!): User
    Notifications(limit: Int): [Notification]
    NotificationsMeta: Meta
  }
  type Tweet {
    id: ID!
    body: String
    date: Date
    Author: User
    Stat: Stat!
  }
  type User {
    id: ID!
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String @deprecated
    avatar_url: Url
  }
  type Stat {
    views: Int!
    likes: Int!
    retweets: Int!
    responses: Int!
  }
  type Notification {
    id: ID
    date: Date
    type: String
  }
  type Meta {
    count: Int
  }
  type Mutation {
    createTweet(body: String): Tweet
    deleteTweet(id: ID!): Tweet
    markTweetRead(id: ID!): Boolean
  }
`;
