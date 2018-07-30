const { GraphQLString } = require('gatsby/graphql');
const slugify = require('limax');

const getSlug = name => `/speakers/${slugify(name)}`;

module.exports = ({ type }) => {
  if (type.name === 'ContentfulSpeaker') {
    return {
      slug: {
        type: GraphQLString,
        resolve(source, fieldArgs) {
          return getSlug(source.name);
        },
      },
    };
  } else if (type.name === 'ContentfulPresentation') {
    return {
      slug: {
        type: GraphQLString,
        resolve(source, fieldArgs) {
          return getSlug(source.presentation.name);
        },
      },
    };
  }

  return {};
};
