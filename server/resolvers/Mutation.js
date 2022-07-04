const { ApolloError } = require('apollo-server');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const validUrl = require('valid-url');
const jwt = require('jsonwebtoken');

exports.Mutation = {
  createTweet: (_parent, { body }, { db, user }) => {
    const tweetId = uuid();
    const username = db.loginData.find(
      (data) => user.email === data.email
    ).username;
    const newTweet = {
      id: tweetId,
      body,
      date: new Date(),
      author: username,
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
  registerUser: async (
    _,
    {
      registerInput: {
        username,
        first_name,
        last_name,
        email,
        password,
        confirmPassword,
        avatar_url,
      },
    },
    { db }
  ) => {
    const oldUser = db.loginData.find(
      (data) => username === data.username || email === data.email
    );
    if (oldUser) {
      throw new ApolloError(
        `User already registered with the provided email: ${email} or username: ${username}`
      );
    }
    if (password !== confirmPassword) {
      throw new ApolloError(`Passwords do not match!`);
    }
    if (!avatar_url || (avatar_url && !validUrl.isUri(avatar_url))) {
      avatar_url =
        'https://cdn.pixabay.com/photo/2020/10/17/13/19/twitter-5662063_960_720.png';
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      first_name,
      last_name,
      id: uuid(),
      avatar_url,
      full_name: `${first_name} ${last_name}`,
    };

    const loginData = {
      username,
      email,
      password: encryptedPassword,
    };

    const token = jwt.sign({ user_id: newUser.id, email }, 'p@$$word', {
      expiresIn: '2h',
    });

    db.users.push(newUser);
    loginData.token = token;
    db.loginData.push(loginData);
    newUser.Login = loginData;
    return newUser;
  },
  loginUser: async (_, { loginInput: { email, password } }, { db }) => {
    const currUser = db.loginData.find((data) => email === data.email);
    if (currUser && bcrypt.compare(password, currUser.password)) {
      const token = jwt.sign({ user_id: currUser.id, email }, 'p@$$word', {
        expiresIn: '2h',
      });
      currUser.token = token;
      const userData = db.users.find(
        (user) => user.username === currUser.username
      );
      return {
        ...userData,
        Login: {
          token: currUser.token,
          email: currUser.email,
        },
      };
    } else {
      throw new ApolloError('Incorrect Password', 'INCORRECT_PASSWORD');
    }
  },
};
