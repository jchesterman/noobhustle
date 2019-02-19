import React from 'react';

import DomainChecker from '../../components/domain-checker';
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import WordpressLogo from '../../components/image';
import styled from '@emotion/styled';
import theme from '../../themes/default';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {FaCloud, FaGlobe} from 'react-icons/fa';
import {Section} from '../../components/common';

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

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <Section>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">
            How to create a WordPress start from scratch,{' '}
            <strong>in under 10 minutes</strong>.
          </Typography>
          <br />
          <Typography variant="h3">Find your name.</Typography>
          <br />
          <Typography color="textSecondary" variant="h6">
            Pick a site name, and make sure the domain is available.
          </Typography>
          <DomainChecker />
        </Grid>
        <Grid item xs={12} sm={6}>
          <WordpressLogo />
        </Grid>
      </Grid>
    </Section>

    <Divider />

    <OddSection>
      <Section>
        <Typography variant="h3">Get your domain and hosting.</Typography>
        <br />
        <Typography color="textSecondary" variant="h6">
          You need two things in order to have your website online:
        </Typography>
        <br />
        <Typography color="textSecondary" variant="h6">
          <FaCloud color={theme.palette.primary.main} />
          &nbsp;
          <strong>Hosting</strong> - This is where your site will live.
          <br />
          <FaGlobe color={theme.palette.primary.main} />
          &nbsp;
          <strong>Domain</strong> - This is your websites address, where people
          will find you.
        </Typography>
        <br />
        <Typography color="textSecondary" variant="h6">
          We&apos;re going to use{' '}
          <a
            href={process.env.BLUEHOST_AFFILIATE_LINK}
            rel="noopener noreferrer"
            target="_blank"
          >
            Bluehost
          </a>{' '}
          - <strong>the web host recommended by WordPress themselves</strong>.
        </Typography>
        <Typography color="textSecondary" variant="h6">
          Right now they&apos;re having a <strong>40% off</strong> sale, which
          includes a <strong>free domain registration</strong>.
        </Typography>
        <StyledButton
          color="primary"
          href={process.env.BLUEHOST_AFFILIATE_LINK}
          target="_blank"
          variant="contained"
        >
          Get Hosting &amp; Free Domain
        </StyledButton>
      </Section>
    </OddSection>
    <Section>
      <Typography variant="h3">Install a theme.</Typography>
      <Typography color="textSecondary" variant="h6">
        The theme is what determines how your website looks.
      </Typography>
    </Section>
  </Layout>
);

export default IndexPage;
