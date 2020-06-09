import React, { Component, Fragment } from 'react';
import { Card, Image, Col, ProgressBar, Button } from 'react-bootstrap';

import './company-details.scss';

export default class CompanyDetail extends Component {
  handleClick = () => {
    this.props.sendRequest(this.props.company);
  };
  render() {
    const { company } = this.props;
    return (
      <Fragment>
        <Col md={4}>
          <Card className="company">
            <Image className="company-image" src="/assets/download.jpg" fluid />
            <Card.Body className="company-body">
              <Card.Title>{company.company_name}</Card.Title>
              <Card.Text>{company.company_address}</Card.Text>
              <Button
                variant="outline-primary"
                onClick={this.handleClick}
                block
              >
                Connect
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Fragment>
    );
  }
}
