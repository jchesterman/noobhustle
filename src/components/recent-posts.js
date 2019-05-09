import PropTypes from 'prop-types';
import React from 'react';
import Share from './social-share';
import styled from '@emotion/styled';
import {Divider, Grid, Typography} from '@material-ui/core';
import {Link} from 'gatsby';

const PostItem = styled.div({
  textAlign: 'left',
  marginBottom: '40px',
  '@media(max-width: 599px)': {
    marginBottom: '0'
  }
});

const PostImage = styled.img({
  display: 'flex',
  width: '100%'
});

const FeatureContain = styled(Grid)({
  '@media(max-width: 599px)': {
    height: 'auto',
    marginBottom: '20px'
  },
  '&:nth-of-type(2)': {
    paddingLeft: '40px',
    '@media(max-width: 599px)': {
      paddingLeft: '0'
    }
  }
});

const PostSubHeading = styled.span({
  fontSize: '0.6em',
  textTransform: 'uppercase',
  display: 'block',
  fontWeight: '400',
  marginBottom: '10px'
});

const RecentPosts = props =>
  props.posts.map((item, key) => {
    return (
      <PostItem key={key}>
        <Grid container>
          <FeatureContain item xs={12} sm={6}>
            <Link
              style={{textDecoration: 'none'}}
              to={`/${item.node.category.slug}/${item.node.slug}`}
            >
              <PostImage src={item.node.heroImage.file.url} />
            </Link>
          </FeatureContain>
          <FeatureContain item xs={12} sm={6}>
            <Typography
              color="primary"
              style={{
                float: 'left',
                fontWeight: '600',
                textTransform: 'uppercase'
              }}
              variant="subtitle2"
            >
              {item.node.category.name}
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              paragraph
              variant="subtitle2"
            >
              &nbsp;/ {item.node.publishDate}
            </Typography>
            <Link
              style={{textDecoration: 'none'}}
              to={`/${item.node.category.slug}/${item.node.slug}`}
            >
              <Typography gutterBottom style={{fontWeight: '600'}} variant="h5">
                {item.node.title}
                {item.node.subtitle && (
                  <PostSubHeading>{item.node.subtitle}</PostSubHeading>
                )}
              </Typography>
            </Link>
            <Typography align="left" paragraph>
              {item.node.body.childMarkdownRemark.excerpt}&nbsp;
              <Link to={`/${item.node.category.slug}/${item.node.slug}`}>
                Continue Reading
              </Link>
            </Typography>
            <br />
            <br />
            <Divider />
            <br />
            <Share
              socialConfig={{
                twitterHandle: '',
                config: {
                  url: `https://noobhustle.com/${item.node.category.slug}/${
                    item.node.slug
                  }`,
                  title: `${item.node.title}`
                }
              }}
            />
          </FeatureContain>
        </Grid>
      </PostItem>
    );
  });

RecentPosts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default RecentPosts;
