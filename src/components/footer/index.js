import React, { Component } from 'react';

import './footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className="section footer-classic context-dark bg-image">
        <div className="container">
          <div className="row row-30">
            <div className="col-md-3 col-xs-12">
              <span>We Are</span>
              <ul className="footer-nav-list">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Mission</a>
                </li>
                <li>
                  <a href="#">How We Do Help</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-xs-12">
              <span>Explore</span>
              <ul className="footer-nav-list">
                <li>
                  <a href="#">Discover</a>
                </li>
                <li>
                  <a href="#">Simple Guide</a>
                </li>
                <li>
                  <a href="#">For Donars</a>
                </li>
                <li>
                  <a href="#">Beneficiary Orgs</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-xs-12">
              <span>Questions</span>
              <ul className="footer-nav-list">
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Help Center</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
