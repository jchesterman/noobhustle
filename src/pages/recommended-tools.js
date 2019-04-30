import React from 'react';

import Hero from '../components/altHero';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import RecommendedToolsListing from '../components/recommended-tools-listing';
import SEO from '../components/seo';
import styled from '@emotion/styled';
import theme from '../themes/default';
import withProps from 'recompose/withProps';
import {Divider, Typography} from '@material-ui/core';
import {Link, graphql} from 'gatsby';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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

    return (
      <Layout>
        <SEO
          title="An Average Guy Learning How to Make Money Online"
          googleVerification="Gvi35bpq4tFgSUgh7jEa4gBMXZtjVnQ70KwJRUkrBiA"
          keywords={[
            'make money online',
            'youtube growth',
            'affiliate marketing'
          ]}
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
            Recommended Tools
          </Typography>
          <br />
          <Typography
            style={{textShadow: '-2px 2px 1px #000000'}}
            variant="subtitle1"
            color="secondary"
          >
            From the best hosting for your blog/website, to the best tools to
            use for growing your YouTube channel - here&apos;s everything I use
            (and recommend!) for my own online business.
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
              Interested in a detailed breakdown of everything i&apos;ve earned
              (or lost) so far?
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
          <RecommendedToolsListing
            posts={this.props.data.allContentfulRecommendedTools.edges}
          />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query RecommendedToolstListingQuery {
    allContentfulRecommendedTools(sort: {fields: [createdAt], order: ASC}) {
      edges {
        node {
          title
          subtitle
          createdAt
          category {
            title
          }
          body {
            childMarkdownRemark {
              htmlAst
              excerpt
            }
            id
          }
          image {
            file {
              url
              fileName
              contentType
            }
            id
          }
          affiliateLink
          buttonText
        }
      }
    }
  }
`;

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;
