import React from 'react';
//import styled from '@emotion/styled';
import BackgroundImage from 'gatsby-background-image';
import CountUp from 'react-countup';
import SubscribeForm from './subscribe-form';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Divider, Grid, Typography} from '@material-ui/core';
import {FaYoutube} from 'react-icons/fa';
import {Link, StaticQuery, graphql} from 'gatsby';

class Hero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ytData: {}
    };
  }

  componentDidMount() {
    fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCjLMjQFYcxOYwwfGXTTRpug&key=AIzaSyBE0gwJGdDBSxir4FLFrelw_jSKwVK1QK4'
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          ytData: data.items[0].statistics
        });
      });
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
    const GreenText = styled.span({
      color: '#36c43b',
      borderBottom: '3px solid #36c43b',
      fontWeight: '600'
    });
    const RedText = styled.span({
      color: theme.palette.primary.light,
      borderBottom: `3px solid ${theme.palette.primary.light}`,
      fontWeight: '600'
    });
    return (
      <StaticQuery
        query={graphql`
          query {
            imageOne: file(relativePath: {eq: "hero-bg.jpg"}) {
              childImageSharp {
                fluid(quality: 100, maxWidth: 1600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            allContentfulMonthlyIncomeReport(
              sort: {fields: [month], order: DESC}
              limit: 1
            ) {
              edges {
                node {
                  slug
                  spreadsheet {
                    internal {
                      content
                    }
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const imageData = data.imageOne.childImageSharp.fluid;
          const incomeJson =
            data.allContentfulMonthlyIncomeReport.edges[0].node.spreadsheet
              .internal.content;
          const incomeObj = JSON.parse(incomeJson);
          let totalExpenses = 0;
          let totalEarnings = 0;
          Object.keys(incomeObj).forEach(function(key) {
            totalExpenses += incomeObj[key].expense;
            totalEarnings += incomeObj[key].earnings;
          });
          let income = totalEarnings - totalExpenses;
          const isPositive = income >= 0;
          income = Math.abs(income);
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
                    <Typography
                      style={{
                        fontSize: '2.6rem',
                        lineHeight: '1.2',
                        textShadow: '-2px 2px 1px #000000'
                      }}
                      variant="h1"
                      color="secondary"
                    >
                      <strong>
                        <CountUp
                          separator=","
                          duration={2}
                          end={this.state.ytData.videoCount}
                        />
                      </strong>{' '}
                      videos
                    </Typography>
                    <Typography
                      style={{
                        fontSize: '2.6rem',
                        lineHeight: '1.2',
                        textShadow: '-2px 2px 1px #000000'
                      }}
                      variant="h1"
                      color="secondary"
                    >
                      <strong>
                        <CountUp
                          delay={0.5}
                          separator=","
                          duration={2}
                          end={this.state.ytData.viewCount}
                        />
                      </strong>{' '}
                      views
                      <br />
                      <strong>
                        <CountUp
                          delay={1}
                          separator=","
                          duration={2}
                          end={this.state.ytData.subscriberCount}
                        />
                      </strong>{' '}
                      subscribers
                    </Typography>
                    <Typography
                      style={{
                        lineHeight: '1.2',
                        textShadow: '-2px 2px 1px #000000'
                      }}
                      variant="h1"
                      color="secondary"
                    >
                      <Link style={{textDecoration: 'none'}} />
                    </Typography>
                    <Typography
                      style={{
                        lineHeight: '1.2',
                        textShadow: '-2px 2px 1px #000000'
                      }}
                      variant="h1"
                      color="secondary"
                    >
                      <Link
                        to={`income-reports/${
                          data.allContentfulMonthlyIncomeReport.edges[0].node
                            .slug
                        }`}
                        style={{textDecoration: 'none'}}
                      >
                        {isPositive ? (
                          <GreenText>
                            $
                            <CountUp
                              separator=","
                              delay={1.5}
                              duration={5}
                              end={income}
                            />{' '}
                            made last month
                          </GreenText>
                        ) : (
                          <RedText>
                            $
                            <CountUp
                              separator=","
                              delay={1.5}
                              duration={5}
                              end={income}
                            />{' '}
                            lost last month
                          </RedText>
                        )}
                      </Link>
                    </Typography>
                    <br />
                    <Typography variant="subtitle1" color="secondary">
                      I&apos;m learning how to make money online,{' '}
                      <strong>and showing you everything</strong>.
                    </Typography>
                    <Divider style={{clear: 'both'}} />
                    <br />
                    <a
                      href="http://bit.ly/hustlesub"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none'
                      }}
                    >
                      <FaYoutube
                        style={{
                          fontSize: '1.8rem',
                          color: '#c4302b',
                          float: 'left'
                        }}
                      />
                      <Typography
                        style={{
                          lineHeight: '1.2',
                          textShadow: '-2px 2px 1px #000000',
                          marginTop: '6px',
                          paddingLeft: '40px',
                          fontWeight: '600'
                        }}
                        variant="subtitle2"
                        color="secondary"
                      >
                        youtube.com/noobhustle
                      </Typography>
                    </a>
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

export default Hero;
