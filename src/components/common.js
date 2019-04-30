import styled from '@emotion/styled';
import theme from '../themes/default';

const smDownBreakpoint = theme.breakpoints.down('sm');
export const Section = styled.section({
  maxWidth: 1440,
  margin: '0 auto',
  padding: `${theme.spacing.unit * 8}px 1.0875rem`,
  [smDownBreakpoint]: {
    padding: '20px'
  }
});
