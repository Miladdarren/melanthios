import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import { resendEmail } from '../../utils/authUtils';

class ResendEmail extends Component {
  onSubmit = formProps => {
    resendEmail(formProps);
  };

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <fieldset>
        <div className="p-t-31 p-b-9">
          <label className="txt1">{label}</label>
        </div>
        <div className="wrap-input100">
          <input className="input100" {...input} type={type} />
          <span className="focus-input100" />
        </div>
        {touched && error && <span className="text-danger">{error}</span>}
      </fieldset>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
            <form
              className="login100-form validate-form flex-sb flex-w"
              onSubmit={handleSubmit(this.onSubmit)}
            >
              <span className="login100-form-title p-b-53">
                Resend verification
              </span>

              <Field
                name="email"
                type="email"
                component={this.renderField}
                label="Email"
              />

              <div id="button" className="container-login100-form-btn m-t-17">
                <button className="login100-form-btn" disabled={submitting}>
                  Send verification email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const validate = ({ email }) => {
  const errors = {};

  if (!email) {
    errors.email = `Required`;
  }

  return errors;
};

export default reduxForm({ form: 'resendEmail', validate })(ResendEmail);
