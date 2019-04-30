import React from 'react';
//import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image';
import PropTypes from 'prop-types';
import SubscribeForm from './subscribe-form';
import styled from '@emotion/styled';
import {Grid, Typography} from '@material-ui/core';
import {StaticQuery, graphql} from 'gatsby';

class AltHero extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const FeatureContain = styled(Grid)({
      '@media(max-width: 599px)': {
        height: 'auto',
        padding: '100px 0'
      },
      '&:nth-of-type(2)': {
        margin: '0 auto',
        width: '50%',
        display: 'block'
      }
    });
    return (
      <StaticQuery
        query={graphql`
          query {
            heroBg: file(relativePath: {eq: "hero-bg-v2.jpg"}) {
              childImageSharp {
                fluid(quality: 100, maxWidth: 1600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => {
          const imageData = data.heroBg.childImageSharp.fluid;
          return (
            <BackgroundImage
              style={{width: '100%'}}
              Tag="section"
              fluid={imageData}
              backgroundColor={'#040e18'}
            >
              <div
                style={{
                  margin: '0 auto',
                  width: '100%',
                  maxWidth: 1440,
                  padding: '3.45rem 1.0875rem'
                }}
              >
                <Grid container>
                  <FeatureContain item xs={12} sm={6}>
                    {this.props.children}
                  </FeatureContain>
                  <FeatureContain
                    item
                    xs={12}
                    sm={6}
                    style={{padding: '0 120px', textAlign: 'center'}}
                  >
                    <Typography
                      style={{marginBottom: '20px'}}
                      variant="h5"
                      color="secondary"
                    >
                      WANT WEEKLY, ACTIONABLE TIPS?
                    </Typography>
                    <SubscribeForm cta="JOIN THE MAILING LIST" />
                    <Typography variant="subtitle2" color="secondary">
                      * I&apos;ll never spam you!
                    </Typography>
                  </FeatureContain>
                </Grid>
              </div>
            </BackgroundImage>
          );
        }}
      />
    );
  }
}

AltHero.propTypes = {
  children: PropTypes.node.isRequired
};

export default AltHero;
