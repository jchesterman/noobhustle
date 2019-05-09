import EmailForm from '../components/subscribe-form';
import Img from 'gatsby-image';
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
import {Section} from '../components/common';
import {graphql} from 'gatsby';
import {withProps} from 'recompose';

const PostHeading = styled(Typography)({
  fontSize: '3em',
  fontWeight: '600'
});

const PostSubHeading = styled.span({
  fontSize: '0.6em',
  textTransform: 'uppercase',
  display: 'block',
  fontWeight: '400',
  marginBottom: '10px'
});

const mainHeading = styled(Typography)({
  fontWeight: '600'
});

const StyledList = styled(List)({
  listStyle: 'disc',
  marginLeft: '18px',
  paddingTop: '0'
});

const OlStyledList = styled(List)({
  listStyle: 'decimal',
  marginLeft: '22px',
  paddingTop: '0',
  marginBottom: '20px'
});

const StyledListItem = styled(ListItem)({
  display: 'list-item',
  padding: '5px 16px 5px 4px',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: '1.2em'
});

const StyledH3 = styled(Typography)({
  fontSize: '2.2em',
  borderTop: '1px solid #ddd',
  borderBottom: '1px solid #ddd',
  padding: '10px',
  background: '#f4f4f4'
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

const StyledImg = styled.img({
  maxWidth: '100%'
});

const StyledHr = styled.hr({
  width: '100%',
  border: 'none',
  height: 1,
  background: '#ddd'
});

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: withProps({variant: 'h1', gutterBottom: true})(mainHeading),
    h2: withProps({variant: 'h2', gutterBottom: true})(Typography),
    h3: withProps({variant: 'h3', gutterBottom: true})(StyledH3),
    h4: withProps({variant: 'h4', gutterBottom: true})(Typography),
    p: withProps({paragraph: true})(StyledParagraph),
    ol: withProps({component: 'ol'})(OlStyledList),
    ul: withProps({component: 'ul'})(StyledList),
    li: StyledListItem,
    img: StyledImg,
    hr: StyledHr
  }
}).Compiler;

class BlogPost extends Component {
  render() {
    const {
      id,
      title,
      subtitle,
      slug,
      category,
      metaTitle,
      createdAt,
      updatedAt,
      heroImage,
      body
    } = this.props.data.contentfulBlogPost;

    const disqusShortname = 'noob-hustle';
    const disqusConfig = {
      identifier: id,
      title
    };

    return (
      <Layout>
        <SEO title={metaTitle ? metaTitle : title} />
        <Section>
          <Grid container spacing={40}>
            <Grid item sm={8} xs={12}>
              <PostHeading variant="h1">
                {title}
                <PostSubHeading>{subtitle}</PostSubHeading>
              </PostHeading>
              <Typography paragraph>
                Posted on {createdAt} /{' '}
                <strong>Last updated {updatedAt}</strong>
              </Typography>
              <Share
                socialConfig={{
                  twitterHandle: '',
                  config: {
                    url: `https://noobhustle.com/${category.slug}/${slug}`,
                    title: `Noob Hustle / ${title}`
                  }
                }}
              />
              <br />
              <Divider />
              <br />
              <br />
              <div>
                <Img sizes={heroImage.sizes} />
              </div>
              <hr />
              <div>{renderAst(body.childMarkdownRemark.htmlAst)}</div>
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

BlogPost.propTypes = {
  data: PropTypes.object.isRequired
};

export default BlogPost;

export const pageQuery = graphql`
  query blogPostQuery($slug: String!) {
    contentfulBlogPost(slug: {eq: $slug}) {
      title
      subtitle
      metaTitle
      slug
      createdAt(formatString: "MMMM Do, YYYY")
      updatedAt(formatString: "MMMM Do, YYYY")
      heroImage {
        sizes(maxWidth: 800) {
          ...GatsbyContentfulSizes
        }
      }
      body {
        childMarkdownRemark {
          htmlAst
        }
      }
      category {
        name
        slug
      }
    }
  }
`;
