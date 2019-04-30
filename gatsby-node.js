const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const incomeReport = path.resolve('./src/templates/income-report.js');
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                  category {
                    slug
                  }
                }
              }
            }
            allContentfulMonthlyIncomeReport {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulBlogPost.edges;
        posts.forEach(post => {
          createPage({
            path: `/${post.node.category.slug}/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            }
          });
        });

        const incomeReports =
          result.data.allContentfulMonthlyIncomeReport.edges;
        incomeReports.forEach(report => {
          createPage({
            path: `/income-reports/${report.node.slug}/`,
            component: incomeReport,
            context: {
              slug: report.node.slug
            }
          });
        });
      })
    );
  });
};
