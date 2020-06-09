import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { BASE_URL } from '../../config';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isPasswordMatchError: false,
      signupSuccess: false,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (fullName, email, password) => {
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.post(`${BASE_URL}/users`, {
        fullname: fullName,
        user_email_id: email,
        password,
      });

      if (resp && resp.data) {
        this.setState({
          user: resp.data.users,
          loader: false,
          signupSuccess: true,
        });
        // this.props.history.push('/company-form');
      }
    } catch (error) {
      this.setState({
        loader: false,
        signupSuccess: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.isPasswordMatch()) {
      this.setState({ isPasswordMatchError: true });
      return;
    }

    const { fullName, email, password, confirmPassword } = this.state;
    if (!fullName || !email || !password || !confirmPassword) {
      return;
    } else {
      this.handleFormSubmit(fullName, email, password);
    }
  };

  isPasswordMatch = () => {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  };

  showAlert = () => {
    const { isPasswordMatchError } = this.state;
    if (isPasswordMatchError) {
      return (
        <Alert
          variant="danger"
          onClose={() => this.setState({ isPasswordMatchError: false })}
          dismissible
        >
          <Alert.Heading>Opps!</Alert.Heading>
          <p>Password Mismatch</p>
        </Alert>
      );
    }
  };
  render() {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      signupSuccess,
    } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            {this.showAlert()}
            {signupSuccess ? (
              <h2>
                You have register successfully. Please{' '}
                <a href="/sign-in">click here</a> to Login
              </h2>
            ) : (
              <Form className="signup-form" onSubmit={this.handleSubmit}>
                <Form.Group>
                  <Form.Label>Full Name: </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder=" Please Enter Name"
                    onChange={this.handleChange}
                    value={fullName}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Please Enter Email"
                    onChange={this.handleChange}
                    value={email}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Please Enter Password"
                    onChange={this.handleChange}
                    value={password}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Confirm Password: </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Please Enter Confirm Password"
                    onChange={this.handleChange}
                    value={confirmPassword}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign UP
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
