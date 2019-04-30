import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {
  FaFacebookSquare,
  FaLinkedinIn,
  FaRedditSquare,
  FaTwitter
} from 'react-icons/fa';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton
} from 'react-share';
import {Typography} from '@material-ui/core';

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalShares: 0
    };
  }

  componentDidMount() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      url = 'https://www.ryrob.com/how-start-blog';
    fetch(
      `${proxyUrl}https://count-server.sharethis.com/v2.0/get_counts?url=${url}`
    )
      .then(response => response.json()) // parses JSON response into native Javascript objects
      .then(response => {
        this.setState({
          totalShares: response.total
        });
      });
  }

  render() {
    const ShareCount = styled.div({
      float: 'left',
      borderRight: '1px solid #ddd',
      paddingRight: '8px',
      marginRight: '8px'
    });

    const ShareText = styled(Typography)({
      float: 'right',
      color: theme.palette.secondary.light
    });

    const ShareIcon = styled.span({
      color: theme.palette.secondary.light,
      position: 'relative',
      top: '2px',
      marginRight: '8px'
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

    return (
      <div>
        <ShareCount>
          <Typography color="primary" variant="h5">
            {this.state.totalShares} shares
          </Typography>
        </ShareCount>
        <SocialShare>
          <FacebookShareButton
            style={{
              background: '#3b5998',
              padding: '6px 8px',
              borderRadius: '4px'
            }}
            url={this.props.socialConfig.config.url}
          >
            <ShareIcon>
              <FaFacebookSquare />
            </ShareIcon>
            <ShareText>Facebook</ShareText>
          </FacebookShareButton>
        </SocialShare>
        <SocialShare>
          <TwitterShareButton
            style={{
              background: '#38A1F3',
              padding: '6px 8px',
              borderRadius: '4px'
            }}
            url={this.props.socialConfig.config.url}
            title={this.props.socialConfig.config.title}
            via={this.props.socialConfig.twitterHandle.split('@').join('')}
            hashtags={this.props.tags}
          >
            <ShareIcon>
              <FaTwitter />
            </ShareIcon>
            <ShareText>Twitter</ShareText>
          </TwitterShareButton>
        </SocialShare>
        <SocialShare>
          <LinkedinShareButton
            style={{
              background: '#0077B5',
              padding: '6px 8px',
              borderRadius: '4px'
            }}
            url={this.props.socialConfig.config.url}
            title={this.props.socialConfig.config.title}
          >
            <ShareIcon>
              <FaLinkedinIn />
            </ShareIcon>
            <ShareText>LinkedIn</ShareText>
          </LinkedinShareButton>
        </SocialShare>
        <SocialShare>
          <RedditShareButton
            style={{
              background: '#ff4301',
              padding: '6px 8px',
              borderRadius: '4px'
            }}
            url={this.props.socialConfig.config.url}
            title={this.props.socialConfig.config.title}
          >
            <ShareIcon>
              <FaRedditSquare />
            </ShareIcon>
            <ShareText>Reddit</ShareText>
          </RedditShareButton>
        </SocialShare>
      </div>
    );
  }
}

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};
Share.defaultProps = {
  tags: []
};

export default Share;
