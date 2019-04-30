import PropTypes from 'prop-types';
import React from 'react';
import Share from './social-share';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Divider, Grid, Typography} from '@material-ui/core';
import {FaCaretDown, FaCaretUp} from 'react-icons/fa';
import {Link} from 'gatsby';

const PostItem = styled.div({
  textAlign: 'left',
  marginBottom: '40px'
});

const PostImage = styled.img({
  display: 'flex',
  width: '100%',
  '@media(max-width: 599px)': {
    marginBottom: '0'
  }
});

const FeatureContain = styled(Grid)({
  '@media(max-width: 599px)': {
    height: 'auto',
    marginBottom: '20px'
  },
  '&:nth-of-type(2)': {
    paddingLeft: '40px',
    '@media(max-width: 599px)': {
      paddingLeft: '0px'
    }
  }
});

const IncomeReports = props =>
  props.posts.map((item, key) => {
    const incomeJson = item.node.spreadsheet.internal.content;
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
      <PostItem key={key}>
        <Grid container>
          <FeatureContain item xs={12} sm={6}>
            <Link
              style={{textDecoration: 'none'}}
              to={`/income-reports/${item.node.slug}`}
            >
              <PostImage src={item.node.featuredImage.file.url} />
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
              Income Report&nbsp;/
            </Typography>
            {isPositive ? (
              <Typography
                style={{
                  fontWeight: '600',
                  color: '#36c43b'
                }}
                gutterBottom
                paragraph
                variant="subtitle2"
              >
                {' '}
                <FaCaretUp style={{position: 'relative', top: '1px'}} />$
                {income}
              </Typography>
            ) : (
              <Typography
                style={{
                  fontWeight: '600',
                  color: theme.palette.primary.light
                }}
                gutterBottom
                paragraph
                variant="subtitle2"
              >
                {' '}
                <FaCaretDown style={{position: 'relative', top: '1px'}} />$
                {income}
              </Typography>
            )}
            <Link
              style={{textDecoration: 'none'}}
              to={`/income-reports/${item.node.slug}`}
            >
              <Typography gutterBottom style={{fontWeight: '600'}} variant="h5">
                {item.node.title}
              </Typography>
            </Link>
            <Typography align="left" paragraph>
              {item.node.intro.childMarkdownRemark.excerpt}&nbsp;
              <Link to={`/income-reports/${item.node.slug}`}>
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
                  url: `https://noobhustle.com/income-reports/${
                    item.node.slug
                  }`,
                  title: `Noob Hustle / ${item.node.title}`
                }
              }}
            />
          </FeatureContain>
        </Grid>
      </PostItem>
    );
  });

IncomeReports.propTypes = {
  posts: PropTypes.array.isRequired,
  income: PropTypes.number,
  positive: PropTypes.bool
};

export default IncomeReports;
