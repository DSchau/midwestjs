const { GraphQLString } = require('gatsby/graphql');
const slugify = require('limax');

const getSlug = (part, name) => `/${part}/${slugify(name)}`;

module.exports = ({ type }) => {
  if (type.name === 'ContentfulSpeaker') {
    return {
      slug: {
        type: GraphQLString,
        resolve(source, fieldArgs) {
          return getSlug('speakers', source.name);
        },
      },
    };
  } else if (type.name === 'ContentfulPresentation') {
    return {
      slug: {
        type: GraphQLString,
        resolve(source, fieldArgs) {
          return getSlug('presentations', source.title);
        },
      },
    };
  }

  return {};
};
