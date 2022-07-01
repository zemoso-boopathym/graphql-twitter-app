exports.Tweet = {
  Stat: ({ id }, _args, { db }) => {
    return db.stats.find((stat) => stat.tweetId === id);
  },
  Author: ({ author }, _args, { db }) => {
    return db.users.find((user) => user.username === author);
  },
  date: ({ date }, _args, _context) => {
    return new Date(date);
  },
};
