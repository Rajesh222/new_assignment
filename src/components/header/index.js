import React, { Component, Fragment } from 'react';
import { Navbar, Form, Nav, FormControl } from 'react-bootstrap';
import { Bell, Search } from 'react-bootstrap-icons';

import './header.scss';

export default class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <Navbar bg="light" expand="lg" className="my-nav-bar">
          <Navbar.Brand href="/" id="brand-name">
            R
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!user && (
              <Nav.Link href="/sign-in" className="header-link">
                Sign In
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link href="sign-up" className="header-link">
                Sign Up
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                href="#"
                className="header-link"
                onClick={() => {
                  localStorage.clear();
                  this.props.history.push('/sign-in');
                  window.location.reload();
                }}
              >
                Logout
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                href="#"
                className="header-link"
                onClick={() => {
                  this.props.history.push('/profile');
                }}
              >
                Profile
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}
