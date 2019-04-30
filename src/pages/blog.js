import React from 'react';

import Hero from '../components/altHero';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import RecentPosts from '../components/recent-posts';
import SEO from '../components/seo';
import styled from '@emotion/styled';
import theme from '../themes/default';
import withProps from 'recompose/withProps';
import {Divider, Typography} from '@material-ui/core';
import {Link, graphql} from 'gatsby';

const StyledLink = withProps({
  component: styled(Link)({
    textDecoration: 'none',
    color: theme.palette.primary.light,
    display: 'inline-block',
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    '&:hover': {
      color: theme.palette.primary.dark,
      borderColor: theme.palette.primary.dark
    }
  })
})(
  styled(Typography)({
    fontSize: '1rem'
  })
);

const IndexPage = props => (
  <Layout>
    <SEO
      title="An Average Guy Learning How to Make Money Online"
      googleVerification="Gvi35bpq4tFgSUgh7jEa4gBMXZtjVnQ70KwJRUkrBiA"
      keywords={['make money online', 'youtube growth', 'affiliate marketing']}
    />
    <Hero>
      <Typography
        style={{
          fontSize: '3rem',
          lineHeight: '1.2',
          fontWeight: '600',
          textShadow: '-2px 2px 1px #000000'
        }}
        variant="h1"
        color="secondary"
      >
        The Noob Hustle Blog
      </Typography>
      <br />
      <Typography
        style={{textShadow: '-2px 2px 1px #000000'}}
        variant="subtitle1"
        color="secondary"
      >
        Here, you&apos;ll find various tutorials, product/software reviews, as
        well as anything i&apos;ve learn along my making money online travels.
      </Typography>
      <br />
      <Typography
        style={{
          textShadow: '-2px 2px 1px #000000'
        }}
        variant="subtitle1"
        color="secondary"
      >
        <strong>
          Interested in a detailed breakdown of everything i&apos;ve earned (or
          lost) so far?
        </strong>
      </Typography>
      <StyledLink to="income-reports" variant="subtitle1" color="primary">
        <strong>Check out my monthly income reports</strong>
      </StyledLink>
      <Divider style={{clear: 'both'}} />
    </Hero>
    <div
      style={{
        margin: '0 auto',
        width: '100%',
        maxWidth: 1440,
        padding: '3.45rem 1.0875rem'
      }}
    >
      <RecentPosts posts={props.data.allContentfulBlogPost.edges} />
    </div>
  </Layout>
);

export const pageQuery = graphql`
  query BlogPostListingQuery {
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
  }
`;

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;
