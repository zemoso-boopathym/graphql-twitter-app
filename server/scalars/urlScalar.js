const { GraphQLScalarType } = require('graphql');
const validUrl = require('valid-url');

const urlValue = (value) => {
  if (validUrl.isUri(value)) {
    return value;
  }
  throw new UserInputError('Provided value is not an URL');
};

const urlScalar = new GraphQLScalarType({
  name: 'Url',
  description: 'Url custom scalar type',
  parseValue: urlValue,
  serialize: urlValue,
  parseLiteral: urlValue,
});

exports.urlScalar = urlScalar;
