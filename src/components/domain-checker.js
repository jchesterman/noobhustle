import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Button, Input} from '@material-ui/core';

import Loader from './loader';
import {FaFrown, FaGrinBeam} from 'react-icons/fa';

class DomainChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      available: false,
      message: false,
      domain: '',
      checking: false
    };

    this.setDomainState = this.setDomainState.bind(this);
    this.CheckAvailability = this.CheckAvailability.bind(this);
  }

  setDomainState(event) {
    this.setState({domain: event.target.value});
  }

  CheckAvailability() {
    event.preventDefault();
    this.setState({checking: true, message: false});
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
          }</strong> is available! <br/><span style="font-weight: 600; font-size: 0.8rem; font-style: italic;">Continue to Step 2 below</span>`;
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
          </div>
        )}
      </div>
    );
  }
}

export default DomainChecker;
