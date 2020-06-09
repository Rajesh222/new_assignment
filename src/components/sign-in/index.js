import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../../config';

export default class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    if (!email || !password) {
      return;
    } else {
      this.props.handleSignIn(email, password);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form className="signup-form" onSubmit={this.handleSubmit}>
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
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
