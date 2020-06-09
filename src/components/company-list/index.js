import React, { Component } from 'react';
import CompanyDetail from '../company-detail';
import { Container, Row } from 'react-bootstrap';

export default class CompanyList extends Component {
  render() {
    const { companies } = this.props;
    return (
      <Container className="company-list">
        <Row>
          {companies &&
            companies.length > 0 &&
            companies.map((company, index) => {
              return (
                <CompanyDetail
                  key={company.company_id}
                  company={company}
                  sendRequest={this.props.sendRequest}
                />
              );
            })}
        </Row>
      </Container>
    );
  }
}
