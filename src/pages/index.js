import React from 'react';

import Img from 'gatsby-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import SubscribeForm from '../components/subscribe-form';
import styled from '@emotion/styled';
import {Grid, Typography} from '@material-ui/core';
import {Link, StaticQuery, graphql} from 'gatsby';

const Logo = styled.div({
  width: '100%'
});

const FeatureContain = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  '@media(max-width: 599px)': {
    height: 'auto',
    padding: '100px 0'
  },
  '&:nth-of-type(2)': {
    borderLeft: '1px solid #ddd',
    backgroundColor: '#f5f5f5'
  }
});

const LogoContain = styled.div({
  display: 'block',
  width: '65%',
  maxWidth: '600px'
});

const SignUpContain = styled.div({
  padding: '20px 60px',
  maxWidth: '700px'
});

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        imageOne: file(relativePath: {eq: "noobhustle-logo.png"}) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Layout header={false}>
        <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
        <Grid container>
          <FeatureContain item xs={12} sm={6}>
            <LogoContain>
              <Logo>
                <Img fluid={data.imageOne.childImageSharp.fluid} />
              </Logo>
            </LogoContain>
          </FeatureContain>
          <FeatureContain item xs={12} sm={6}>
            <SignUpContain>
              <Typography variant="h1">Site is launching soon!</Typography>
              <br />
              <br />
              <br />
              <Typography variant="h5">
                Be the first to know by signing up.
              </Typography>
              <br />
              <SubscribeForm />
              <br />
              <br />
              <br />
              <Typography variant="subtitle1">
                While you wait, check out my tutorial on{' '}
                <strong>
                  <Link to="/tutorials/how-to-make-a-website/">
                    how to make a WordPress website in under 10 minutes
                  </Link>
                </strong>
                .
              </Typography>
              <br />
              <Typography variant="subtitle1">
                You can also check me out on{' '}
                <strong>
                  <a
                    href="https://www.youtube.com/NoobHustle"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    YouTube
                  </a>
                </strong>
                , where I show my journey into learning how to build an income
                online.
              </Typography>
            </SignUpContain>
          </FeatureContain>
        </Grid>
      </Layout>
    )}
  />
);

export default IndexPage;
