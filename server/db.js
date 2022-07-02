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
    id: '53a0724c-a416-4cac-ae45',
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
    userId: '53a0724c-a416-4cac-ae45',
  },
  {
    id: 'as3df5g-4gfh5-asd452',
    date: 'Fri Jul 01 2022 09:10:00 GMT+0530 (India Standard Time)',
    type: 'Retweet',
    userId: '53a0724c-a416-4cac-ae45',
  },
  {
    id: '4gfh5-asd452-as3df5g',
    date: 'Fri Jul 01 2022 10:10:00 GMT+0530 (India Standard Time)',
    type: 'Response',
    userId: '53a0724c-a416-4cac-ae45',
  },
];

exports.db = {
  tweets,
  users,
  stats,
  notifications,
};
