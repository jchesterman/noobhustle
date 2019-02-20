import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Button, Input} from '@material-ui/core';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Loader from './loader';
import {
  FaClipboard,
  FaClipboardCheck,
  FaFrown,
  FaGrinBeam
} from 'react-icons/fa';

class DomainChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: false,
      copied: false,
      message: null,
      domain: '',
      checking: false
    };

    this.setDomainState = this.setDomainState.bind(this);
    this.onClick = this.onClick.bind(this);
    this.CheckAvailability = this.CheckAvailability.bind(this);
  }

  onClick() {
    this.setState({copied: true});
  }

  setDomainState(event) {
    this.setState({copied: false, message: null});
    this.setState({domain: event.target.value});
  }

  CheckAvailability() {
    event.preventDefault();
    this.setState({checking: true, copied: false, message: false});
    fetch('https://domainstatus.p.rapidapi.com/', {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': 'a86e58b32fmsh4b30b7c581bfcefp1f2cb4jsn388712bc8722',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        domain: this.state.domain
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error || data.tld_valid === false) {
          this.setState({
            available: false,
            message:
              '<span style="top: -6px; position: relative;">Please enter a valid domain.</span>',
            checking: false
          });
        } else if (data.available === true) {
          const message = `Great! <strong>${
            this.state.domain
          }</strong> is available! <br/><span style="font-weight: 600; font-size: 0.8rem; font-style: italic;">Click to green icon above to copy the domain, and continue to step 2 below</span>`;
          this.setState({checking: false, available: true, message});
        } else {
          const message = `Aw dang! <strong>${
            this.state.domain
          }</strong> is taken :(<br/> Try a different name.`;
          this.setState({checking: false, available: false, message});
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const StyledButton = styled(Button)({
      textTransform: 'none',
      marginTop: '20px',
      fontSize: '1.5rem',
      marginBottom: '16px'
    });

    const Message = styled.div({
      display: 'inline-block',
      marginTop: '20px',
      color: this.state.available ? 'green' : theme.palette.primary.main,
      fontFamily: 'sans-serif'
    });

    const SyledFaGrinBeam = styled(FaGrinBeam)({
      marginRight: '10px'
    });

    const StyledFaFrown = styled(FaFrown)({
      marginRight: '10px'
    });

    const StyledFaClipboard = styled(FaClipboard)({
      position: 'relative',
      top: '16px',
      left: '34px',
      cursor: 'pointer'
    });

    const StyledFaClipboardCheck = styled(FaClipboardCheck)({
      position: 'relative',
      top: '16px',
      left: '34px',
      cursor: 'pointer'
    });

    return (
      <div>
        <form onSubmit={this.CheckAvailability}>
          <Input
            autoComplete="off"
            style={{marginTop: '15px', width: '300px', fontSize: '1.4rem'}}
            autoFocus
            name="dName"
            onChange={this.setDomainState}
            placeholder="noobhustle.com"
          />
          <br />
          <StyledButton color="primary" type="submit" variant="contained">
            Check Availability
          </StyledButton>
          {this.state.checking && <Loader />}
          {this.state.available && !this.state.checking && !this.state.copied && (
            <CopyToClipboard onCopy={this.onCopy} text={this.state.domain}>
              <StyledFaClipboard
                onClick={this.onClick}
                color="grey"
                size="2.5rem"
                style="far"
              />
            </CopyToClipboard>
          )}
          {this.state.copied && (
            <StyledFaClipboardCheck color="green" size="2.5rem" style="far" />
          )}
        </form>
        {this.state.message && (
          <div>
            {this.state.available ? (
              <SyledFaGrinBeam color="green" size="1.5rem" style="far" />
            ) : (
              <StyledFaFrown
                color={theme.palette.primary.main}
                size="1.5rem"
                style="far"
              />
            )}
            <Message dangerouslySetInnerHTML={{__html: this.state.message}} />
            {this.state.copied && (
              <>
                <br />
                <Message>
                  {this.state.domain} was copied to the clipboard
                </Message>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DomainChecker;
