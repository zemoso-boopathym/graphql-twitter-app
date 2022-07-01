const tweets = [
  {
    id: 'a416-4cac-ae45-bfaedce1f147-53a0724c',
    body: 'First Tweet',
    author: 'mailtoboo',
    date: 'Fri Jul 01 2022 08:10:00 GMT+0530 (India Standard Time)',
  },
  {
    id: '53a0724c-a416-4cac-ae45-bfaedce1f147',
    body: 'Second Tweet',
    author: 'mailtoboo',
    date: 'Fri Jun 15 2022 12:00:00 GMT+0530 (India Standard Time)',
  },
  {
    id: '4cac-ae45-bfaedce1f147-53a0724c-a416',
    body: 'Third Tweet',
    author: 'mailtoboo',
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
    username: 'mailtoboo',
    first_name: 'boo',
    last_name: 'pathy',
    full_name: 'boopathy_m',
    name: 'boopathy',
    avatar_url:
      'https://cdn.pixabay.com/photo/2017/03/21/21/05/medal-2163345_960_720.png',
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
