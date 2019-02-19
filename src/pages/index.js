import React from 'react';

import DomainChecker from '../components/domain-checker';
import Layout from '../components/layout';
import SEO from '../components/seo';
import WordpressLogo from '../components/image';
import styled from '@emotion/styled';
import {Button, Divider, Grid, Typography} from '@material-ui/core';
import {Section} from '../components/common';

const OddSection = styled.div({
  backgroundColor: '#f5f5f5'
});

const StyledButton = styled(Button)({
  textTransform: 'none',
  marginTop: '20px',
  fontSize: '1.5rem',
  marginBottom: '16px'
});

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <Section>
      <Typography variant="h5">
        How to create a WordPress start from scratch, in under 10 minutes.
      </Typography>
      <br />
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h3">Find your name.</Typography>
          <br />
          <Typography color="textSecondary" variant="h6">
            Pick site name, and make sure the domain is available.
          </Typography>
          <DomainChecker />
        </Grid>
        <Grid item xs={5}>
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
          We&apos;re going to use{' '}
          <a
            href="https://www.bluehost.com/track/overcomable/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Bluehost
          </a>{' '}
          - the web host recommended by WordPress themselves.
        </Typography>
        <Typography color="textSecondary" variant="h6">
          Right now they&apos;re having a <strong>60% off</strong> offer, which
          includes a free domain registration.
        </Typography>
        <StyledButton
          color="primary"
          href="https://www.bluehost.com/track/overcomable/"
          target="_blank"
          variant="contained"
        >
          Get Hosting &amp; Free Domain
        </StyledButton>
      </Section>
    </OddSection>
  </Layout>
);

export default IndexPage;
