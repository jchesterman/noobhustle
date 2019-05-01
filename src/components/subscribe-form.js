import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styled from '@emotion/styled';
import theme from '../themes/default';
import validator from 'email-validator';
import {Button, TextField, Typography} from '@material-ui/core';
import {FaFrown, FaGrinBeam} from 'react-icons/fa';

const StyledButton = styled(Button)({
  textTransform: 'none',
  fontSize: '1.2rem',
  marginBottom: 16
});

const Message = styled.div({
  marginTop: 10
});

const LoaderContain = styled.div({
  position: 'absolute',
  float: 'left',
  marginTop: -60,
  marginLeft: 140
});

const SyledFaGrinBeam = styled(FaGrinBeam)({
  marginBottom: 10
});

const StyledFaFrown = styled(FaFrown)({
  marginBottom: 10
});

export default class SubscribeForm extends Component {
  state = {
    success: false,
    checking: false,
    name: null,
    email: null,
    message: null
  };

  _handleInputChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  _validateForm() {
    this.setState({success: false});
    if (!this.state.email) {
      this.setState({
        checking: false,
        message: 'Please enter your email'
      });
      return false;
    }

    if (!validator.validate(this.state.email)) {
      this.setState({
        checking: false,
        message: `hey... <strong>${
          this.state.email
        }</strong> isn't a valid email...`
      });
      return false;
    }

    if (!this.state.name) {
      this.setState({
        checking: false,
        message: 'Please enter your name'
      });
      return false;
    }

    this.setState({message: null});
    return true;
  }

  _handleSubmit = event => {
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
        'X-Auth-Token': `api-key ${process.env.GETRESPONSE_API_KEY}`,
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
    return (
      <>
        <form onSubmit={this._handleSubmit}>
          <TextField
            autoFocus
            name="name"
            onChange={this._handleInputChange}
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              marginBottom: '20px',
              width: '100%'
            }}
            placeholder="Enter your first name"
            variant="outlined"
          />
          <TextField
            name="email"
            type="email"
            onChange={this._handleInputChange}
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
              marginBottom: '20px',
              width: '100%'
            }}
            placeholder="Enter your email"
            variant="outlined"
          />
          <br />
          <StyledButton
            color="primary"
            disabled={this.state.checking ? true : false}
            style={{width: '100%'}}
            type="submit"
            variant="contained"
          >
            {this.props.cta}
          </StyledButton>
          {this.state.checking && (
            <LoaderContain>
              <CircularProgress color="primary" />
            </LoaderContain>
          )}
        </form>
        {this.state.message && (
          <Message
            style={{
              color: this.state.success ? 'green' : theme.palette.primary.main
            }}
          >
            {this.state.success ? (
              <SyledFaGrinBeam color="green" size={20} />
            ) : (
              <StyledFaFrown color={theme.palette.primary.main} size={20} />
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

SubscribeForm.propTypes = {
  cta: PropTypes.string
};
