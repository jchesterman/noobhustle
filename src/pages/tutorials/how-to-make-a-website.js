import React from 'react';

import DomainChecker from '../../components/domain-checker';
import Img from 'gatsby-image';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import SubscribeForm from '../../components/subscribe-form';
import WordpressLogo from '../../components/image';
import styled from '@emotion/styled';
import theme from '../../themes/default';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {FaCloud, FaGlobe} from 'react-icons/fa';
import {Section} from '../../components/common';

import {StaticQuery, graphql} from 'gatsby';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const OddSection = styled.div({
      backgroundColor: '#f5f5f5'
    });

    const StyledButton = styled(Button)({
      textTransform: 'none',
      marginTop: '20px',
      fontSize: '1.5rem',
      marginBottom: '16px',
      '@media(max-width: 599px)': {
        width: '100%',
        padding: '1rem',
        lineHeight: '2rem'
      }
    });

    const VerticalCenter = styled.div({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%'
    });

    const BoxShadow = styled.div({
      boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.1)'
    });

    const Container = styled.div({
      flexGrow: 1
    });

    return (
      <StaticQuery
        query={graphql`
          query {
            imageOne: file(
              relativePath: {eq: "installing-astra/install-astra.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageTwo: file(
              relativePath: {eq: "installing-astra/activate-astra.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageThree: file(
              relativePath: {eq: "installing-astra/get-started.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageFour: file(
              relativePath: {eq: "installing-astra/select-elementor.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageFive: file(
              relativePath: {eq: "installing-astra/select-theme.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageSix: file(
              relativePath: {eq: "installing-astra/install-plugins.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageSeven: file(
              relativePath: {eq: "installing-astra/import-site.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageEight: file(
              relativePath: {eq: "installing-astra/view-site.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageNine: file(
              relativePath: {eq: "installing-astra/edit-with-elementor.jpg"}
            ) {
              childImageSharp {
                fluid(maxWidth: 1440) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        `}
        render={data => (
          <Layout>
            <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
            <Section>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <VerticalCenter>
                    <Typography variant="h5">
                      How to create a WordPress start from scratch. <br />
                      <strong>In under 10 minutes</strong>.
                    </Typography>
                    <br />
                    <Typography color="textSecondary" variant="subtitle1">
                      *This page was put together to go along with{' '}
                      <a
                        href="https://www.youtube.com/NoobHustle"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <strong>this tutorial</strong>
                      </a>{' '}
                      on YouTube.
                    </Typography>
                    <br />
                    <Typography variant="h3">Find your name.</Typography>
                    <br />
                    <Typography color="textSecondary" variant="h6">
                      Pick a site name, and make sure the domain is available.
                    </Typography>
                    <DomainChecker />
                  </VerticalCenter>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <WordpressLogo />
                </Grid>
              </Grid>
            </Section>

            <Divider />

            <OddSection>
              <Section>
                <Grid container>
                  <Grid xs={12} sm={8}>
                    <Typography variant="h3">
                      Get your domain and hosting.
                    </Typography>
                    <br />
                    <Typography
                      color="textSecondary"
                      style={{fontWeight: 'bold'}}
                      variant="h6"
                    >
                      You need two things in order to have your website online:
                    </Typography>
                    <br />
                    <Typography color="textSecondary" variant="h6">
                      <FaCloud color={theme.palette.primary.main} />
                      &nbsp;
                      <strong>Hosting</strong> - This is where your site will
                      live.
                      <br />
                      <FaGlobe color={theme.palette.primary.main} />
                      &nbsp;
                      <strong>Domain</strong> - This is your websites address,
                      where people will find you.
                    </Typography>
                    <br />
                    <Typography color="textSecondary" variant="h6">
                      We&apos;re going to use{' '}
                      <a
                        href={process.env.BLUEHOST_AFFILIATE_LINK}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        GoDaddy
                      </a>{' '}
                      managed WordPress hosting, which includes automatic
                      WordPress installation .
                    </Typography>
                    <br />
                    <Typography color="textSecondary" variant="h6">
                      Right now they&apos;re having a{' '}
                      <strong>
                        <a
                          href={process.env.BLUEHOST_AFFILIATE_LINK}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          $1/month promotion
                        </a>
                      </strong>{' '}
                      sale, which includes a{' '}
                      <strong>free domain registration</strong>.
                    </Typography>
                    <br />

                    <StyledButton
                      color="primary"
                      href={process.env.BLUEHOST_AFFILIATE_LINK}
                      target="_blank"
                      variant="contained"
                    >
                      Get WordPress Hosting &amp; Free Domain
                    </StyledButton>
                  </Grid>
                </Grid>
              </Section>
            </OddSection>

            <Divider />

            <Section>
              <Grid container>
                <Grid item sm={12}>
                  <VerticalCenter>
                    <>
                      <Typography variant="h3">Install Astra theme.</Typography>
                      <br />
                      <Typography
                        color="textSecondary"
                        style={{fontWeight: 'bold'}}
                        variant="h6"
                      >
                        The theme is what determines how your website looks.
                      </Typography>
                      <br />
                      <Typography color="textSecondary" variant="h6">
                        Astra is an extremely powerful, and user-friendly
                        WordPress theme
                        <br />
                        that is going to allow you to easily customize your
                        website.
                      </Typography>
                    </>
                    <br />
                    <br />
                    <Container>
                      <Grid container spacing={16}>
                        <Grid item xs={6} sm={4}>
                          <Typography color="textSecondary" variant="subtitle1">
                            <strong>1. Install Astra theme</strong>
                          </Typography>
                          <BoxShadow>
                            <Img fluid={data.imageOne.childImageSharp.fluid} />
                          </BoxShadow>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Typography color="textSecondary" variant="subtitle1">
                            <strong>2. Activate Astra</strong>
                          </Typography>
                          <BoxShadow>
                            <Img fluid={data.imageTwo.childImageSharp.fluid} />
                          </BoxShadow>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Typography color="textSecondary" variant="subtitle1">
                            <strong>3. Click Get Started</strong>
                          </Typography>
                          <BoxShadow>
                            <Img
                              fluid={data.imageThree.childImageSharp.fluid}
                            />
                          </BoxShadow>
                        </Grid>
                      </Grid>
                    </Container>
                  </VerticalCenter>
                </Grid>
              </Grid>
            </Section>
            <Divider />
            <OddSection>
              <Section>
                <Grid container>
                  <Grid item sm={12}>
                    <VerticalCenter>
                      <>
                        <Typography variant="h3">Select Elementor.</Typography>
                        <br />
                        <Typography
                          color="textSecondary"
                          style={{fontWeight: 'bold'}}
                          variant="h6"
                        >
                          Elementor is a powerful, easy-to-use page builder for
                          WordPress.
                        </Typography>
                        <br />
                        <Typography color="textSecondary" variant="h6">
                          Astra is an extremely powerful, and user-friendly
                          WordPress theme
                          <br />
                          that is going to allow you to easily customize your
                          website.
                        </Typography>
                      </>
                      <br />
                      <br />
                      <Container>
                        <Grid container spacing={16}>
                          <Grid item xs={6} sm={4}>
                            <Typography
                              color="textSecondary"
                              variant="subtitle1"
                            >
                              <strong>1. Click Elementor</strong>
                            </Typography>
                            <BoxShadow>
                              <Img
                                fluid={data.imageFour.childImageSharp.fluid}
                              />
                            </BoxShadow>
                          </Grid>
                          <Grid item xs={6} sm={4}>
                            <Typography
                              color="textSecondary"
                              variant="subtitle1"
                            >
                              <strong>
                                2. Pick a theme, and click Preview
                              </strong>
                            </Typography>
                            <BoxShadow>
                              <Img
                                fluid={data.imageFive.childImageSharp.fluid}
                              />
                            </BoxShadow>
                          </Grid>
                          <Grid item xs={6} sm={4}>
                            <Typography
                              color="textSecondary"
                              variant="subtitle1"
                            >
                              <strong>3. Click Install Plugins</strong>
                            </Typography>
                            <BoxShadow>
                              <Img
                                fluid={data.imageSix.childImageSharp.fluid}
                              />
                            </BoxShadow>
                          </Grid>
                        </Grid>
                      </Container>
                    </VerticalCenter>
                  </Grid>
                </Grid>
              </Section>
            </OddSection>
            <Divider />
            <Section>
              <Grid container>
                <Grid item sm={12}>
                  <VerticalCenter>
                    <>
                      <Typography variant="h3">
                        Import Site &amp; Begin Editing.
                      </Typography>
                      <br />
                      <Typography color="textSecondary" variant="h6">
                        Once you have found a website you like, you&apos;re
                        going to import the site &amp; content, and then
                        you&apos;ll be ready to start editing.
                      </Typography>
                    </>
                    <br />
                    <br />
                    <Container>
                      <Grid container spacing={16}>
                        <Grid item xs={6} sm={4}>
                          <Typography color="textSecondary" variant="subtitle1">
                            <strong>1. Click Import This Site</strong>
                          </Typography>
                          <BoxShadow>
                            <Img
                              fluid={data.imageSeven.childImageSharp.fluid}
                            />
                          </BoxShadow>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Typography color="textSecondary" variant="subtitle1">
                            <strong>2. View Site</strong>
                          </Typography>
                          <BoxShadow>
                            <Img
                              fluid={data.imageEight.childImageSharp.fluid}
                            />
                          </BoxShadow>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                          <Typography color="textSecondary" variant="subtitle1">
                            <strong>3. Click Edit with Elementor</strong>
                          </Typography>
                          <BoxShadow>
                            <Img fluid={data.imageNine.childImageSharp.fluid} />
                          </BoxShadow>
                        </Grid>
                      </Grid>
                    </Container>
                  </VerticalCenter>
                </Grid>
              </Grid>
            </Section>
            <Divider />
            <OddSection>
              <Section>
                <Grid container spacing={40}>
                  <Grid item sm={6}>
                    <VerticalCenter>
                      <>
                        <Typography variant="h3">
                          You&apos;re Finished!
                        </Typography>
                        <br />
                        <Typography
                          color="textSecondary"
                          style={{fontWeight: 'bold'}}
                          variant="h6"
                        >
                          Congrats! You now have your very own professional
                          website :)
                        </Typography>
                        <br />
                        <Typography color="textSecondary" variant="h6">
                          This tutorial is a follow-along with{' '}
                          <strong>
                            <a
                              href="https://www.youtube.com/NoobHustle"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              this video
                            </a>{' '}
                          </strong>
                          I created for YouTube, if you got stuck with anything
                          at all,{' '}
                          <strong>
                            <a
                              href="https://www.youtube.com/NoobHustle"
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              check it out here
                            </a>{' '}
                          </strong>
                          and feel free to leave a comment there if you&apos;ve
                          got any questions - i&apos;ll reply as soon as
                          possible.
                          <br />
                        </Typography>
                        <br />
                        <Typography color="textSecondary" variant="h6">
                          Also, if you enjoyed this tutorial and are interested
                          in more web-related tutorials and content - sign up
                          for my newsletter with the form to the right!
                        </Typography>
                      </>
                    </VerticalCenter>
                  </Grid>
                  <Grid item sm={6}>
                    <VerticalCenter>
                      <SubscribeForm />
                    </VerticalCenter>
                  </Grid>
                </Grid>
              </Section>
            </OddSection>
          </Layout>
        )}
      />
    );
  }
}
export default IndexPage;
