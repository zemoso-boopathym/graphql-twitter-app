const { v4: uuid } = require('uuid');

exports.Mutation = {
  createTweet: (_parent, { body }, { db }) => {
    const tweetId = uuid();
    const newTweet = {
      id: tweetId,
      body,
      date: new Date(),
      author: 'twitterapi',
    };
    const newStat = {
      views: 0,
      likes: 0,
      retweets: 0,
      responses: 0,
      tweetId: tweetId,
    };
    db.tweets.push(newTweet);
    db.stats.push(newStat);
    return newTweet;
  },
  deleteTweet: (_parent, { id }, { db }) => {
    const deletedTweet = db.tweets.find((tweet) => tweet.id === id);
    db.tweets = db.tweets.filter((tweet) => tweet.id !== id);
    db.stats = db.stats.filter((stat) => stat.id !== id);
    return deletedTweet;
  },
  markTweetRead: (_parent, { id }, { db }) => {
    const username = db.tweets.find((tweet) => tweet.id === id).author;
    db.userActivity.map((userAct) => {
      if (userAct.username === username) {
        userAct.tweetsRead[id] = true;
      }
    });
    return true;
  },
};
