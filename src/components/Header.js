import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signout } from '../actions';

class Header extends Component {
  renderLinks() {
    if (this.props.user) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/tictactoe">
              Let's Play
            </Link>
          </li>
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.props.user.username}
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <div className="dropdown-divider" />
              <span
                className="dropdown-item"
                style={{ cursor: 'pointer' }}
                onClick={this.props.signout}
              >
                Sign out
              </span>
            </div>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              Sign up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signin">
              Sign in
            </Link>
          </li>
        </>
      );
    }
  }

  render() {
    return (
      <nav
        className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark"
        style={{ zIndex: 7999, boxShadow: '0 7px 10px #343a40' }}
      >
        <Link className="navbar-brand" style={{ padding: 0 }} to="/">
          <img src="/images/xo.png" height="50" width="50" alt="Brand" /> Game
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="navbar-collapse collapse w-100 order-1 order-md-0 navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {/* <Link className="nav-link" to="/">
                Left
              </Link> */}
            </li>
          </ul>
        </div>

        <div
          className="navbar-collapse collapse w-100 order-3 navbarSupportedContent"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ml-auto">{this.renderLinks()}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });

export default connect(
  mapStateToProps,
  { signout }
)(Header);
