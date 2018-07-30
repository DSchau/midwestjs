const path = require('path');
const slugify = require('limax');

module.exports = function createPages({ actions, graphql }) {
  const { createPage } = actions;

  const speakerTemplate = path.resolve('src/templates/speaker.js');
  const presentationTemplate = path.resolve('src/templates/presentation.js');

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
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const { speakers, presentations } = result.data;

    speakers.edges.forEach(({ node: speaker }) => {
      createPage({
        component: speakerTemplate,
        path: speaker.slug,
        context: {
          slug: speaker.slug,
        },
      });
    });

    presentations.edges.forEach(({ node: presentation }) => {
      createPage({
        component: presentationTemplate,
        path: presentation.slug,
        context: {
          slug: presentation.slug,
        },
      });
    });
  });
};
