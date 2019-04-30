import EmailForm from '../components/subscribe-form';
import Img from 'gatsby-image';
import IncomeReportTable from '../components/income-report-table';
import Layout from '../components/layout';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import SEO from '../components/seo';
import Share from '../components/social-share';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {DiscussionEmbed} from 'disqus-react';
import {Divider, Grid, List, ListItem, Typography} from '@material-ui/core';
import {FaTwitter} from 'react-icons/fa';
import {Section} from '../components/common';
import {graphql} from 'gatsby';
import {withProps} from 'recompose';

const PostHeading = styled(Typography)({
  fontSize: '3rem'
});

const mainHeading = styled(Typography)({
  fontWeight: '400'
});

const StyledList = styled(List)({
  listStyle: 'disc',
  marginLeft: '18px',
  paddingTop: '0'
});

const StyledListItem = styled(ListItem)({
  display: 'list-item',
  padding: '5px 16px 5px 4px',
  fontFamily: '"Libre Franklin", serif',
  fontSize: '0.875rem'
});

const NewsletterContain = styled.div({
  background: theme.palette.secondary.main,
  padding: '25px',
  display: 'block',
  textAlign: 'center'
});

const StyledEmailForm = styled(EmailForm)({
  width: '100%'
});

const StyledParagraph = styled(Typography)({
  fontSize: '1.2em'
});

const StyledH3 = styled(Typography)({
  fontWeight: '600',
  fontSize: '1.4em',
  marginBottom: '16px'
});

const SocialShare = styled.div({
  display: 'inline-block',
  marginRight: '6px',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    top: '-2px'
  }
});

const ShareText = styled(Typography)({
  float: 'right',
  color: theme.palette.secondary.light,
  '@media(max-width: 599px)': {
    display: 'none'
  }
});

const ShareIcon = styled.span({
  color: theme.palette.secondary.light,
  position: 'relative',
  top: '2px',
  marginRight: '8px'
});

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: withProps({variant: 'h1', gutterBottom: true})(mainHeading),
    h2: withProps({variant: 'h2', gutterBottom: true})(Typography),
    h3: withProps({variant: 'h3', gutterBottom: true})(StyledH3),
    h4: withProps({variant: 'h4', gutterBottom: true})(Typography),
    p: withProps({paragraph: true})(StyledParagraph),
    ul: withProps({component: 'ul'})(StyledList),
    li: StyledListItem
  }
}).Compiler;

class IncomeReport extends Component {
  render() {
    const {
      id,
      title,
      metaTitle,
      createdAt,
      featuredImage,
      slug,
      intro,
      body,
      spreadsheet
    } = this.props.data.contentfulMonthlyIncomeReport;

    const disqusShortname = 'noob-hustle';
    const disqusConfig = {
      identifier: id,
      title
    };
    const incomeObj = JSON.parse(spreadsheet.internal.content);

    return (
      <Layout>
        <SEO title={metaTitle ? metaTitle : title} />
        <Section>
          <Grid container spacing={40}>
            <Grid item sm={8} xs={12}>
              <PostHeading variant="h1">{title}</PostHeading>
              <Typography paragraph>{createdAt}</Typography>
              <Share
                socialConfig={{
                  twitterHandle: '',
                  config: {
                    url: `https://noobhustle.com/income-reports/${slug}`,
                    title: `Noob Hustle / ${title}`
                  }
                }}
              />
              <br />
              <Divider />
              <br />
              <br />
              <div>
                <Img sizes={featuredImage.sizes} />
              </div>
              <hr />
              <br />
              <div>{renderAst(intro.childMarkdownRemark.htmlAst)}</div>
              <IncomeReportTable data={incomeObj} />
              <br />
              <Divider />
              <br />
              <div>{renderAst(body.childMarkdownRemark.htmlAst)}</div>
              <br />
              <SocialShare
                className="button share-button twitter-share-button"
                data-network="twitter"
                style={{
                  background: '#38A1F3',
                  padding: '6px 8px',
                  borderRadius: '4px'
                }}
              >
                <ShareIcon>
                  <FaTwitter />
                </ShareIcon>
                <ShareText>Tweet This</ShareText>
              </SocialShare>
              <br />
              <br />
              <Divider />
              <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <NewsletterContain>
                <Typography gutterBottom variant="subtitle2">
                  <strong>ENJOY THIS CONTENT?</strong>
                </Typography>
                <Typography color="textSecondary" paragraph>
                  Join the newsletter and get weekly tips &amp; tricks, as well
                  as be notified whenever I post new content.
                </Typography>
                <StyledEmailForm cta="SUBSCRIBE" />
              </NewsletterContain>
            </Grid>
          </Grid>
        </Section>
      </Layout>
    );
  }
}

IncomeReport.propTypes = {
  data: PropTypes.object.isRequired
};

export default IncomeReport;

export const pageQuery = graphql`
  query incomeReportQuery($slug: String!) {
    contentfulMonthlyIncomeReport(slug: {eq: $slug}) {
      id
      title
      month
      slug
      featuredImage {
        sizes(maxWidth: 800) {
          ...GatsbyContentfulSizes
        }
      }
      intro {
        childMarkdownRemark {
          htmlAst
        }
      }
      body {
        childMarkdownRemark {
          htmlAst
        }
      }
      spreadsheet {
        internal {
          content
        }
      }
    }
  }
`;
