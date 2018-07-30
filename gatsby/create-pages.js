const path = require('path');
const slugify = require('limax');

module.exports = function createPages({ actions, graphql }) {
  const { createPage } = actions;

  const speakerTemplate = path.resolve('src/templates/speaker.js');
  const presentationTemplate = path.resolve('src/templates/presentation.js');
  const sponsorTemplate = path.resolve('src/templates/sponsor.js');

  return graphql(`
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
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { speakers, presentations, sponsors } = result.data;

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
  });
};
