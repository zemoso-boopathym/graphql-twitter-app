const tweets = [
  {
    id: 'a416-4cac-ae45-bfaedce1f147-53a0724c',
    body: 'We have update our Player Cards guidelines. Quick overview and discussion in our developer forums. GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.',
    author: 'twitterapi',
    date: 'Fri Jul 01 2022 08:10:00 GMT+0530 (India Standard Time)',
  },
  {
    id: '53a0724c-a416-4cac-ae45-bfaedce1f147',
    body: 'Update Rules of the Road & Display Requirements: more clarity, based on your feedback. Send a GraphQL query to your API and get exactly what you need, nothing more and nothing less. GraphQL queries always return predictable results. Apps using GraphQL are fast and stable because they control the data they get, not the server.',
    author: 'twitterapi',
    date: 'Fri Jun 15 2022 12:00:00 GMT+0530 (India Standard Time)',
  },
  {
    id: '4cac-ae45-bfaedce1f147-53a0724c-a416',
    body: 'Thanks everyone! GraphQL queries access not just the properties of one resource but also smoothly follow references between them. While typical REST APIs require loading from multiple URLs, GraphQL APIs get all the data your app needs in a single request. Apps using GraphQL can be quick even on slow mobile network connections.',
    author: 'twitterapi',
    date: 'Fri Jun 01 2022 15:10:00 GMT+0530 (India Standard Time)',
  },
];

const stats = [
  {
    views: 3,
    likes: 1,
    retweets: 4,
    responses: 41,
    tweetId: 'a416-4cac-ae45-bfaedce1f147-53a0724c',
  },
  {
    views: 5,
    likes: 3,
    retweets: 6,
    responses: 2,
    tweetId: '53a0724c-a416-4cac-ae45-bfaedce1f147',
  },
  {
    views: 8,
    likes: 5,
    retweets: 0,
    responses: 2,
    tweetId: '4cac-ae45-bfaedce1f147-53a0724c-a416',
  },
];

const users = [
  {
    id: '45d54edc-24af-4713-bf8f-b9c718e1d7d0',
    username: 'twitterapi',
    first_name: 'Twitter',
    last_name: 'API',
    full_name: 'Twitter API',
    name: 'Twitter API',
    avatar_url:
      'https://cdn.pixabay.com/photo/2020/10/17/13/19/twitter-5662063_960_720.png',
  },
];

const notifications = [
  {
    id: 'asd452-as3df5g-4gfh5',
    date: 'Fri Jul 01 2022 08:10:00 GMT+0530 (India Standard Time)',
    type: 'Like',
    userId: '45d54edc-24af-4713-bf8f-b9c718e1d7d0',
  },
  {
    id: 'as3df5g-4gfh5-asd452',
    date: 'Fri Jul 01 2022 09:10:00 GMT+0530 (India Standard Time)',
    type: 'Retweet',
    userId: '45d54edc-24af-4713-bf8f-b9c718e1d7d0',
  },
  {
    id: '4gfh5-asd452-as3df5g',
    date: 'Fri Jul 01 2022 10:10:00 GMT+0530 (India Standard Time)',
    type: 'Response',
    userId: '45d54edc-24af-4713-bf8f-b9c718e1d7d0',
  },
];

const userActivity = [
  {
    username: 'twitterapi',
    tweetsRead: {
      'a416-4cac-ae45-bfaedce1f147-53a0724c': true,
      '53a0724c-a416-4cac-ae45-bfaedce1f147': true,
      '4cac-ae45-bfaedce1f147-53a0724c-a416': true,
    },
  },
];

const loginData = [
  {
    username: 'twitterapi',
    email: 'twitterapi@test.com',
    password: '$2a$10$FnDKjvoYRsn1uDiIby2qPuqLDUcSxrT7Mc8qmbGXLMxx4n9Jw5qTm',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjQwNTkzNzktOTg3Yi00OTE5LTgwNTktZDYwMjJlMjZmN2U2IiwiZW1haWwiOiJ0d2l0dGVyYXBpQHRlc3QuY29tIiwiaWF0IjoxNjU2ODM5NTM1fQ.OiqIjBFwmjwEh94QA_t42qxkul5ATz_oGuFBiq9psxw',
  },
];

exports.db = {
  tweets,
  users,
  stats,
  notifications,
  userActivity,
  loginData,
};
