const sortBy = require('lodash').sortBy;

exports.Query = {
  Tweet: (_parent, { id }, { db }) => {
    return db.tweets.find((tweet) => id === tweet.id);
  },
  Tweets: (_parent, { limit, skip, sort_field, sort_order }, { db }) => {
    let tweets = db.tweets;
    skip = skip ?? 0;
    limit = limit ?? tweets.length;
    if (sort_order || sort_field) {
      sort_field = sort_field ?? 'body';
      if (!sort_order || sort_order === 'asc') {
        return sortBy(tweets, sort_field).slice(skip, limit);
      } else if (sort_order === 'des') {
        return sortBy(tweets, sort_field).reverse().slice(skip, limit);
      }
    }
    return tweets.slice(skip, limit);
  },
  User: (_parent, { id }, { db }) => {
    return db.users.find((user) => id === user.id);
  },
  Notifications: (_parent, _args, { db }) => {
    return db.notifications;
  },
  TweetsMeta: (_parent, _args, { db }) => {
    return {
      count: db.tweets.length,
    };
  },
  NotificationsMeta: (_parent, _args, { db }) => {
    return {
      count: db.notifications.length,
    };
  },
};
