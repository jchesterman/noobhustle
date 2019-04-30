import React from 'react';

import Hero from '../components/hero';
import IncomeReportListing from '../components/income-report-listing';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import RecentPosts from '../components/recent-posts';
import SEO from '../components/seo';
import {Divider} from '@material-ui/core';
import {graphql} from 'gatsby';

const IndexPage = props => (
  <Layout>
    <SEO
      title="An Average Guy Learning How to Make Money Online"
      googleVerification="Gvi35bpq4tFgSUgh7jEa4gBMXZtjVnQ70KwJRUkrBiA"
      keywords={['make money online', 'youtube growth', 'affiliate marketing']}
    />
    <Hero />
    <div
      style={{
        margin: '0 auto',
        width: '100%',
        maxWidth: 1440,
        padding: '3.45rem 1.0875rem'
      }}
    >
      <IncomeReportListing
        posts={props.data.allContentfulMonthlyIncomeReport.edges}
      />
      <Divider
        style={{
          height: '4px',
          marginBottom: '2.5em'
        }}
      />
      <RecentPosts posts={props.data.allContentfulBlogPost.edges} />
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query HomePageQuery {
    allContentfulBlogPost {
      edges {
        node {
          slug
          title
          publishDate(formatString: "MMMM Do, YYYY")
          heroImage {
            file {
              url
              fileName
              contentType
            }
            id
          }
          body {
            childMarkdownRemark {
              excerpt
              html
            }
            id
          }
          category {
            name
            slug
          }
        }
      }
    }
    allContentfulMonthlyIncomeReport(
      limit: 1
      sort: {fields: [month], order: DESC}
    ) {
      edges {
        node {
          title
          slug
          intro {
            childMarkdownRemark {
              html
              excerpt
            }
            id
          }
          body {
            childMarkdownRemark {
              html
              excerpt
            }
            id
          }
          featuredImage {
            file {
              url
              fileName
              contentType
            }
            id
          }
          month
          spreadsheet {
            internal {
              content
            }
          }
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;
