const { ApolloServer } = require('apollo-server');

const { typeDefs } = require('../schema');
const { dateScalar } = require('../scalars/dateScalar');
const { urlScalar } = require('../scalars/urlScalar');
const { Tweet } = require('../resolvers/Tweet');
const { Query } = require('../resolvers/Query');
const { Mutation } = require('../resolvers/Mutation');
const { Notification } = require('../resolvers/Notification');
const { db } = require('../db');

const resolvers = {
  Date: dateScalar,
  Url: urlScalar,
  Query,
  Tweet,
  Notification,
  Mutation,
};

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
    user: {
      email: 'twitterapi@test.com',
    },
  },
  csrfPrevention: true,
  cache: 'bounded',
});

it('returns tweet data with the provided query', async () => {
  const result = await testServer.executeOperation({
    query: `query GET_TWEETS($limit: Int, $sortField: String, $sortOrder: String, $skip: Int) {
        Tweets(limit: $limit, sort_field: $sortField, sort_order: $sortOrder, skip: $skip) {
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
        TweetsMeta {
          count
        }
    }`,
    variables: {
      limit: 2,
      sortField: 'date',
      sortOrder: 'asc',
      skip: 1,
    },
  });

  const expectedQueryOutput = {
    Tweets: [
      {
        body: 'Thanks everyone! GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.',
        date: 1654076400000,
        id: '4cac-ae45-bfaedce1f147-53a0724c-a416',
        Author: {
          id: '45d54edc-24af-4713-bf8f-b9c718e1d7d0',
          username: 'twitterapi',
          full_name: 'Twitter API',
          avatar_url:
            'https://cdn.pixabay.com/photo/2020/10/17/13/19/twitter-5662063_960_720.png',
        },
        Stat: {
          likes: 5,
          responses: 2,
          retweets: 0,
          views: 8,
        },
      },
    ],
    TweetsMeta: {
      count: 3,
    },
  };

  const parsedData = JSON.parse(JSON.stringify(result.data));

  expect(result.errors).toBeUndefined();
  expect(parsedData?.Tweets[0].Author?.username).toBe('twitterapi');
  expect(parsedData?.TweetsMeta.count).toBe(3);
  expect(parsedData).toStrictEqual(expectedQueryOutput);
});

it('returns tweet data for a particular query with tweet id', async () => {
  const result = await testServer.executeOperation({
    query: `query GET_TWEETS($tweetId: ID!) {
        Tweet(id: $tweetId) {
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
      }`,
    variables: { tweetId: 'a416-4cac-ae45-bfaedce1f147-53a0724c' },
  });

  const expectedQueryOutput = {
    Tweet: {
      body: 'We have update our Player Cards guidelines. Quick overview and discussion in our developer forums. GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.',
      date: 1656643200000,
      id: 'a416-4cac-ae45-bfaedce1f147-53a0724c',
      Author: {
        id: '45d54edc-24af-4713-bf8f-b9c718e1d7d0',
        username: 'twitterapi',
        full_name: 'Twitter API',
        avatar_url:
          'https://cdn.pixabay.com/photo/2020/10/17/13/19/twitter-5662063_960_720.png',
      },
      Stat: {
        likes: 1,
        responses: 41,
        retweets: 4,
        views: 3,
      },
    },
  };

  const parsedData = JSON.parse(JSON.stringify(result.data));

  expect(result.errors).toBeUndefined();
  expect(parsedData?.Tweet.Author?.username).toBe('twitterapi');
  expect(parsedData).toStrictEqual(expectedQueryOutput);
});

it('returns user data for a particular user id', async () => {
  const result = await testServer.executeOperation({
    query: `query($userId: ID!) {
        User(id: $userId) {
          first_name
          last_name
          full_name
          avatar_url
          id
        }       
      }`,
    variables: { userId: '45d54edc-24af-4713-bf8f-b9c718e1d7d0' },
  });

  const expectedQueryOutput = {
    User: {
      first_name: 'Twitter',
      last_name: 'API',
      full_name: 'Twitter API',
      avatar_url:
        'https://cdn.pixabay.com/photo/2020/10/17/13/19/twitter-5662063_960_720.png',
      id: '45d54edc-24af-4713-bf8f-b9c718e1d7d0',
    },
  };

  const parsedData = JSON.parse(JSON.stringify(result.data));

  expect(result.errors).toBeUndefined();
  expect(parsedData?.User?.full_name).toBe('Twitter API');
  expect(parsedData).toStrictEqual(expectedQueryOutput);
});

it('returns notifications data with limit and NotificationsMeta', async () => {
  const result = await testServer.executeOperation({
    query: `query($limit: Int) {
        Notifications(limit: $limit) {
          date
          id
          type
        }
        NotificationsMeta {
          count
        } 
      }`,
    variables: { limit: 2 },
  });

  const expectedQueryOutput = {
    Notifications: [
      {
        date: 1656643200000,
        id: 'asd452-as3df5g-4gfh5',
        type: 'Like',
      },
      {
        date: 1656646800000,
        id: 'as3df5g-4gfh5-asd452',
        type: 'Retweet',
      },
    ],
    NotificationsMeta: {
      count: 3,
    },
  };

  const parsedData = JSON.parse(JSON.stringify(result.data));

  expect(result.errors).toBeUndefined();
  expect(parsedData?.NotificationsMeta?.count).toBe(3);
  expect(parsedData?.Notifications?.length).toBe(2);
  expect(parsedData).toStrictEqual(expectedQueryOutput);
});

it('returns data after create tweet mutation', async () => {
  const result = await testServer.executeOperation({
    query: `mutation($body: String) {
            createTweet(body: $body) {
              body
              Author {
                full_name
              }
            }
          }`,
    variables: {
      body: 'New Post. Checking mutation in GraphQl.',
    },
  });

  const expectedQueryOutput = {
    createTweet: {
      body: 'New Post. Checking mutation in GraphQl.',
      Author: {
        full_name: 'Twitter API',
      },
    },
  };

  const parsedData = JSON.parse(JSON.stringify(result.data));

  expect(result.errors).toBeUndefined();
  expect(parsedData).toStrictEqual(expectedQueryOutput);
});

it('returns data after deleting a tweet mutation', async () => {
  const result = await testServer.executeOperation({
    query: `mutation($deleteTweetId: ID!) {
        deleteTweet(id: $deleteTweetId) {
          body
          date
          id
          Author {
            username
          }
        }
      }`,
    variables: {
      deleteTweetId: '4cac-ae45-bfaedce1f147-53a0724c-a416',
    },
  });

  const expectedQueryOutput = {
    deleteTweet: {
      body: 'Thanks everyone! GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.',
      date: 1654076400000,
      id: '4cac-ae45-bfaedce1f147-53a0724c-a416',
      Author: {
        username: 'twitterapi',
      },
    },
  };

  const parsedData = JSON.parse(JSON.stringify(result.data));

  expect(result.errors).toBeUndefined();
  expect(parsedData).toStrictEqual(expectedQueryOutput);
});

it('returns boolean data after marking a tweet as read mutation', async () => {
  const result = await testServer.executeOperation({
    query: `mutation($markTweetReadId: ID!) {
        markTweetRead(id: $markTweetReadId) 
      }`,
    variables: {
      markTweetReadId: '53a0724c-a416-4cac-ae45-bfaedce1f147',
    },
  });

  const expectedQueryOutput = {
    markTweetRead: true,
  };

  const parsedData = JSON.parse(JSON.stringify(result.data));

  expect(result.errors).toBeUndefined();
  expect(parsedData).toStrictEqual(expectedQueryOutput);
});
