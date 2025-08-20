const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then((result) => {
      if (result.errors) {
        return reject(result.errors);
      }
      const edges =
        (result.data &&
          result.data.allDatoCmsWork &&
          result.data.allDatoCmsWork.edges) ||
        [];
      edges.forEach(({ node: work }) => {
        if (!work || !work.slug) return;
        createPage({
          path: `works/${work.slug}`,
          component: path.resolve(`./src/templates/work.js`),
          context: {
            slug: work.slug,
          },
        });
      });
      resolve();
    });
  });
};
