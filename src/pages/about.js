import React from 'react';

import Hero from '../components/altHero';
import Img from 'gatsby-image';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import withProps from 'recompose/withProps';
import {Grid, Typography} from '@material-ui/core';
import {graphql} from 'gatsby';

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const MainHeading = styled(Typography)({
      fontWeight: '400'
    });

    const StyledContent = styled.div({
      textAlign: 'left'
    });

    const AboutContainer = styled.div({
      textAlign: 'left',
      marginBottom: '40px',
      background: '#eee',
      padding: '1em'
    });

    const SecondaryHeading = styled(Typography)({
      fontWeight: '600',
      borderBottom: `2px solid ${theme.palette.primary.light}`,
      display: 'inline-block',
      marginBottom: '1.2em'
    });

    const StyledParagraph = styled(Typography)({
      fontSize: '1.2em'
    });

    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: {
        h1: withProps({variant: 'h1', gutterBottom: true})(MainHeading),
        h2: withProps({variant: 'h5', gutterBottom: true})(SecondaryHeading),
        h3: withProps({variant: 'h3', gutterBottom: true})(Typography),
        h4: withProps({variant: 'h4', gutterBottom: true})(Typography),
        p: withProps({paragraph: true})(StyledParagraph)
      }
    }).Compiler;

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
            About Noob Hustle
          </Typography>
          <br />
          <Typography
            style={{textShadow: '-2px 2px 1px #000000'}}
            variant="subtitle1"
            color="secondary"
          >
            Who am I?
            <br />
            Why did I create this website?
            <br />
            Why should you read my content?
            <br />
            <br />
            <strong>Find out below!</strong>
          </Typography>
          <br />
        </Hero>
        <div
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: 1440,
            padding: '3.45rem 1.0875rem'
          }}
        >
          <AboutContainer>
            <Grid container spacing={16}>
              <Grid item xs={12} sm={4}>
                <Img fluid={this.props.data.imageOne.childImageSharp.fluid} />
                <br />
                <Img fluid={this.props.data.imageTwo.childImageSharp.fluid} />
                <br />
                <Img fluid={this.props.data.imageThree.childImageSharp.fluid} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <StyledContent>
                  {renderAst(
                    this.props.data.allContentfulAbout.edges[0].node.body
                      .childMarkdownRemark.htmlAst
                  )}
                  <br />
                  <StyledParagraph>
                    If you&apos;d like to get in touch with me, you can reach me
                    via email at{' '}
                    <strong>
                      <a href="mailto:jay@noobhustle.com">jay@noobhustle.com</a>
                    </strong>
                  </StyledParagraph>
                </StyledContent>
              </Grid>
            </Grid>
          </AboutContainer>
        </div>
      </Layout>
    );
  }
}

About.propTypes = {
  data: PropTypes.array
};

export const pageQuery = graphql`
  query AboutPageQuery {
    allContentfulAbout {
      edges {
        node {
          title
          subtitle {
            childMarkdownRemark {
              html
              excerpt
            }
            id
          }
          body {
            childMarkdownRemark {
              htmlAst
            }
          }
        }
      }
    }
    imageOne: file(relativePath: {eq: "about/me-julia-ralphie.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageTwo: file(relativePath: {eq: "about/ralphie.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    imageThree: file(relativePath: {eq: "about/me-and-trevor.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default About;
