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
    Login: Login
  }
  type Login {
    email: String
    password: String
    token: String
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
  input RegisterInput {
    username: String
    first_name: String
    last_name: String
    email: String
    password: String
    confirmPassword: String
    avatar_url: Url
  }
  input LoginInput {
    email: String
    password: String
  }
  type Mutation {
    createTweet(body: String): Tweet
    deleteTweet(id: ID!): Tweet
    markTweetRead(id: ID!): Boolean
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
  }
`;
