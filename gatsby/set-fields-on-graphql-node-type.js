const { GraphQLString } = require('gatsby/graphql');
const slugify = require('limax');

module.exports = ({ type }) => {
  if (type.name === 'ContentfulSpeaker') {
    return {
      slug: {
        type: GraphQLString,
        resolve(source, fieldArgs) {
          const { name } = source;
          return `/speakers/${slugify(name)}`;
        },
      },
    };
  }

  return {};
};
