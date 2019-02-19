import Loader from './loader';
import React from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import {Button, Input, Typography} from '@material-ui/core';
import {FaFrown, FaGrinBeam} from 'react-icons/fa';

import validator from 'email-validator';

class SubscribeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checking: false,
      name: null,
      email: null,
      message: null
    };
    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleEmailChange = this._handleEmailChange.bind(this);
  }

  _handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  _handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  _validateForm() {
    this.setState({success: false});
    if (!this.state.email) {
      this.setState({
        message: 'Please enter your email'
      });
      this.setState({checking: false});
      return false;
    }
    if (!validator.validate(this.state.email)) {
      this.setState({
        message: `hey... <strong>${
          this.state.email
        }</strong> isn't a valid email...`
      });
      this.setState({checking: false});
      return false;
    }

    if (!this.state.name) {
      this.setState({message: 'Please enter your name'});
      this.setState({checking: false});
      return false;
    }

    this.setState({message: null});
    return true;
  }

  _handleSubmit = () => {
    event.preventDefault();
    this.setState({checking: true});
    const valid = this._validateForm();
    if (!valid) {
      return false;
    }
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://api.getresponse.com/v3/contacts';
    fetch(proxyUrl + targetUrl, {
      method: 'POST',
      headers: {
        'X-Auth-Token': 'api-key d442fa714898cedbff7f6f755dfbdc79',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        campaign: {
          campaignId: '8nSVH'
        }
      })
    })
      .then(response => {
        this.setState({checking: false});
        if (response.status === 202) {
          this.setState({
            success: true,
            message:
              'Thank you! Make sure you check your email and confirm the subscription.'
          });
        }
        if (response.status === 409) {
          this.setState({
            success: true,
            message: 'Your email is already on the mailing list!'
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const StyledButton = styled(Button)({
      textTransform: 'none',
      fontSize: '1.2rem',
      marginBottom: '16px'
    });
    const Message = styled.div({
      marginTop: '10px',
      color: this.state.success ? 'green' : theme.palette.primary.main
    });
    const LoaderContain = styled.div({
      position: 'relative',
      float: 'left',
      left: '120px',
      top: '-25px'
    });
    const SyledFaGrinBeam = styled(FaGrinBeam)({
      marginBottom: '10px'
    });

    const StyledFaFrown = styled(FaFrown)({
      marginBottom: '10px'
    });
    return (
      <>
        <form onSubmit={this._handleSubmit}>
          <Input
            autoFocus
            onChange={this._handleNameChange}
            style={{marginRight: '30px', marginBottom: '20px', width: '65%'}}
            placeholder="Enter your first name"
          />
          <Input
            onChange={this._handleEmailChange}
            style={{marginRight: '30px', marginBottom: '20px', width: '65%'}}
            placeholder="Enter your email"
          />
          <br />
          <StyledButton color="primary" type="submit" variant="contained">
            Sign Up
          </StyledButton>
          {this.state.checking && (
            <LoaderContain>
              <Loader />
            </LoaderContain>
          )}
        </form>
        {this.state.message && (
          <Message>
            {this.state.success ? (
              <SyledFaGrinBeam color="green" size="1.5rem" style="far" />
            ) : (
              <StyledFaFrown
                color={theme.palette.primary.main}
                size="1.5rem"
                style="far"
              />
            )}
            <Typography
              color="inherit"
              dangerouslySetInnerHTML={{__html: this.state.message}}
              variant="h6"
            />
          </Message>
        )}
      </>
    );
  }
}

export default SubscribeForm;
