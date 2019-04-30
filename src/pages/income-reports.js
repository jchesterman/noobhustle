import React from 'react';

import CountUp from 'react-countup';
import Hero from '../components/altHero';
import IncomeReportListing from '../components/income-report-listing';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import SEO from '../components/seo';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Link, graphql} from 'gatsby';
import {Typography} from '@material-ui/core';

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

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const incomeJson = this.props.data.allContentfulMonthlyIncomeReport.edges[0]
      .node.spreadsheet.internal.content;
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
            Monthly Income Reports
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
              to={`/income-reports/${
                this.props.data.allContentfulMonthlyIncomeReport.edges[0].node
                  .slug
              }`}
              style={{textDecoration: 'none'}}
            >
              {isPositive ? (
                <GreenText>
                  I made $
                  <CountUp
                    separator=","
                    delay={1.5}
                    duration={5}
                    end={income}
                  />{' '}
                  last month
                </GreenText>
              ) : (
                <RedText>
                  I lost $
                  <CountUp
                    separator=","
                    delay={0.5}
                    duration={4}
                    end={income}
                  />{' '}
                  last month
                </RedText>
              )}
            </Link>
          </Typography>
          <br />
          <Typography
            style={{textShadow: '-2px 2px 1px #000000'}}
            variant="subtitle1"
            color="secondary"
          >
            At the beginning of every month, i&apos;ll be posting my previous
            months detailed income report.
            <br />
            They will break down my months earnings (or losses), and detail
            where and how I made/lost money.
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
              Make sure you join the mailing list to get notified when my new
              income reports go live!
            </strong>
          </Typography>
        </Hero>
        <div
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: 1440,
            padding: '3.45rem 1.0875rem'
          }}
        >
          <IncomeReportListing
            posts={this.props.data.allContentfulMonthlyIncomeReport.edges}
            income={income}
            positive={isPositive}
          />
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query IncomeReportListingQuery {
    allContentfulMonthlyIncomeReport(sort: {fields: [month], order: DESC}) {
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
