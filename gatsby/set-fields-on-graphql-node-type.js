const { GraphQLString } = require('gatsby/graphql');
const slugify = require('limax');

const getSlug = (part, name) => `/${part}/${slugify(name)}`;

const getResolver = resolver => ({
  slug: {
    type: GraphQLString,
    resolve: resolver,
  },
});

module.exports = ({ type }) => {
  switch (type.name) {
    case 'ContentfulSpeaker':
      return getResolver(source => getSlug('speakers', source.name));
    case 'ContentfulPresentation':
      return getResolver(source => getSlug('presentations', source.title));
    case 'ContentfulSponsor':
      return getResolver(source => getSlug('sponsors', source.name));
    default:
      return {};
  }
};
