import PropTypes from 'prop-types';
import React from 'react';
import rehypeReact from 'rehype-react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import withProps from 'recompose/withProps';
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography
} from '@material-ui/core';

const ToolItem = styled.div({
  textAlign: 'left',
  marginBottom: '40px',
  background: '#eee',
  padding: '1em'
});

const CompanyLogo = styled.img({
  display: 'flex',
  width: '100%'
});

const FeatureContain = styled(Grid)({
  '@media(max-width: 599px)': {
    height: 'auto',
    padding: '100px 0'
  },
  '&:nth-of-type(2)': {
    paddingLeft: '40px'
  }
});

const StyledList = styled(List)({
  listStyle: 'disc',
  marginLeft: '18px',
  paddingTop: '0',
  paddingBottom: '16px',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
});

const StyledListItem = styled(ListItem)({
  display: 'list-item',
  padding: '2px 16px 2px 4px',
  fontSize: '0.875rem'
});

const styledH3 = styled(Typography)({
  fontSize: '1.3em'
});

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h2: withProps({variant: 'h2', gutterBottom: true})(Typography),
    h3: withProps({variant: 'h3', gutterBottom: true})(styledH3),
    h4: withProps({variant: 'h4', gutterBottom: true})(Typography),
    p: withProps({paragraph: true})(Typography),
    ul: withProps({component: 'ul'})(StyledList),
    li: StyledListItem
  }
}).Compiler;

const RecommendedTools = props =>
  props.posts.map((item, key) => {
    return (
      <ToolItem key={key}>
        <Grid container>
          <FeatureContain item xs={12} sm={3}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              style={{textDecoration: 'none'}}
              href={item.node.affiliateLink}
            >
              <CompanyLogo src={item.node.image.file.url} />
            </a>
          </FeatureContain>
          <FeatureContain item xs={12} sm={9}>
            <Typography
              color="primary"
              style={{
                fontWeight: '600',
                textTransform: 'uppercase'
              }}
              variant="subtitle2"
            >
              {item.node.category.title}
            </Typography>
            <Typography style={{textTransform: 'uppercase'}} variant="h5">
              <strong>{item.node.title}</strong>&nbsp;/&nbsp;
              {item.node.subtitle}
            </Typography>
            <Divider style={{backgroundColor: theme.palette.primary.light}} />
            <br />
            <div>{renderAst(item.node.body.childMarkdownRemark.htmlAst)}</div>
            <br />
            <Button
              href={item.node.affiliateLink}
              color="primary"
              target="_blank"
              variant="contained"
            >
              {item.node.buttonText}
            </Button>
          </FeatureContain>
        </Grid>
      </ToolItem>
    );
  });

RecommendedTools.propTypes = {
  posts: PropTypes.array.isRequired
};

export default RecommendedTools;
