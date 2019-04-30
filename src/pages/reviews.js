import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React from 'react';
import RecentPosts from '../components/recent-posts';
import SEO from '../components/seo';
import {Section} from '../components/common';
import {graphql} from 'gatsby';

const Reviews = props => (
  <Layout>
    <SEO
      title="An Average Guy Learning How to Make Money Online"
      googleVerification="Gvi35bpq4tFgSUgh7jEa4gBMXZtjVnQ70KwJRUkrBiA"
      keywords={['make money online', 'youtube growth', 'affiliate marketing']}
    />
    <Section>
      <RecentPosts posts={props.data.allContentfulBlogPost.edges} />
    </Section>
  </Layout>
);

export const pageQuery = graphql`
  query ReviewsListingQuery {
    allContentfulBlogPost(filter: {category: {slug: {eq: "reviews"}}}) {
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
  }
`;

Reviews.propTypes = {
  data: PropTypes.array.isRequired
};

export default Reviews;
