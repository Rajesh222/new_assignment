import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Header from '../header';
import SignupForm from '../sign-up';
import SigninForm from '../sign-in';
import CompanyForm from '../companyForm';
import Home from '../home';
import Profile from '../profile';
import Loader from '../loader';
import { BASE_URL } from '../../config';

import './main.scss';
export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      user: {},
      associatedCompanies: [],
      companies: [],
    };
  }

  handleSignIn = async (email, password) => {
    try {
      this.setState({
        loader: true,
      });
      const resp = await Axios.post(`${BASE_URL}/users/login`, {
        email,
        password,
      });

      if (resp && resp.data) {
        localStorage.setItem('token', resp.data.token);
        localStorage.setItem('user', JSON.stringify(resp.data.results));
        this.setState({ user: resp.data.results, loader: false });
        this.props.history.push('/profile');
      }
    } catch (error) {
      this.setState({
        loader: false,
      });
    }
  };
  render() {
    const { loader, companies, associatedCompanies } = this.state;
    const user =
      localStorage &&
      localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header user={user} history={this.props.history} />
        <Container className="main">
          {loader ? (
            <Loader />
          ) : (
            <Fragment>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sign-up" component={SignupForm} />
                <Route
                  path="/sign-in"
                  render={(props) => (
                    <SigninForm handleSignIn={this.handleSignIn} />
                  )}
                />
                <Route path="/company-form" component={CompanyForm} />
                <Route
                  path="/profile"
                  render={() => (
                    <Profile
                      history={this.props.history}
                      user={user}
                      companies={companies}
                      associatedCompanies={associatedCompanies}
                    />
                  )}
                />
              </Switch>
            </Fragment>
          )}
        </Container>
      </div>
    );
  }
}
