import React, { Component } from 'react';
import { Card, Image, Button } from 'react-bootstrap';

import './request.scss';

export default class Request extends Component {
  handleAccept = () => {
    const { request_id, company_id } = this.props.item;
    this.props.acceptRequest(company_id, request_id);
  };
  handleReject = () => {
    this.props.rejectRequest(this.props.item.request_id);
  };
  render() {
    const { item } = this.props;
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>
              {item.company_name}
              <Button
                className="reject-button"
                onClick={this.handleReject}
                variant="outline-primary"
              >
                Reject
              </Button>
              <Button
                className="accept-button"
                onClick={this.handleAccept}
                variant="outline-primary"
              >
                Accept
              </Button>
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
