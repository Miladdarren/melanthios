import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { addNotification, signout } from '../actions';
import Header from './Header';
import Home from './Home';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ResendEmail from './auth/ResendEmail';
import EmailConfirmation from './auth/EmailConfirmation';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import ProfileView from './profile/ProfileView';
import ProfileEdit from './profile/ProfileEdit';
import Feature from './Feature';

axios.defaults.baseURL = process.env.REACT_APP_API_URI;

class App extends Component {
  componentDidMount() {
    axios.interceptors.response.use(
      res => {
        this.props.addNotification(res.data);

        return res;
      },
      err => {
        this.props.addNotification(err.response.data);
        if (err.response.status === 401) {
          this.props.signout();
          this.props.addNotification({
            success: false,
            msg: 'You have been inactive, please sign in again'
          });
        }

        return Promise.reject(err);
      }
    );

    if (this.props.token)
      axios.defaults.headers.common.Authorization = this.props.token;
  }

  componentDidUpdate() {
    axios.defaults.headers.common.Authorization = this.props.token;
  }

  render() {
    return (
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/resendemail" component={ResendEmail} />
              <Route exact path="/confirmemail" component={EmailConfirmation} />
              <Route exact path="/forgotpass" component={ForgotPassword} />
              <Route exact path="/resetpass" component={ResetPassword} />
              <Route exact path="/profile" component={ProfileView} />
              <Route exact path="/profiledit" component={ProfileEdit} />
              <Route exact path="/feature" component={Feature} />
              <Route component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({ token: state.auth.authenticated });

export default connect(
  mapStateToProps,
  { addNotification, signout }
)(App);
