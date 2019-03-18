const path = require('path');

module.exports = async function createPages({ actions, graphql }) {
  const { createPage } = actions;

  const speakerTemplate = path.resolve('src/templates/speaker.js');
  const presentationTemplate = path.resolve('src/templates/presentation.js');
  const sponsorTemplate = path.resolve('src/templates/sponsor.js');

  const { data, errors } = await graphql(`
    {
      speakers: allContentfulSpeaker {
        edges {
          node {
            slug
          }
        }
      }

      presentations: allContentfulPresentation {
        edges {
          node {
            slug
          }
        }
      }

      sponsors: allContentfulSponsor {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  const { speakers, presentations, sponsors } = data;

  const createPageGroup = (type, template) => {
    type.edges.forEach(({ node }) => {
      createPage({
        component: template,
        path: node.slug,
        context: {
          slug: node.slug,
        },
      });
    });
  };

  createPageGroup(speakers, speakerTemplate);
  createPageGroup(presentations, presentationTemplate);
  createPageGroup(sponsors, sponsorTemplate);
};
