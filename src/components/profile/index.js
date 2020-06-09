import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  ListGroup,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { BASE_URL } from '../../config';
import CompanyList from '../company-list';
import CompanyForm from '../companyForm';
import Loader from '../loader';
import Request from '../request';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      companies: [],
      updated_company_id: false,
      requests: [],
      searchText: '',
      searchResult: '',
    };
  }
  componentDidMount() {
    const { user } = this.props;
    if (user && user.company_id) {
      this.fetchCompany();
      this.fetchRequest(user.company_id);
    }
  }

  fetchCompany = async () => {
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.get(`${BASE_URL}/users/company`);
      resp &&
        resp.data &&
        this.setState({ companies: resp.data.companies, loader: false });
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };

  fetchRequest = async (company_id) => {
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.get(`${BASE_URL}/users/connect/${company_id}`);
      resp &&
        resp.data &&
        this.setState({ requests: resp.data.results, loader: false });
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };

  sendRequest = async (company) => {
    const { user } = this.props;
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.post(`${BASE_URL}/users/connect`, {
        requested_company_id: user.company_id,
        associated_company_id: company.company_id,
        request_status: 'awaited',
      });

      if (resp && resp.data) {
        this.setState({
          loader: false,
        });
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };

  updateUser = async (company_id, user_id) => {
    try {
      const result = await Axios.put(`${BASE_URL}/users`, {
        company_id,
        user_id,
      });
      if (result) {
        let updatedUser = this.props.user;
        updatedUser.company_id = company_id;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        this.setState({ updated_company_id: true, loader: false });
        window.location.reload();
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };

  acceptRequest = async (associated_id, request_id) => {
    const { user } = this.props;
    const company_id = user && user.company_id;
    try {
      this.setState({
        loader: true,
      });
      const result = await Axios.post(`${BASE_URL}/users/accept`, {
        company_id: associated_id,
        associated_id: company_id,
      });
      const nextResult = await Axios.post(`${BASE_URL}/users/accept`, {
        company_id,
        associated_id,
      });
      const updatedRequest = await Axios.put(
        `${BASE_URL}/users/connect/${request_id}`
      );
      if (result && nextResult && updatedRequest) {
        this.setState({ loader: false });
        window.location.reload();
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };

  rejectRequest = async (request_id) => {
    try {
      const updatedRequest = await Axios.delete(
        `${BASE_URL}/users/connect/${request_id}`
      );
      if (updatedRequest) {
        this.setState({ loader: false });
        window.location.reload();
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };
  handleSearch = async (e) => {
    const { searchText } = this.state;
    e.preventDefault();
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.post(`${BASE_URL}/users/search`, {
        user_email_id: searchText,
      });

      if (resp.data) {
        this.setState({ searchResult: resp.data.results, loader: false });
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ searchText: value });
  };
  render() {
    const {
      companies,
      updated_company_id,
      loader,
      requests,
      searchResult,
    } = this.state;
    const { user } = this.props;
    const user_id = user && user.user_id;
    const userCompany =
      companies && companies.find((company) => company.user_id === user_id);
    const filteredCompanies =
      companies && companies.filter((company) => company.user_id !== user_id);
    let requestedCompany = [];
    if (requests && requests.length > 0 && companies) {
      requests.forEach((req) => {
        let item = companies.find(
          (company) => company.company_id === req.requested_company_id
        );
        if (item) {
          item.request_id = req && req.request_id;
          requestedCompany.push(item);
        }
      });
    }
    let associatedCompaniesList = [];
    if (userCompany && userCompany.associated_ids && companies) {
      const ids = userCompany.associated_ids.split(',');
      ids.forEach((id) => {
        associatedCompaniesList.push(
          companies.find((company) => company.company_id === Number(id))
        );
      });
    }

    let displayCompany = [];

    if (
      filteredCompanies &&
      associatedCompaniesList.length > 0 &&
      associatedCompaniesList[0]
    ) {
      for (let item of associatedCompaniesList) {
        displayCompany.push(
          ...filteredCompanies.filter(
            (company) => company.company_id !== Number(item.company_id)
          )
        );
      }
    }
    const displayList =
      associatedCompaniesList &&
      associatedCompaniesList.map((Item) => {
        return (
          <ListGroup.Item key={Item.company_id}>
            {Item.company_name}
          </ListGroup.Item>
        );
      });

    return (
      <Fragment>
        {loader ? (
          <Loader />
        ) : (
          <Container>
            <Row>
              <Col md={{ span: 4, offset: 8 }}>
                <Form inline onSubmit={this.handleSearch}>
                  <Search className="search-text" />
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2 search-header"
                    value={this.state.searchText}
                    onChange={this.handleChange}
                  />
                </Form>
              </Col>
            </Row>
            {(user && user.company_id) || updated_company_id ? (
              <Row>
                <Col md={4}>
                  <Row>
                    <Col md={12}>
                      <Card className="company">
                        <Image
                          className="company-image"
                          src="/assets/download.jpg"
                          fluid
                        />
                        <Card.Body className="company-body">
                          <Card.Title>{user.fullname}</Card.Title>
                          <Card.Text>
                            at {userCompany && userCompany.company_name}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Card>
                        <Card.Header>Associated companies:</Card.Header>
                        <ListGroup variant="flush">{displayList}</ListGroup>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md={8}>
                  {searchResult && (
                    <Card>
                      <Card.Body>
                        <Card.Title>{searchResult.fullname}</Card.Title>
                        <Card.Title>{searchResult.user_email_id}</Card.Title>
                      </Card.Body>
                    </Card>
                  )}
                  {requestedCompany.length > 0 &&
                    requestedCompany[0] &&
                    requestedCompany.map((item) => {
                      return (
                        <Request
                          item={item}
                          key={item.company_id}
                          rejectRequest={this.rejectRequest}
                          acceptRequest={this.acceptRequest}
                        />
                      );
                    })}

                  <CompanyList
                    companies={displayCompany}
                    sendRequest={this.sendRequest}
                  />
                </Col>
              </Row>
            ) : (
              <CompanyForm user={user} updateUser={this.updateUser} />
            )}
          </Container>
        )}
      </Fragment>
    );
  }
}
