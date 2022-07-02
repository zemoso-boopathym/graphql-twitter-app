const { ApolloServer, gql } = require('apollo-server');

const { typeDefs } = require('./schema');
const { dateScalar } = require('./scalars/dateScalar');
const { urlScalar } = require('./scalars/urlScalar');
const { Tweet } = require('./resolvers/Tweet');
const { Query } = require('./resolvers/Query');
const { Mutation } = require('./resolvers/Mutation');
const { Notification } = require('./resolvers/Notification');
const { db } = require('./db');

const resolvers = {
  Date: dateScalar,
  Url: urlScalar,
  Query,
  Tweet,
  Notification,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
  },
  csrfPrevention: true,
  cache: 'bounded',
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
