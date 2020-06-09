import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { BASE_URL } from '../../config';

export default class CompanyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      type: '',
      size: '',
      industry: '',
      location: '',
      isPasswordMatchError: false,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleFormSubmit = async (companyName, size, type, location, industry) => {
    const { user } = this.props;
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.post(`${BASE_URL}/users/company`, {
        company_name: companyName,
        size: size,
        company_type: type,
        company_address: location,
        industry: industry,
        user_id: user.user_id,
      });

      if (resp && resp.data) {
        const response = await Axios.get(
          `${BASE_URL}/users/company/${user.user_id}`
        );
        if (response && response.data) {
          this.props.updateUser(response.data.company.company_id, user.user_id);
        }
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { companyName, size, type, location, industry } = this.state;
    if (!companyName || !location) {
      return;
    } else {
      this.handleFormSubmit(companyName, size, type, location, industry);
    }
  };

  render() {
    const { companyName, size, type, location, industry } = this.state;
    return (
      <Container>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h3>Please add your company in profile</h3>
            <Form className="signup-form" onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Company Name: </Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  placeholder=" Please Enter Company Name"
                  onChange={this.handleChange}
                  value={companyName}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Company Size: </Form.Label>
                <Form.Control
                  type="number"
                  name="size"
                  placeholder="Please Enter size"
                  onChange={this.handleChange}
                  value={size}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Type: </Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  placeholder="Please Enter type"
                  onChange={this.handleChange}
                  value={type}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Industry: </Form.Label>
                <Form.Control
                  type="text"
                  name="industry"
                  placeholder="Please Enter Industry"
                  onChange={this.handleChange}
                  value={industry}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Location: </Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Please Enter Location"
                  onChange={this.handleChange}
                  value={location}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add Company
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
